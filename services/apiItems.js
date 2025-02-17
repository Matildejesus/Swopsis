import supabase from "./supabase";

export async function addItem({ item, itemDetails }) {
    console.log("we are in");
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
            },
        ])
        .select();

    const itemId = insertedItem[0].id;
    const chosenCategory = item.category;

    console.log(insertedItem);
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

    console.log(insertedItemDetails);
    if (errorItemDetails || errorItem) {
        throw new Error(errorItemDetails.message);
    }
}

export async function getItems({ userId }) {
    console.log("running");
    console.log("userId: ", userId);
    const { data: items, error: fetchError } = await supabase
        .from("Items")
        .select("*")
        .eq("userId", userId)
        .order("created_at", { ascending: false });

    if (fetchError) {
        throw new Error(fetchError.message);
    }
    console.log("data: ", items);
    return items;
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
    console.log("Data", item);
    return item[0];
}

export async function getGroupItems({ users }) {
    console.log(users);

    const { data, error } = await supabase
        .from("Items")
        .select("*")
        .in("userId", users)
        .order("created_at", { ascending: false });

    return data;
}
