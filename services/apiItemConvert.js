import supabase from "./supabase";

export async function getItemsNames({ category }) {
    console.log("running");
    console.log("category: ", category);
    const { data: items, error: fetchError } = await supabase
        .from("ItemConversions")
        .select("name")
        .eq("category", category);  

    if (fetchError) {
        throw new Error(fetchError.message);
    }
    const itemNames = items.map(item => item.name);
    console.log("data: ", itemNames);
    return itemNames;
} 

export async function getSubcategoryDetails({ item }) {
    console.log("item", item);
    const { data: items, error: fetchError } = await supabase
        .from("ItemConversions")
        .select("*")
        .eq("name", item);  

    if (fetchError) {
        throw new Error(fetchError.message);
    }
    console.log("data: ", items[0]);
    return items[0];
}