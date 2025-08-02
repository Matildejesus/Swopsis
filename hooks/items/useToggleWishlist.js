import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteItems as deleteItemApi } from "../../services/apiItems";
import { toggleWishlist as toggleWishlistApi } from "../../services/apiWishlist";
import Toast from "react-native-toast-message";

export function useToggleWishlist() {
    const queryClient = useQueryClient();

    const { mutate: toggleWishlist, isLoading: isDeleting } = useMutation({
        mutationFn: async ({ userId, itemId, wishlist }) => {
            const data = await toggleWishlistApi({ userId, itemId, wishlist});
            return { data, itemId, wishlist };
        },
        onSuccess: ({data, itemId, wishlist}) => {
            // const previousWardrobe = queryClient.getQueryData(['groupWardrobe']);
            console.log("THERE IS SUCCESS");
            queryClient.setQueryData(['groupWardrobe'], (old) => {
                const updated = old?.map(item => 
                    item.id === itemId 
                        ? { ...item, wishlist: !wishlist } 
                        : item
                );
                console.log('Updated data:', updated);
                return updated;
            });
    
    const current = queryClient.getQueryData(['groupWardrobe']);
    console.log('Current data after update:', current);

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
