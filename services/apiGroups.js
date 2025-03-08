import supabase from "./supabase";

export async function addGroup({ group }) {
    console.log("we are in");
    console.log("group data for data:", group);
    const { data, error } = await supabase
        .from("Groups")
        .insert([
            {
                name: group.name,
                description: group.description,
                location: group.location,
                rules: group.rules,
                numberOfMem: group.numberOfMem,
                avatar: group.avatar,
                ambassadorId: group.ambassadorId,
                status: group.status
            },
        ])
        .select();

    if (error) {
        throw new Error(error.message);
    }
    console.log("hehe", data[0]);
    return data[0];
}

export async function getGroups() {
    console.log("running");
    const { data: groups, error: fetchError } = await supabase
        .from("Groups")
        .select("*")
        .order("created_at", { ascending: false });

    if (fetchError) {
        throw new Error(fetchError.message);
    }
    console.log("data: ", groups);
    return groups;
}


export async function updateStatus({ id, status }) {
    const { data, error } = await supabase
        .from("Groups")
        .update({ "status": status })
        .eq("id", id)
        .select();
        
    if (error) {
        throw new Error(error.message);
    }
    
    return data;
}