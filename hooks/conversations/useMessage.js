import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getMessagesForConvo } from "../../services/apiChat";

export function useMessages(conversationId) {
    const queryClient = useQueryClient();
    
    const { data: messages, isLoading } = useQuery({
        queryKey: ["messages", conversationId],
        queryFn: async () => {
            const messagesData = await getMessagesForConvo( {conversationId} );
            if (messagesData) {
                return messagesData;
            }
        },
        enabled: !!conversationId,
        onSuccess: (messagesData) => {
            queryClient.setQueryData(["messages", conversationId], messagesData);
        }
    });
    return { messages, isLoading };
}