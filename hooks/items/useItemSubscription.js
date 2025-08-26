import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import supabase from '../../services/supabase';

export function useItemSubscription(groupId) {
    const queryClient = useQueryClient();

    useEffect(() => {
        if (!groupId) return;
        console.log("Setting up item subscription for group:", groupId);
        
        const channel = supabase
        .channel(`group-items-${groupId}`)
        .on(
            'postgres_changes',
            {
            event: 'INSERT',
            schema: 'public',
            table: 'Items',
            filter: `group=eq.${groupId}`
            },
            (payload) => {
            console.log('Received new item:', payload);
            queryClient.setQueryData(["groupWardrobe", groupId], (old) => 
                [...(old || []), {...payload.new, wishlist: false }]
            );
            console.log("New item added:", payload.new);
            }
        )
        .on(
            'postgres_changes',
            {
            event: 'UPDATE',
            schema: 'public',
            table: 'Items',
            filter: `group=eq.${groupId}`,
            columns: ['available', 'unavailableDates']
            },
            (payload) => {
            console.log("[subscription] Update received:", payload.new);
            queryClient.setQueryData(["groupWardrobe", groupId], (old) =>
                old.map(item => 
                item.id === payload.new.id ? { ...item, ...payload.new } : item
                )
            );
            }
        )
        .on(
            'postgres_changes',
            {
            event: 'DELETE',
            schema: 'public',
            table: 'Items',
            },
            (payload) => {
                console.log("[subscription] DELETE payload:", payload);

                // If your payload doesn't include old.group (replica identity not FULL),
                // fall back to just removing by id; optionally guard by groupId if present.
                const deletedId = payload?.old?.id ?? payload?.new?.id; // usually old.id
                const deletedGroup = payload?.old?.group;

                queryClient.setQueryData(["groupWardrobe", groupId], (old = []) => {
                    if (!Array.isArray(old)) return old;

                    // If old.group is available, verify it matches this group
                    if (deletedGroup != null && Number(deletedGroup) !== Number(groupId)) {
                    console.log("[subscription] DELETE for another group, ignoring");
                    return old;
                    }

                    const next = old.filter(item => String(item.id) !== String(deletedId));
                    console.log("[subscription] Deleted item", deletedId, "New size:", next.length);
                    return next;
                });
            }
        )
        .subscribe();

        return () => {
            console.log("Unsubscribing from channel");
            supabase.removeChannel(channel);
        };
    }, [groupId, queryClient]);
}