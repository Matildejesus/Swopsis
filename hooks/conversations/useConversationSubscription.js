import { useQueryClient } from "@tanstack/react-query";
import supabase from "../../services/supabase";
import { useEffect } from "react";

export function useConversationSubscription(conversationId) {
    const queryClient = useQueryClient();

    useEffect(() => {
        if (!conversationId) return;

        const channel = supabase
        .channel(`conv-${conversationId}`)
        .on(
            'postgres_changes',
            {
                event: 'INSERT',
                schema: 'public',
                table: 'Messages',
                filter: `conversationId=eq.${conversationId}`
            },
            (payload) => {
                queryClient.setQueryData(["messages", conversationId], (old = []) => [
                payload.new,         
                ...old
                ]);
                queryClient.setQueryData(["unread", conversationId], (count = 0) => count + 1);


            }
        )
        .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [conversationId, queryClient]);
}