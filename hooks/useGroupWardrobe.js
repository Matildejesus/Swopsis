import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getGroupItems } from "../services/apiItems";
import { useUser } from "./auth/useUser";
import { getWishlist } from "../services/apiWishlist";

export function useGroupWardrobe() {
    const { user } = useUser();
    // console.log("User in useGroupWardrobe: ", user.user.id);
    const groupId = user?.user?.user_metadata?.group;

    const queryClient = useQueryClient();

    const {data: groupWardrobe, isLoading, isFetching } = useQuery({
        queryKey: ["groupWardrobe", groupId],
        queryFn: async () =>  {
            const [items, wishlist] = await Promise.all([
                getGroupItems({ groupId }),
                getWishlist({ userId: user.user.id })
            ]);
            return items.map(item => ({
                ...item,
                wishlist: wishlist.some(wishlistItem => wishlistItem.itemId === item.id)
            }));
        },
        enabled: !!groupId,
        onSuccess: (wardrobeData) => {
            // console.log("Wardrobe Data: ", wardrobeData);
            queryClient.setQueryData(["groupWardrobe"], wardrobeData); 
        }
    });

    console.log("Is query running?", isFetching)
    return { groupWardrobe, isLoading, isFetching};
}
