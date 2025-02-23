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

export async function getGroupItems({ users }) {

    const { data, error } = await supabase
        .from("Items")
        .select("*")
        .in("userId", users)
        .order("created_at", { ascending: false });

        if (error) {
            throw new Error(error.message);
        }

    return data;
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
