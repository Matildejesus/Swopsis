import { Platform } from "react-native";
import supabaseStateless from "./statelessSupabase";
import supabase from "./supabase";

export async function register({ userName, email, password }) {
    const { data, error } = await supabaseStateless.auth.signUp({
        email,
        password,
        options: {
            data: {
                userName,
                avatar: "",
                group: "",
                coins: 1,
                ambassador: false,
                totalWeight: 0,
                totalLitres: 0,
                totalCarbon: 0,
                itemsSwapped: 0,
            },
        },
    });

    if (error) {
        throw new Error(error.message);
    }
    return data?.user ?? null;
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
    const [{ data: userData }] = await Promise.all([
        supabase.auth.getUser()
    ]);

    if (error) {
        throw new Error(error.message);
    }
    return userData.user;
}

export async function updateGroup({ group }, userId) {
    let updateData = {};
    if (group) updateData.data = {...updatedData.data, group };

    const { data, error } = await supabase.auth.updateUser(updateData);
    if (error) throw new Error(error.message);

    return data.user;
}

export async function updateUserData({
    newCoins,
    totalLitres,
    totalCarbon,
    totalWeight,
    itemsSwapped,
}) {
    let updateData = {
        data: {
            coins: newCoins,
            totalWeight,
            totalLitres,
            totalCarbon,
            itemsSwapped,
        }
    };

    const { data, error } = await supabase.auth.updateUser(updateData);
    if (error) throw new Error(error.message);

    return data;
}

export async function updateUser({ userName, avatar, password }, userId) {
    try {
        let updateData = {};
        let updatedUser = null;

        if (userName) {
            updateData.data = { ...updateData.data, userName };
            const { data, error } = await supabase.auth.updateUser(updateData);
            if (error) throw new Error(error.message);
            updatedUser = data.user;
        }
        if (password) {
            await supabase.auth.updateUser({ password });
        }

        if (avatar) {
            const fileExt = avatar.split(".").pop();
            const fileName = `${userId}/avatar.${fileExt}`;

            let formData;
            if (Platform.OS === "web") {
                const response = await fetch(avatar); // avatar is a data: URL or blob URL
                const blob = await response.blob();
                formData = new File([blob], fileName, { type: `image/${fileExt}` });
            } else {
                formData = new FormData();
                formData.append("file", {
                    uri: avatar,
                    name: fileName,
                    type: `image/${fileExt}`,
                });
            }

            const { error: storageError } = await supabase.storage
                .from("avatars")
                .upload(fileName, formData, {
                    contentType: "image/jpg",
                    upsert: true, // Changed to true to allow updates
                });

            if (storageError) throw new Error(storageError.message);

            const { data: urlData } = supabase.storage
                .from('avatars')
                .getPublicUrl(fileName);

            const { data: userWithAvatar, error: updateError } = await supabase.auth.updateUser({
                data: { avatar: urlData.publicUrl }
            });

            if (updateError) throw new Error(updateError.message);
            updatedUser = userWithAvatar.user;
        }
        return updatedUser;
        
    } catch (error) {
        console.error("Update error:", error);
        throw error;
    }
}