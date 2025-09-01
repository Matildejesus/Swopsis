import supabase from "./supabase";

export async function addReport({ reporter, reported_user, message }) {
  const { data, error } = await supabase
    .from("Reports")
    .insert([
      {
        reporter,
        reported_user,
        message,
      },
    ])
    .select();

  if (error) {
    throw new Error(error.message);
  }

  return data[0];
}

