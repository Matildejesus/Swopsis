import supabase from "./supabase";

export async function addItem({ item, itemDetails}) {
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
            }
        ])
        .select();
    
    console.log("INSERTED ITEM: ", insertedItem);
    const itemId = insertedItem[0].id;
    console.log(itemId);
    const chosenCategory = item.category;
    console.log(item.category);
    console.log("ITEM DETAILS: ", itemDetails);
    const { data: insertedItemDetails, errorItemDetails } = await supabase
        .from(chosenCategory)
        .insert([
            {
                itemId: itemId,
                subcategory: itemDetails.subcategory,
                ...(chosenCategory != "Accessories" && { size: itemDetails.size }),
                weight: itemDetails.weight,
                ...(chosenCategory == "Accessories" ? { material: itemDetails.material } : {fabric: itemDetails.fabric }),
                ...(chosenCategory == "Shoes" && { length: itemDetails.length }),
                condition: itemDetails.condition,
                color: itemDetails.color,
            }
        ])
        .select();

    console.log("INSERTEDITEMDETAILS: ", insertedItemDetails);

    if (errorItemDetails || errorItem) {
        throw new Error(errorItemDetails.message);
    }
}

export async function getNewItem({ userId }) {
    console.log("running");
    console.log("userId: ", userId);
    const { data: itemData, error: fetchError } = await supabase
        .from("Items")
        .select("*")
        .eq("userId", userId) // Filter by userId or another field
        .order("created_at", { ascending: false })  // Assuming "created_at" is the field for item creation
        .limit(1);  // Only fetch the most recent item

    if (fetchError) {
        throw new Error(fetchError.message);
    }
    console.log("data: ", itemData);
    return itemData[0];  
} 

export async function getItem( { userId }) {
    const { data, error } = await supabase
        .from("Items")
        .select("*")
        .eq("userId", userId);

    if (error) {
        throw new Error(error.message);
    }
    console.log(data);
    return data;
}        


