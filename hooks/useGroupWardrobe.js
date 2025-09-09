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

            const [items, wishlist] = await Promise.all([
                getGroupItems({ groupId, groupMembers }),
                getWishlist({ userId: user.user.id })
            ]);

            return items.map(item => ({
                ...item,
                wishlist: wishlist.some(wishlistItem => wishlistItem.itemId === item.id)
            }));
        },
        enabled: !!groupId,
        onSuccess: (wardrobeData) => {
            // LOG: query success, cache update
            queryClient.setQueryData(["groupWardrobe"], groupId); 
        }
    });

    const refetchNew = useCallback(async () => {

        const data = queryClient.getQueryData(["groupWardrobe", groupId]) ?? [];

        if (!data.length) {
            return;
        }

        const latestItem = data[0];

        const newItems = await getGroupItems({ groupId, groupMembers, after: latestItem.extraInfo?.created_at });

        // LOG: how many new items came back

        if (!newItems.length) {
            return;
        }

        queryClient.setQueryData(
            ["groupWardrobe", groupId],
            (old = []) => {
                const updated = [...newItems, ...old];
                // LOG: final wardrobe size after merge
                return updated;
            }
        );

    }, [groupId, queryClient]);

    return { groupWardrobe, isLoading, isFetching, refetchNew};
}
