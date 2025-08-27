import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getMessagesForConvo } from "../../services/apiChat";

export function useMessages(conversationId) {
    const queryClient = useQueryClient();
    console.log("Setting up useMessages hook: ",conversationId);
    
    const { data: messages, isLoading } = useQuery({
        queryKey: ["messages", conversationId],
        queryFn: async () => {
            console.log("Fetching messages for conversation:", conversationId);
            const messagesData = await getMessagesForConvo( {conversationId} );
            if (messagesData) {
                console.log("Messages fetched successfully:", messagesData);
                return messagesData;
            }
        },
        enabled: !!conversationId,
        onSuccess: (messagesData) => {
            console.log("Messages fetched successfully:", messagesData);
            queryClient.setQueryData(["messages", conversationId], messagesData);
        },
        onSettled: () => {
        console.log("Query SETTLED (completed)");
    }   
    });
    return { messages, isLoading };
}