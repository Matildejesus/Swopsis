import { useQuery } from "@tanstack/react-query";
import { getNewItem } from "../../services/apiItems";

export function useItem({ userId }) {
    const { data: item, isLoading } = useQuery({
        queryKey: ["item", userId],
        queryFn: () => getNewItem({ userId }),
    });
    console.log(userId);
    console.log("actual: ", item);
    
    return {isLoading, item};
}

