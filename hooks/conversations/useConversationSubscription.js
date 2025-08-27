import { useQueryClient } from "@tanstack/react-query";
import supabase from "../../services/supabase";
import { useEffect } from "react";

export function useConversationSubscription(conversationId) {
    const queryClient = useQueryClient();

    useEffect(() => {
        if (!conversationId) return;
        console.log("[conv] subscribe", conversationId);

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
                console.log('New message in conversation: ', conversationId)
                queryClient.setQueryData(["messages", conversationId], (old = []) => [
                payload.new,           // put new first
                ...old
                ]);

            }
        )
        .subscribe();

        return () => {
            console.log("Unsubscribing from channel");
            supabase.removeChannel(channel);
        };
    }, [conversationId, queryClient]);
}