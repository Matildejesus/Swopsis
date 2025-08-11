import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllItems } from "../services/apiAdmin";
import { useAllMembers } from "./useAllMembers";

export function useAllItems() {
    const queryClient = useQueryClient();
     const { members } = useAllMembers();
    const { data: items, isLoading, isFetching } = useQuery({
        queryKey: ["allItems"],
        queryFn: async () => {
            const items = await getAllItems(members);
            return items;
        },
        onSuccess: (itemsData) => {
            queryClient.setQueryData(["allItems"], itemsData);
        }   
    });
    return { items, isLoading, isFetching };
}