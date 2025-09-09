import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import supabase from '../../services/supabase';

export function useItemSubscription(groupId) {
    const queryClient = useQueryClient();

    useEffect(() => {
        if (!groupId) return;
        
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
            queryClient.setQueryData(["groupWardrobe", groupId], (old) => 
                [...(old || []), {...payload.new, wishlist: false }]
            );
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
                const deletedId = payload?.old?.id ?? payload?.new?.id; // usually old.id
                const deletedGroup = payload?.old?.group;

                queryClient.setQueryData(["groupWardrobe", groupId], (old = []) => {
                    if (!Array.isArray(old)) return old;

                    // If old.group is available, verify it matches this group
                    if (deletedGroup != null && Number(deletedGroup) !== Number(groupId)) {
                    return old;
                    }

                    const next = old.filter(item => String(item.id) !== String(deletedId));
                    return next;
                });
            }
        )
        .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [groupId, queryClient]);
}