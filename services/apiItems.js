import supabase from "./supabase";

export async function addItem({ item }) {
    console.log("we are in");
    const { data, error } = await supabase
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
    ]);
    console.log(item);

    if (error) {
        throw new Error(error.message);
    }

}

export async function getNewItem({ userId }) {
    const { data: itemData, error: fetchError } = await supabase
        .from("Items")
        .select("*")
        .eq("userId", userId) // Filter by userId or another field
        .order("created_at", { ascending: false })  // Assuming "created_at" is the field for item creation
        .limit(1);  // Only fetch the most recent item

    if (fetchError) {
        throw new Error(fetchError.message);
    }

    return itemData;  
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


