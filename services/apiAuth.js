import supabase from "./supabase";

export async function register({ userName, email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { userName, avatar: "", group: "", coins: 10, ambassador: false, totalWeight: 0, totalLitres: 0, totalCarbon: 0, itemsSwapped: 0 } },
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
  return data;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    throw new Error(error.message);
  }
}

export async function getUser() {
  const { data: session } = await supabase.auth.getSession();

  if (!session.session) return null;
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    throw new Error(error.message);
  }
  console.log(data);
  return data?.user;
}

export async function updateGroup({ group }) {
  console.log("Group to update:", group);
  let updateData = {};
  if (group) updateData.data = { group };
  console.log(updateData);

  const { data, error } = await supabase.auth.updateUser(updateData);
  if (error) throw new Error(error.message);

  return data;
}

export async function updateUserData({ newCoins, totalLitres, totalCarbon, totalWeight, itemsSwapped }) {
  let updateData = {};
  updateData.data = { coins: newCoins, totalWeight, totalLitres, totalCarbon, itemsSwapped };
  console.log(updateData);

  const { data, error } = await supabase.auth.updateUser(updateData);
  if (error) throw new Error(error.message);

  return data;
}

export async function updateUser({ userName, avatar }) {
  let updateData = {};
  if (userName) updateData.data = { userName };
  console.log(updateData);

  const { data, error } = await supabase.auth.updateUser(updateData);
  if (error) throw new Error(error.message);

  if (!avatar) return data;

  try {
    console.log("Avatar URI:", avatar);

    const fileExt = avatar.split(".").pop();
    const fileName = `avatars/${Math.random()}.${fileExt}`;

    let formData = new FormData();
    formData.append("file", {
      uri: avatar,
      name: fileName,
      type: `image/${fileExt}`,
    });
    console.log(formData);

    const { error: storageError } = await supabase.storage
      .from("avatars")
      .upload(fileName, formData, {
        contentType: "image/jpg",
        upsert: false,
      });

    if (storageError) {
      console.error("Storage Error:", storageError);
      throw new Error(storageError.message);
    }

    // Update user's avatar URL
    const avatarUrl = `https://ubohapcfavgltukxiirg.supabase.co/storage/v1/object/public/avatars/${fileName}`;
    const { data: updatedUser, error: error2 } = await supabase.auth.updateUser(
      {
        data: {
          avatar: avatarUrl,
        },
      }
    );

    if (error2) {
      console.error("Update User Error:", error2);
      throw new Error(error2.message);
    }

    return updatedUser;
  } catch (generalError) {
    console.error("General Error:", generalError);
    throw generalError;
  }
}
