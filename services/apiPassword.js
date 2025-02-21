import supabase from "./supabase";

export async function changePassword(email) {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email);

    if (error) {
        throw new Error(error.message);
    }
    console.log(data);
    return data;
}
