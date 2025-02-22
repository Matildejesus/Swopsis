import supabase from "./supabase";

export async function createConversation({ user1, user2 }) {
    const { data, error } = await supabase
        .from("Conversations")
        .insert([
            {
                userId_1: user1,
                userId_2: user2,
            }
        ])
        .select();

    if (error) {
        throw new Error(error.message);
    }

    return data[0];
}

export async function getAllConversation({ userId }) {
    console.log("Userid: ", userId);
    const { data, error } = await supabase
        .from("Conversations")
        .select("*")
       // .eq("userId_2", userId);
         .or(`userId_1.eq.${userId},userId_2.eq.${userId}`);

    if (error) {
        throw new Error(error.message);
    }
    console.log("Conversations: ", data);
    return data;
}

export async function getConversation({userId_1, userId_2}) {
    const { data, error } = await supabase
        .from("Conversations")
        .select("*")
        .or(`and(userId_1.eq.${userId_1},userId_2.eq.${userId_2}),and(userId_1.eq.${userId_2},userId_2.eq.${userId_1})`);

        if (error) {
            throw new Error(error.message);
        }
        console.log("Conversations: ", data);
        return data[0];

}

export async function sendMessage({ senderId, text = null, itemId = null, conversationId }) {
    const messageType = text ? "text" : "item";

    const { data, error } = await supabase
        .from("Messages")
        .insert([
            {
              conversationId,
                senderId,
                text,
                itemId,
                messageType   
            }   
        ])
        .select();

    if (error) {
        throw new Error(error.message);
    }

    return data[0];
}

export async function getMessagesForConvo({ conversationId }) {
    const { data, error } = await supabase
        .from("Messages")
        .select("*")
        .eq("conversationId", conversationId)
        .order("created_at", {ascending: false });

    if (error) {
        throw new Error(error.message);
    }

    return data;
}