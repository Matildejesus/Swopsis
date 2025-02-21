import supabase from "./supabase";

export async function getItemsNames({ category }) {
    const { data: items, error: fetchError } = await supabase
        .from("ItemConversions")
        .select("name")
        .eq("category", category);

    if (fetchError) {
        throw new Error(fetchError.message);
    }
    const itemNames = items.map((item) => item.name);
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
    return items[0];
}
