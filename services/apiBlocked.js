import supabase from "./supabase";

export async function addBlocked({ user1, user2 }) {
    console.log(user1, user2);
    const { data, error } = await supabase
    .from("Blocks")
    .insert([
        {
            user_1: user1,
            user_2: user2
        }
    ])
    .select();

    console.log("BLOCKED: ", data[0]);
    if (error) {
        throw new Error(error.message);
    }

    return data[0];
}

export async function getAllBlocked({ userId }) {
    const { data: userBlocks, error } = await supabase
    .from("Blocks")
    .select("user_2")
    .eq("user_1", userId);

    const { data: userBeingBlocked, error: beingBlockedError } = await supabase
    .from("Blocks")
    .select("user_1")
    .eq("user_2", userId);

    const blockedIds = userBlocks?.map(row => row.user_2) || [];
    const beingBlockedIds = userBeingBlocked?.map(row => row.user_1) || [];

    if (error) {
        throw new Error(error.message);
    }
    return {blockedIds, beingBlockedIds};
}

export async function unblockUser({ user1, user2 }) {
    const { error } = await supabase
    .from("Blocks")
    .delete()
    .match({ user_1: user1, user_2: user2 });
    if (error) throw new Error(error.message);
    return true;
}