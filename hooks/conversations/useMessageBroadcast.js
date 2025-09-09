import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import supabase from "../../services/supabase";

export function useMessageBroadcast(userId) {
    const queryClient = useQueryClient();

    useEffect(() => {
        if (!userId) return;

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
                    
                    // Update messages for the relevant conversation
                    queryClient.setQueryData(
                        ["messages", payload.new.conversationId],
                        (old) => [...(old || []), payload.new]
                    );
                }
            )
            .subscribe();
            
        return () => {
            supabase.removeChannel(messageChannel);
            // supabase.removeChannel(broadcastChannel);
        };
    }, [userId, queryClient]);

}