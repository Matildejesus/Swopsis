import supabase, { supabaseUrl } from "./supabase";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import base64 from "base-64";

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

export async function updateUser({ userName, avatar }) {
  let updateData = {};
  if (userName) updateData.data = { userName };

  const { data, error } = await supabase.auth.updateUser(updateData);
  if (error) throw new Error(error.message);

  if (!avatar) return data;

  try {
    console.log("Avatar URI:", avatar);

    // Fetch and upload the image blob
    const response = await fetch(avatar);
    const blob = await response.blob();

    const fileExt = avatar.split(".").pop();
    const filePath = `avatars/${Math.random()}.${fileExt}`;
    console.log("File Path:", filePath);

    const { error: storageError } = await supabase.storage
      .from("avatars")
      .upload(filePath, blob, {
        contentType: "image/jpeg",
        upsert: false,
      });

    if (storageError) {
      console.error("Storage Error:", storageError);
      throw new Error(storageError.message);
    }

    // Update user's avatar URL
    const avatarUrl = `https://ubohapcfavgltukxiirg.supabase.co/storage/v1/object/public/avatars/${filePath}`;
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
