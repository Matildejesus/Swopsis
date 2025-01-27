import supabase from "./supabase";

export async function addJoinRequest({ details }) {
    const { data, error} = await supabase
        .from("JoinRequests")
        .insert([
            {
                userId: details.userId,
                groupId: details.groupId,
                message: details.message,
                status: details.status,
            }
        ])
        .select();
    
    if (error) {
        throw new Error(error.message);
    }

    return data[0];
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