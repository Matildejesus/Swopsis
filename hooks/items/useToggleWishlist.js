import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleWishlist as toggleWishlistApi } from "../../services/apiWishlist";
import Toast from "react-native-toast-message";

export function useToggleWishlist() {
    const queryClient = useQueryClient();

    const { mutate: toggleWishlist, isLoading: isDeleting } = useMutation({
        mutationFn: async ({ userId, itemId, wishlist, groupId }) => {
            const data = await toggleWishlistApi({ userId, itemId, wishlist});
            return { data, itemId, wishlist, groupId };
        },
        onSuccess: ({data, itemId, wishlist, groupId}) => {
            // const previousWardrobe = queryClient.getQueryData(['groupWardrobe']);
            queryClient.setQueryData(['groupWardrobe', groupId], (old) => {
                const updated = old?.map(item => 
                    item.id === itemId 
                        ? { ...item, wishlist: !wishlist } 
                        : item
                );
                return updated;
            });
    
            const current = queryClient.getQueryData(['groupWardrobe', groupId]);

            Toast.show({
                type: 'success',
                text1: 'Success',
                text2: wishlist ? 'Removed from wishlist' : 'Added to wishlist'
            });
        },
        onError: (err) => {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: err.message
            });
        },
    });

    return { toggleWishlist };
}
