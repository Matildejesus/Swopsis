import { Alert } from "react-native";
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
    const filteredUsers = data.users.filter(user => !user.user_metadata?.is_super_admin);

    return filteredUsers;
}

export async function getGroupMembers({ groupId}) {
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
            groupId: u.user_metadata?.group ?? null, 
            avatar: u.user_metadata?.avatar ?? null,
            email: u.email ?? null,
        }))
        .filter((u) => u.groupId === groupId); 

    console.log("Filtered Members:", membersList);
    return membersList;
}

export async function updateUserMetadata({ id, groupId, ambassador }) {
    console.log(id, groupId, ambassador);
    const user_metadata = ambassador
        ? { group: groupId, ambassador }
        : { group: groupId };

    const { data, error } = await supabaseAdmin.auth.admin.updateUserById(id, {
        user_metadata,
    });

    console.log("Data: ", data);
    if (error) {
        console.error("Error updating user metadata:", error);
        throw error; // Propagate the error
    }

    return data;
}

export async function updateUserImpactData({
    id, newCoins, totalLitres, totalCarbon, totalWeight, itemsSwapped }) {
    let user_metadata = {};
    user_metadata = {
        coins: newCoins,
        totalWeight,
        totalLitres,
        totalCarbon,
        itemsSwapped,
    };
    console.log("UPDATE DATA: ", user_metadata);

    const { data, error } = await supabaseAdmin.auth.admin.updateUserById(id, {
        user_metadata,
    });
    if (error) throw new Error(error.message);

    console.log("Data: ", data);
    return data;
}

export async function subscribeNewGroups({ setNotification }) {
    const channel = supabase.channel("Groups")
    .on(
    'postgres_changes',
    { event: 'INSERT', schema: 'public', table: 'Groups' },
    (payload) => {
        console.log('New Pending Group - ', payload);
        setNotification(true); // Set notification state to show alert/icon
        Alert.alert("New Group Request", `Group "${payload.new.name}" is pending approval.`);           
    }
    )
    .subscribe();

    return () => {
        channel.unsubscribe();
    };
}