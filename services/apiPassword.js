import supabase from "./supabase";

export async function changePassword(email) {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email);
  console.log("email: " + email);

  if (error) {
    throw new Error(error.message);
  }
  console.log(data);
  return data;
}
