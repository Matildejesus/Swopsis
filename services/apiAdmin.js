import supabase, { supabaseAdmin } from "./supabase";

export async function findUserByEmail(email) {
    const { data, error } = await supabaseAdmin.auth.admin.listUsers();

    const user = data.users.find((u) => u.email === email);

    return user;
}

export async function findUserById(id) {
    try {
        const { data, error } = await supabaseAdmin.auth.admin.getUserById(
            id.id,
        );
        console.log("Fetching user with ID:", id);
        console.log("Response Data:", data);
        console.log("Error:", error);

        if (error) {
            throw new Error(error.message);
        }

        return data?.user || null;
    } catch (err) {
        console.error("findUserById Error:", err);
        return null;
    }
}

export async function findUserByIdforInbox( id ) {
    const { data, error } = await supabaseAdmin.auth.admin.getUserById(
        id.id,
    );

    if (error) {
        throw new Error(error.message);
    }

    return data;
}

export async function getAllUsers() {
    const { data, error } = await supabaseAdmin.auth.admin.listUsers();

    if (error) {
        console.error("Error fetching user:", error);
    }
    return data;
}

export async function getGroupMembers({ groupId, id }) {
    console.log("yes");
    const { data, error } = await supabaseAdmin.auth.admin.listUsers();
    console.log(data.users[0].user_metadata.group);
    const membersList = data.users.filter(
        (u) => u.user_metadata.group === groupId,
    );
    console.log(membersList);
    return membersList;
}

export async function getFilteredGroupMember({ groupId }) {
    console.log("GROUPID: ", groupId);

    const { data, error } = await supabaseAdmin.auth.admin.listUsers();

    if (error) {
        console.error("Error retrieving members", error);
        throw error;
    }

    const membersList = (data?.users || [])
        .map((u) => ({
            userId: u.id,
            groupId: u.user_metadata?.group ?? null, // Default to null if undefined
            avatar: u.user_metadata?.avatar ?? null,
            email: u.email ?? null, // Fixed: `email` is not inside `app_metadata`
        }))
        .filter((u) => u.groupId === groupId); // Safely filter users

    console.log("Filtered Members:", membersList);
    return membersList;
}

export async function updateUserMetadata(id, groupId, ambassador) {
    console.log(id, groupId, ambassador);
    const user_metadata = ambassador
        ? { group: groupId, ambassador }
        : { group: groupId };

    const { data, error } = await supabaseAdmin.auth.admin.updateUserById(id, {
        user_metadata,
    });

    if (error) {
        console.error("Error updating user metadata:", error);
        throw error; // Propagate the error
    }

    return data;
}
