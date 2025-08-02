import supabase from "./supabase";

export async function addItemToWishlist({ userId, itemId }) {
    const { data, error } = await supabase
        .from("Wishlist")
        .insert([
            {
                userId,
                itemId,
            },
        ])
        .select();

    if (error) {
        throw new Error(error.message);
    }
    return data;
}

export async function removeWishlistItem({ id }) {
    const { error } = await supabase
        .from("Wishlist")
        .delete()
        .eq("id", id);

    if (error) {
        throw new Error(error.message);
    }
}

export async function toggleWishlist({ userId, itemId, wishlist }) {
    if (wishlist) {
        const { error } = await supabase
            .from("Wishlist")
            .delete()
            .eq("userId", userId)
            .eq("itemId", itemId);

        if (error) {
            throw new Error(error.message);
        }
    } else {
        const { data, error } = await supabase
            .from("Wishlist")
            .insert([
                {
                    userId,
                    itemId,
                },
            ])
            .select();

        if (error) {
            throw new Error(error.message);
        }
        return data;
    }
}

export async function getWishlist({ userId }) {
    console.log("Fetching wishlist for userId: ", userId);
    const { data, error } = await supabase
        .from("Wishlist")
        .select("*")
        .eq("userId", userId)
        .order("created_at", { ascending: false });

    console.log("Wishlist data: ", data);
    if (error) {
        throw new Error(error.message);
    }
    return data;
}
