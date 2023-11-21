import supabase from "./supabase";

export async function register({ userName, email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { userName, avatar: "", coins: 0 } },
  });

  if (error) {
    throw new Error(error.message);
  }
}

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }
  console.log(data);
  return data;
}

export async function getUser() {
  const { data: session } = await supabase.auth.getSession();

  if (!session.session) return null;
  const { data, error } = await supabase.auth.getUser();
  console.log(data);

  if (error) {
    throw new Error(error.message);
  }
  console.log(data);
  return data?.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    throw new Error(error.message);
  }
}
export async function updateUser({ password, userName, avatar }) {
  let updateData;
  if (password) updateData = { password };
  if (userName) updateData = { data: { userName } };

  const { data, error } = await supabase.auth.updateUser(updateData);

  if (error) throw new Error(error.message);

  // const fileName = `avatar-${data.user.id}-${Math.random()}`;

  // const { error: storageError } = await supabase.storage
  //   .from("avatars")
  //   .upload(fileName, avatar);

  // if (storageError) throw new Error(storageError.message);

  // const { data: updatedUser, error: error2 } = await supabase.auth.updateUser({
  //   data: {
  //     avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
  //   },
  // });

  // if (error2) throw new Error(error2.message);
  // return updatedUser;
}
