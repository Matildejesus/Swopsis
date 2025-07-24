import { useQuery } from "@tanstack/react-query";
import { getUser } from "../services/apiAuth";
import { useDispatch } from "react-redux";

export function useWishlist(userId) {
    const dispatch = useDispatch();
    const { data: wishlist, isLoading } = useQuery({
        queryKey: ["wishlist"],
        queryFn: getWishlist,
        onSuccess: (wishlistData) => {
            dispatch(setUserWishlist(wishlistData));
        },
    });

    return { isLoading, user, isAuthenticated: user?.role === "authenticated" };
}


import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { 
  addItemToWishlist, 
  removeWishlistItem, 
  getWishlist,
  getWishListItem
} from "../services/apiWishlist";

export function useWishlist(userId) {
  const queryClient = useQueryClient();

  // Fetch entire wishlist
  const { data: wishlist } = useQuery({
    queryKey: ["wishlist", userId],
    queryFn: () => getWishlist({ userId }),
    enabled: !!userId,
  });

  // Check if single item is in wishlist
  const { data: isItemInWishlist } = useQuery({
    queryKey: ["wishlistItem", userId, itemId],
    queryFn: () => getWishListItem({ userId, itemId }),
    select: (data) => data.length > 0,
    enabled: !!userId && !!itemId,
  });

  // Add to wishlist mutation
  const { mutate: addToWishlist } = useMutation({
    mutationFn: ({ userId, itemId }) => addItemToWishlist({ userId, itemId }),
    onSuccess: () => {
      queryClient.invalidateQueries(["wishlist", userId]);
      queryClient.invalidateQueries(["wishlistItem", userId]);
    },
  });

  // Remove from wishlist mutation
  const { mutate: removeFromWishlist } = useMutation({
    mutationFn: (id) => removeWishlistItem({ id }),
    onSuccess: () => {
      queryClient.invalidateQueries(["wishlist", userId]);
      queryClient.invalidateQueries(["wishlistItem", userId]);
    },
  });

  // Toggle wishlist status
  const toggleWishlistItem = async (itemId) => {
    const [existingItem] = await getWishListItem({ userId, itemId });
    if (existingItem) {
      await removeFromWishlist(existingItem.id);
    } else {
      await addToWishlist({ userId, itemId });
    }
  };

  return {
    wishlist,
    isItemInWishlist,
    addToWishlist,
    removeFromWishlist,
    toggleWishlistItem,
  };
}