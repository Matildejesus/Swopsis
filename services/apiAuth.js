import supabase from "./supabase";

export async function register({ userName, email, password }) {
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                userName,
                avatar: "",
                group: "",
                coins: 10,
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
    const [{ data: session }, { data: userData }] = await Promise.all([
        supabase.auth.getSession(),
        supabase.auth.getUser()
    ]);

    if (error) {
        throw new Error(error.message);
    }
    return userData?.user;
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

export async function updateUserData({
    newCoins,
    totalLitres,
    totalCarbon,
    totalWeight,
    itemsSwapped,
}) {
    console.log("Starting updateUserData with:", {
        newCoins,
        totalLitres,
        totalCarbon,
        totalWeight,
        itemsSwapped,
    });
    let updateData = {
        data: {
            coins: newCoins,
            totalWeight,
            totalLitres,
            totalCarbon,
            itemsSwapped,
        }
    };
    console.log("Full updatedata : ", updateData);

    const { data, error } = await supabase.auth.updateUser(updateData);
    console.log("Update response data:", data);
    if (error) throw new Error(error.message);

    return data;
}

export async function updateUser({ userName, avatar }, userId) {
    try {
        let updateData = {};
        let updatedUser = null;

        // Handle username update
        if (userName) {
            updateData.data = { ...updateData.data, userName };
            const { data, error } = await supabase.auth.updateUser(updateData);
            if (error) throw new Error(error.message);
            updatedUser = data.user;
        }

        // Handle avatar update if provided
        if (avatar) {
            console.log("Updating user avatar for user ID:", userId);
            const fileExt = avatar.split(".").pop();
            const fileName = `${userId}/avatar.${fileExt}`;

            let formData = new FormData();
            formData.append("file", {
                uri: avatar,
                name: fileName,
                type: `image/${fileExt}`,
            });

            // Upload new avatar
            const { error: storageError } = await supabase.storage
                .from("avatars")
                .upload(fileName, formData, {
                    contentType: "image/jpg",
                    upsert: true, // Changed to true to allow updates
                });

            if (storageError) throw new Error(storageError.message);

            // Get public URL
            const { data: urlData } = supabase.storage
                .from('avatars')
                .getPublicUrl(fileName);

            // Update user with new avatar URL
            const { data: userWithAvatar, error: updateError } = await supabase.auth.updateUser({
                data: { avatar: urlData.publicUrl }
            });

            if (updateError) throw new Error(updateError.message);
            updatedUser = userWithAvatar.user;
        }
        console.log("Updated User:", updatedUser);
        // Return the updated user in the same structure as getUser()
        return updatedUser;
        
    } catch (error) {
        console.error("Update error:", error);
        throw error;
    }
}