import { useQuery } from "@tanstack/react-query";

export function useItem() {
    const { data: item, isLoading } = useQuery({
        queryKey: ["item"],
        queryFn: getItem,
    });
    
    return {isLoading, item};
}
