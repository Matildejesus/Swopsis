import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllConversation } from "../../services/apiChat";
import { useUser } from "../auth/useUser";
import { use } from "react";
import { useMembers } from "../useMembers";

export function useConversations() {
    const { user } = useUser();
    const queryClient = useQueryClient();
    const {members: groupMembers } = useMembers(user?.user?.user_metadata?.group);

    const { data: conversations, isLoading, isFetching } = useQuery({
        queryKey: ["conversations"],
        queryFn: async () => {
            const data = await getAllConversation({ userId: user?.user?.id, groupMembers });
            console.log("Conversations fetched:", data);
            return data;
        },
        enabled: !!user?.user?.id,
        onSuccess: (conversationsData) => {
            queryClient.setQueryData(["conversations"], conversationsData);
        }
    })

    return { conversations, isLoading };

}