import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sendMessage as sendMessageApi } from "../../services/apiChat";

export function useSendMessages(conversationId) {
    const queryClient = useQueryClient();

    const { mutate: sendMessage, isLoading } = useMutation({
        mutationFn: sendMessageApi,
        onSuccess: (messageData) => {
            queryClient.setQueryData(["messages", conversationId], (old) => [
                ...(old || []), messageData] 
        );
        return messageData;
        },
        onError: (err) => {
            console.error("Error adding message:", err.message);
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: err.message
            });
        }
    });

    return { sendMessage, isLoading };
}