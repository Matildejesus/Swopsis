import HeartIcon from "./icons/HeartIcon";
import FilledHeartIcon from "./icons/FilledHeartIcon";
import { TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import { addItemToWishlist, removeWishlistItem } from "../services/apiWishlist";

function HeartSwitch({ itemId, userId, wishList, refreshWishlist }) {
    const [isFilled, setIsFilled] = useState(false);
    const [wishListId, setWishListId ] = useState();

    useEffect(() => {
        if (wishList) {
            setIsFilled(true);
            setWishListId(wishList.id); 
        } else {
            setIsFilled(false);
            setWishListId(null);
        }
    }, [wishList]);


    const handleToggle = async () => {
      //  const newIsFilled = !isFilled;  // New state after toggle
      //  setIsFilled(newIsFilled);

        if (isFilled) {
            // Remove from wishlist
            console.log("adding new wishlist item");
            await removeWishlistItem({ id: wishListId });
            setIsFilled(false);
            
        } else {
            // Add to wishlist 
            console.log("removing wishlist item");
            await addItemToWishlist({ userId, itemId });
            setIsFilled(true);
           
        }

        refreshWishlist();
    };
    
    return (
        <TouchableOpacity onPress={handleToggle}>
            {!isFilled ? <HeartIcon /> : <FilledHeartIcon />}
        </TouchableOpacity>
    );
}

export default HeartSwitch;
