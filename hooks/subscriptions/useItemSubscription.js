import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import supabase from '../../services/supabase';

export function useItemSubscription(groupId) {
    const queryClient = useQueryClient();

    useEffect(() => {
        if (!groupId) return;
        console.log("Setting up item subscription for group:", groupId);
        
        const channel = supabase
        .channel('smart-items-subscription')
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
            filter: `group=eq.${groupId}`
            },
            (payload) => {
            queryClient.setQueryData(["groupWardrobe", groupId], (old) =>
                old.filter(item => item.id !== payload.old.id)
            );
            }
        )
        .subscribe();

        // return () => supabase.removeChannel(channel);
    }, [groupId, queryClient]);
}