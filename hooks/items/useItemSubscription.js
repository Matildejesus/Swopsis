import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import supabase from '../../services/supabase';

export function useItemSubscription(groupId) {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!groupId) return;

    const channel = supabase
      .channel(`group-items-${groupId}`)
      // INSERT on Items
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'Items', filter: `group=eq.${groupId}` },
        async (payload) => {
          // 1) fetch the fresh item
          const { data: freshItem } = await supabase
            .from('Items')
            .select('*')
            .eq('id', payload.new.id)
            .single();

          if (!freshItem) return;

          // 2) Upsert base item into cache immediately (no dupes)
          queryClient.setQueryData(['groupWardrobe', groupId], (old = []) => {
            const arr = Array.isArray(old) ? old : [];
            const idx = arr.findIndex((i) => String(i.id) === String(freshItem.id));
            const nextItem = idx === -1 ? freshItem : { ...arr[idx], ...freshItem };
            if (idx === -1) return [...arr, nextItem];
            const copy = arr.slice();
            copy[idx] = nextItem;
            return copy;
          });

          // 3) Poll for the subcategory details (arrive after base item)
          const table = freshItem.category; // 'Accessories' | 'Clothing' | 'Shoes'
          const fetchDetails = async (tries = 6, delayMs = 300) => {
            const { data, error } = await supabase
              .from(table)
              .select('*')
              .eq('itemId', freshItem.id)
              .maybeSingle();
            if (data || tries <= 0) return data ?? null;
            await new Promise((r) => setTimeout(r, delayMs));
            return fetchDetails(tries - 1, delayMs * 2);
          };

          const details = await fetchDetails();

          if (details) {
            const buckets = { Accessories: [], Clothing: [], Shoes: [] };
            buckets[table] = [details];

            // 4) Merge details into the existing cache item (no append)
            queryClient.setQueryData(['groupWardrobe', groupId], (old = []) => {
              const arr = Array.isArray(old) ? old : [];
              const idx = arr.findIndex((i) => String(i.id) === String(freshItem.id));
              if (idx === -1) {
                // fallback: if somehow missing, add it once, merged
                return [
                  ...arr,
                  { ...freshItem, ...buckets, extraInfo: details, wishlist: false },
                ];
              }
              const merged = {
                ...arr[idx],
                ...freshItem,
                ...buckets,
                extraInfo: details,
                wishlist: arr[idx].wishlist ?? false,
              };
              const copy = arr.slice();
              copy[idx] = merged;
              return copy;
            });
          }
        }
      )
      // UPDATE on Items (availability etc.)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'Items',
          filter: `group=eq.${groupId}`,
          columns: ['available', 'unavailableDates'],
        },
        (payload) => {
          queryClient.setQueryData(['groupWardrobe', groupId], (old = []) => {
            const arr = Array.isArray(old) ? old : [];
            return arr.map((item) =>
              String(item.id) === String(payload.new.id)
                ? { ...item, available: payload.new.available, unavailableDates: payload.new.unavailableDates }
                : item
            );
          });
        }
      )
      // DELETE on Items
      .on(
        'postgres_changes',
        { event: 'DELETE', schema: 'public', table: 'Items' },
        (payload) => {
          const deletedId = payload?.old?.id ?? payload?.new?.id;
          const deletedGroup = payload?.old?.group;

          queryClient.setQueryData(['groupWardrobe', groupId], (old = []) => {
            const arr = Array.isArray(old) ? old : [];
            if (deletedGroup != null && Number(deletedGroup) !== Number(groupId)) return arr;
            return arr.filter((item) => String(item.id) !== String(deletedId));
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [groupId, queryClient]);
}
