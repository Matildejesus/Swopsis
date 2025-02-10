import supabase from "./supabase";

export async function addJoinRequest({ userId, groupId, message }) {
    console.log("addJoinRequests: ");
    const { data, error} = await supabase
        .from("JoinRequests")
        .insert([
            {
                userId,
                groupId,
                message,
                status: "Pending",
            }
        ])
        .select();
    
    if (error) {
        throw new Error(error.message);
    }

    return data;
}

export async function getJoinRequests({ groupId }) {
    const { data, error } = await supabase
        .from("JoinRequests")
        .select("*")
        .order("created_at", { ascending: false });
    
    if (error) {
        throw new Error(error.message);
    }

    return data;
}

export async function updateStatus({ newStatus, id }) {
    const { data, error } = await supabase
        .from("JoinRequest")
        .update({ status : newStatus })
        .eq("id", id);
    
    if (error) {
        throw new Error(error.message);
    }

    return data;
}