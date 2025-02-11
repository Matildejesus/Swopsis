import supabase, {supabaseAdmin} from "./supabase";


export async function findUserByEmail(email) {
    const { data, error } = await supabaseAdmin.auth.admin.listUsers();
    
    console.log(email);
    console.log("DATA: ", data.users);

    const user = data.users.find((u) => u.email === email);

    console.log("User: ", user);

    return user; 
}

export async function findUserById(id) {
    try {
        const { data, error } = await supabaseAdmin.auth.admin.getUserById(id.id);
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
   // console.log(data.users[0].user_metadata.group);
    const membersList = data.users.filter((u) => u.user_metadata.group === groupId && u.id != id);
    console.log(membersList);
    return membersList;
}

export async function updateUserMetadata(id, groupId, ambassador) {
    console.log(id, groupId, ambassador);
    const user_metadata = ambassador 
        ? { group: groupId, ambassador }
        : { group: groupId };

   const { data, error } = await supabaseAdmin.auth.admin.updateUserById(id, { user_metadata });

   if (error) {
        console.error("Error updating user metadata:", error);
        throw error; // Propagate the error
    }

    return data;
}