import HeartIcon from "./icons/HeartIcon";
import FilledHeartIcon from "./icons/FilledHeartIcon";
import { TouchableOpacity } from "react-native";
import { useState } from "react";
import { useToggleWishlist } from "../hooks/items/useToggleWishlist";
import { useUser } from "../hooks/auth/useUser";

function HeartSwitch({ isWishListItem, itemId }) {
    const { user } = useUser();
    const { toggleWishlist } = useToggleWishlist();
    const [ isFilled, setIsFilled ] = useState(isWishListItem);

    const handleToggle = async () => {
        try {
            await toggleWishlist({ userId: user.user.id, itemId, wishlist: isWishListItem, groupId: user.user.user_metadata.group});
            setIsFilled(!isFilled);
        } catch (error) {
            console.error("Wishlist toggle failed:", error);
        }
    };

    return (
        <TouchableOpacity onPress={handleToggle}>
            {!isFilled ? <HeartIcon /> : <FilledHeartIcon />}
        </TouchableOpacity>
    );
}

export default HeartSwitch;
