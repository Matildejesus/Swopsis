import { useQuery } from "@tanstack/react-query";
import { getGroupItems } from "../services/apiItems";
import { useUser } from "./useUser";
import { useDispatch } from "react-redux";
import { setItem } from "../store/item";

export function useGroupWardrobe() {
    const { user } = useUser();
    const groupId = user?.user_metadata?.group;
    const dispatch = useDispatch();
    
    const {data: groupWardrobe, isLoading, isFetching } = useQuery({
        queryKey: ["groupWardrobe", groupId],
        queryFn: () =>  {
            console.log("[useGroupWardrobe] Query execution triggered");
            return getGroupItems({ groupId });
        },
        enabled: !!groupId,
        onSuccess: (wardrobeData) => {
            dispatch(setItem(wardrobeData));
            console.log("Wardrobe Data: ", wardrobeData);
        }
    });

    console.log("Is query running?", isFetching)
    return { groupWardrobe, isLoading, isFetching};
}
