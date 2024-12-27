import {supabaseAdmin} from "./supabase";

export async function findUserByEmail(email) {
    const { data, error } = await supabaseAdmin.auth.admin.listUsers();
    
    console.log(email);
    console.log("DATA: ", data.users);

    const user = data.users.find((u) => u.email === email);

    console.log("User: ", user);

    return user; // Return the user object
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