import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import supabase from "../../services/supabase";

export function useMessageBroadcast(userId) {
    const queryClient = useQueryClient();

    useEffect(() => {
        if (!userId) return;
        console.log("Setting up message subscription for user:", userId);

        const messageChannel = supabase.channel(`messages_${userId}`)
            .on(
                'postgres_changes',
                {
                    event: 'INSERT',
                    schema: 'public',
                    table: 'Messages',
                    filter: `userId_1=eq.${userId} OR userId_2=eq.${userId}`
                },
                (payload) => {
                    console.log("New message received:", payload);
                    
                    // Update messages for the relevant conversation
                    queryClient.setQueryData(
                        ["messages", payload.new.conversationId],
                        (old) => [...(old || []), payload.new]
                    );
                }
            )
            .subscribe();

        //  const broadcastChannel = supabase.channel('rt_messages_' + userId)
        //     .on('broadcast', { event: 'typing' }, (payload) => {
        //         // Handle typing indicators
        //     })
        //     .on('broadcast', { event: 'read' }, (payload) => {
        //         // Handle read receipts
        //     })
        //     .subscribe();

            
        return () => {
            console.log("Unsubscribing from message channel");
            supabase.removeChannel(messageChannel);
            // supabase.removeChannel(broadcastChannel);
        };
    }, [userId, queryClient]);

}