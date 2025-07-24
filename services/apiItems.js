import { getFilteredGroupMember } from "./apiAdmin";
import supabase from "./supabase";

export async function addItem({ item, itemDetails }) {
    const { data: insertedItem, errorItem } = await supabase
        .from("Items")
        .insert([
            {
                userId: item.userId,
                category: item.category,
                image: item.image,
                title: item.title,
                description: item.description,
                method: item.method,
                available: true,
                tradeCount: 0,
                unavailableDates: item.unavailableDates
            },
        ])
        .select();

    const itemId = insertedItem[0].id;
    const chosenCategory = item.category;

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

    console.log("insertedItemDetails: ", insertedItemDetails);

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
export async function getItemsInfo({ category, itemId }) {
    console.log("Data", category, itemId);
    const { data: item, error } = await supabase
        .from(category)
        .select("*")
        .eq("itemId", itemId);

    if (error) {
        throw new Error(error.message);
    }

    return item[0];
}

export async function getGroupItems({ groupId }) {
    const groupMembers = await getFilteredGroupMember({ groupId });
    const memberIds = groupMembers.map((member) => member.userId);
    // console.log("Member IDs: ", memberIds);
    const { data, error } = await supabase
        .from("Items")
        .select(`
            id, created_at, userId, category, image, title, description, method, available, tradeCount, unavailableDates,
            Shoes!itemId (*),
             Clothing!itemId (*),
             Accessories!itemId (*)`)
        .in('userId', memberIds)
        .order("created_at", { ascending: false });
    console.log("Query results:", { data, error });

    // console.log("Group Members: ", groupMembers);
    // console.log("GROUP ITEMS: ", data);
    if (error) {
        throw new Error(error.message);
    }

    console.log("NOW TRANSFORMING DATA");
    const transformedData = data.map(item => {

        const itemOwner = groupMembers.find(member => member.userId === item.userId);
        console.log("Item Owner: ", itemOwner);
        const extraInfo = 
            item.category === 'Shoes' ? item.Shoes[0] :
            item.category === 'Clothing' ? item.Clothing[0] :
            item.category === 'Accessories' ? item.Accessories[0] :
            null;
        console.log("Extra Info: ", extraInfo);
        
        return {
        ...item,
        avatar: itemOwner?.avatar || '', // Now using the direct avatar field
        email: itemOwner?.email || '',
        extraInfo,
        // Remove the relationship data we don't need in final output
        users: undefined,
        // Shoes: undefined,
        // Clothing: undefined,
        // Accessories: undefined
        };
    });

    console.log("Transformed Data: ", transformedData);

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
    console.log("DATES IN THE FUNCTION: ", dates);
    const {data, error} = await supabase
        .from("Items")
        .update({"unavailableDates": dates })
        .eq("id", id)
        .select();

    if (error) {
        throw new Error(error.message);
    }

    console.log("data: ", data);
    return data;
}

export async function updateTradeCount({ id, count }) {
    console.log(count);
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
