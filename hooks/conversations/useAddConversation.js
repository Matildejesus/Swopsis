import { useMutation } from "@tanstack/react-query";
import { createConversation as createConversationApi } from "../../services/apiChat";
import Toast from "react-native-toast-message";

export function useAddConversation() {

    const { mutate: addConversation, isLoading } = useMutation({
        mutationFn: createConversationApi,
        onSuccess: () => {
            Toast.show({
                type: 'success',
                text1: 'Complete!',
                text2: 'Conversation Created successfully'
            });
        },
        onError: (err) => {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: err.message
            });
            console.log("Error creating conversation:", err.message);
        }
    });
    return { addConversation, isLoading };
}