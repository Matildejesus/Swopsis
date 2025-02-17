import supabase from "./supabase";

export async function addJoinRequest({ userId, groupId, message }) {
    console.log("addJoinRequests: ");
    const { data, error } = await supabase
        .from("JoinRequests")
        .insert([
            {
                userId,
                groupId,
                message,
                status: "Pending",
            },
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
        .eq("groupId", groupId)
        .order("created_at", { ascending: false });

    if (error) {
        throw new Error(error.message);
    }

    const accepted = [];
    const rejected = [];
    const pending = [];

    data.forEach((request) => {
        if (request.status === "Accepted") {
            accepted.push(request);
        } else if (request.status === "Rejected") {
            rejected.push(request);
        } else {
            pending.push(request);
        }
    });

    return { accepted, rejected, pending };
}

export async function getAllJoinRequests() {
    const { data, error } = await supabase
        .from("JoinRequests")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) {
        throw new Error(error.message);
    }

    const accepted = [];
    const rejected = [];
    const pending = [];

    data.forEach((request) => {
        if (request.status === "Accepted") {
            accepted.push(request);
        } else if (request.status === "Rejected") {
            rejected.push(request);
        } else {
            pending.push(request);
        }
    });

    return { accepted, rejected, pending };
}

export async function updateStatus({ newStatus, id }) {
    const { data, error } = await supabase
        .from("JoinRequests")
        .update({ status: newStatus })
        .eq("id", id);

    if (error) {
        throw new Error(error.message);
    }

    return data;
}
