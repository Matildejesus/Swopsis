import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getGroupItems } from "../services/apiItems";
import { useUser } from "./auth/useUser";
import { getWishlist } from "../services/apiWishlist";
import { use, useCallback } from "react";
import { useMembers } from "./useMembers";
export function useGroupWardrobe() {
    const { user } = useUser();
    const groupId = user?.user?.user_metadata?.group;

    const {members: groupMembers } = useMembers(groupId);
    const queryClient = useQueryClient();

    const {data: groupWardrobe, isLoading, isFetching } = useQuery({
        queryKey: ["groupWardrobe", groupId],
        queryFn: async () =>  {
            console.log("[useGroupWardrobe] Fetching wardrobe for group:", groupId);

            const [items, wishlist] = await Promise.all([
                getGroupItems({ groupId, groupMembers }),
                getWishlist({ userId: user.user.id })
            ]);

            console.log("[useGroupWardrobe] Items fetched:", items[0], "Wishlist items:", wishlist.length);

            return items.map(item => ({
                ...item,
                wishlist: wishlist.some(wishlistItem => wishlistItem.itemId === item.id)
            }));
        },
        enabled: !!groupId,
        onSuccess: (wardrobeData) => {
            // LOG: query success, cache update
            console.log("[useGroupWardrobe] Query success. Updating cache. Wardrobe size:", wardrobeData.length);
            queryClient.setQueryData(["groupWardrobe"], groupId); 
        }
    });

    const refetchNew = useCallback(async () => {

        console.log("[useGroupWardrobe] Running refetchNew for group:", groupId);

        const data = queryClient.getQueryData(["groupWardrobe", groupId]) ?? [];
        console.log("[useGroupWardrobe] Current cached items:", data.length);

        if (!data.length) {
            console.log("[useGroupWardrobe] No cached items, skipping incremental fetch");
            return;
        }

        const latestItem = data[0];
        console.log("[useGroupWardrobe] Latest cached item:", latestItem);

        const newItems = await getGroupItems({ groupId, groupMembers, after: latestItem.extraInfo?.created_at });

        // LOG: how many new items came back
        console.log("[useGroupWardrobe] New items fetched:", newItems.length);

        if (!newItems.length) {
            console.log("[useGroupWardrobe] No new items found, cache unchanged");
            return;
        }

        queryClient.setQueryData(
            ["groupWardrobe", groupId],
            (old = []) => {
                const updated = [...newItems, ...old];
                // LOG: final wardrobe size after merge
                console.log("[useGroupWardrobe] Cache updated. New size:", updated.length);
                return updated;
            }
        );

    }, [groupId, queryClient]);

    // LOG: status each render
    console.log("[useGroupWardrobe] Is query running?", isFetching, "Is loading:", isLoading);

    return { groupWardrobe, isLoading, isFetching, refetchNew};
}
