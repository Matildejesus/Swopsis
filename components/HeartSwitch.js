import HeartIcon from "./icons/HeartIcon";
import FilledHeartIcon from "./icons/FilledHeartIcon";
import { TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import { addItemToWishlist, removeWishlistItem } from "../services/apiWishlist";
import { useToggleWishlist } from "../hooks/items/useToggleWishlist";
import { useUser } from "../hooks/auth/useUser";

function HeartSwitch({ isWishListItem, itemId }) {
    const { user } = useUser();
    const { toggleWishlist } = useToggleWishlist();
    const [ isFilled, setIsFilled ] = useState(isWishListItem);

    const handleToggle = async () => {
      //  const newIsFilled = !isFilled;  // New state after toggle
      //  setIsFilled(newIsFilled);
        try {
            await toggleWishlist({ userId: user.user.id, itemId, wishlist: isWishListItem});
            setIsFilled(!isFilled);
            console.log("Item is now in wishlist: ", !isFilled);
        } catch (error) {
            console.error("Wishlist toggle failed:", error);
        }
    };

    return (
        <TouchableOpacity onPress={handleToggle}>
            {!isWishListItem ? <HeartIcon /> : <FilledHeartIcon />}
        </TouchableOpacity>
    );
}

export default HeartSwitch;
