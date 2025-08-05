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

export async function getAllConversation({ userId, groupMembers}) {
    console.log("Userid: ", userId);
    const { data, error } = await supabase
        .from("Conversations")
        .select("*")
        .or(`userId_1.eq.${userId},userId_2.eq.${userId}`)
        .order("timestamp", { ascending: false });

    if (error) {
        throw new Error(error.message);
    }

    const transformedData = data.map(convo => {
        const otherUser = userId === convo.userId_1 ? convo.userId_2 : convo.userId_1;
        const otherUserData = groupMembers.find(member => member.userId === otherUser);
        
        return {
            ...convo,
            otherUserId: otherUser,
            userName: otherUserData?.userName || '',
            avatar: otherUserData?.avatar || '',
            email: otherUserData?.email || ''
        };
    });
    console.log("Conversations: ", transformedData);
    return transformedData;
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

export async function sendMessage({ senderId, text, itemId, loanDates, conversationId }) {
    const messageType = text ? "text" : loanDates ? "calendar" : "item";
    console.log("messageType", messageType);
    console.log("text", text);
    console.log("itemid", itemId);

    const { data, error } = await supabase
        .from("Messages")
        .insert([
            {
              conversationId,
                senderId,
                text,
                itemId,
                loanDates,
                messageType,
                decision: null
            }   
        ])
        .select();

    if (error) {
        throw new Error(error.message);
    }

    return data[0];
}

export async function getMessagesForConvo({ conversationId }) {
    console.log("Fetching messages for conversation ID:", conversationId);
    const { data, error } = await supabase
        .from("Messages")
        .select("*")
        .eq("conversationId", conversationId)
        .order("created_at", {ascending: false });

        console.log("Messages: ", data);

    if (error) {
        throw new Error(error.message);
    }

    return data;
}

export async function updateDecision({ id, decision }) {
    console.log(id);
    console.log(decision);
    const {data, error } = await supabase
        .from("Messages")
        .update({ "decision": decision })
        .eq("id", id)
        .select();

    if (error) {
        console.log("thisi is the problem");
        throw new Error(error.message);
    }

    return data;
}