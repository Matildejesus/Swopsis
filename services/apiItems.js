import { Platform } from "react-native";
import supabase from "./supabase";

export async function addItem({ item, itemDetails }) {
    const { data: insertedItem, errorItem } = await supabase
        .from("Items")
        .insert([
            {
                userId: item.userId,
                category: item.category,
                // image: item.image,
                title: item.title,
                description: item.description,
                method: item.method,
                available: true,
                tradeCount: 0,
                unavailableDates: item.unavailableDates,
                group: item.group
            },
        ])
        .select();

    const itemId = insertedItem[0].id;
    const chosenCategory = item.category;
    const fileExt = item.image.split(".").pop();
    const fileName = `${insertedItem[0].userId}/${itemId}.${fileExt}`;

    let formData;
    if (Platform.OS === "web") {
        const response = await fetch(item.image); // avatar is a data: URL or blob URL
        const blob = await response.blob();
        formData = new File([blob], fileName, { type: `image/${fileExt}` });
    } else {
        formData = new FormData();
        formData.append("file", {
            uri: item.image,
            name: fileName,
            type: `image/${fileExt}`,
        });
    }
    console.log("FORM DATA: ", formData);
    const { error: uploadError } = await supabase.storage
        .from("item-images")
        .upload(fileName, formData, {
            contentType: `image/${fileExt}`,
            upsert: true,
        });

    if (uploadError) {
        throw new Error(uploadError.message);
    }
    
    const { data: urlData } = supabase.storage
        .from('item-images')
        .getPublicUrl(fileName);   

    const { data: updatedItem, error: updateError } = await supabase
        .from("Items")
        .update({ image: urlData.publicUrl })
        .eq("id", itemId)
        .select();
    
    if (updateError) {
        throw new Error(updateError.message);
    }

    const { data: insertedItemDetails, errorItemDetails } = await supabase
        .from(chosenCategory)
        .insert([
            {
                itemId,
                subcategory: itemDetails.subcategory,
                ...(chosenCategory != "Accessories" && {
                    size: itemDetails.size,
                }),
                weight: itemDetails.weight,
                ...(chosenCategory == "Accessories"
                    ? { material: itemDetails.material }
                    : { fabric: itemDetails.fabric }),
                ...(chosenCategory == "Shoes" && {
                    shoelength: itemDetails.length,
                }),
                condition: itemDetails.condition,
                color: itemDetails.color,
            },
        ])
        .select();

    if (errorItemDetails || errorItem) {
        throw new Error(errorItemDetails.message);
    }
}

export async function getItems({ userId }) {
    const { data, error } = await supabase
        .from("Items")
        .select("*")
        .eq("userId", userId)
        .order("created_at", { ascending: false });

    if (error) {
        throw new Error(error.message);
    }
    return data;
}

export async function deleteItems({ itemId }) {
    const { error } = await supabase
        .from("Items")
        .delete()
        .eq("id", itemId);

    if (error) {
        throw new Error(error.message);
    }
    return true;
}

export async function getItemById({ id }) {
    
    const { data, error } = await supabase
    .from("Items")
    .select("*")
    .eq("id", id);

    if (error) {
        throw new Error(error.message);
    }
return data[0];

}


export async function getGroupItems({ groupId, groupMembers, itemConversions, after }) {

    const memberIds = groupMembers.map((member) => member.userId);
    let data;
    let error;
    if (!after) {
        ({ data, error } = await supabase
            .from("Items")
            .select(`
                id, created_at, userId, category, image, title, description, method, available, tradeCount, unavailableDates,
                Shoes!itemId (*),
                Clothing!itemId (*),
                Accessories!itemId (*)`)
            .in('userId', memberIds)
            .order("created_at", { ascending: false }));
    } else {
        ({ data, error } = await supabase
            .from("Items")
            .select(`
                id, created_at, userId, category, image, title, description, method, available, tradeCount, unavailableDates,
                Shoes!itemId (*),
                Clothing!itemId (*),
                Accessories!itemId (*)`)
            .in('userId', memberIds)
            .gt("created_at", after)
            .order("created_at", { ascending: false }));
    }
    

    if (error) {
        throw new Error(error.message);
    }
    const transformedData = data.map(item => {

        const itemOwner = groupMembers.find(member => member.userId === item.userId);
        const extraInfo = 
            item.category === 'Shoes' ? item.Shoes[0] :
            item.category === 'Clothing' ? item.Clothing[0] :
            item.category === 'Accessories' ? item.Accessories[0] :
            null;
        
        const conversion = itemConversions?.find(c => c.name === extraInfo?.subcategory);
        const litres = conversion?.litres;
        let carbon;

        if (conversion?.scalable) {
            carbon = conversion?.carbon * extraInfo?.weight;
        } else {
            carbon = conversion?.carbon;
        }

        return {
        ...item,
        userName: itemOwner?.userName || '',
        avatar: itemOwner?.avatar || '',
        email: itemOwner?.email || '',
        extraInfo,
        users: undefined,
        carbon,
        litres
        };
    });

    return transformedData;
}

export async function updateAvailability({ available, itemId }) {
    const { data, error } = await supabase
        .from('Items')
        .update({ "available": available })
        .eq("id", itemId)
        .select();

    if (error) {
        throw new Error(error.message);
    }

    return data;
}

export async function updateUnavailability ({ dates, id }) {
    const {data, error} = await supabase
        .from("Items")
        .update({"unavailableDates": dates })
        .eq("id", id)
        .select();

    if (error) {
        throw new Error(error.message);
    }
    return data;
}

export async function updateTradeCount({ id, count }) {
    const newCoins = count + 1;
    const { data, error } = await supabase
        .from("Items")
        .update({"tradeCount": count})
        .eq("id", id)
        .select();

    if (error) {
        throw new Error(error.message);
    }
}
