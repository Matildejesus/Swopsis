import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllItems } from "../services/apiAdmin";
import { useAllMembers } from "./useAllMembers";
import { useAllItemConversions } from "./useAllItemConversions";

export function useAllItems() {
    const queryClient = useQueryClient();
    const { members, isLoading: membersLoading } = useAllMembers();
    const { itemConversions, isLoading: convLoading } = useAllItemConversions();

    const enabled = !!members && !!itemConversions;

    const { data = [], isLoading, isFetching } = useQuery({
        queryKey: ["allItems", members?.length ?? 0, itemConversions?.length ?? 0],
        queryFn: async () => {
        const items = await getAllItems(members, itemConversions);
        return items;
        },
        enabled,
        staleTime: 60_000,
        gcTime: 5 * 60_000,
        onSuccess: (itemsData) => {
        queryClient.setQueryData(["allItems"], itemsData);
        },
    });

    const pending = !enabled || isLoading || isFetching || membersLoading || convLoading;

    return { items: data, isLoading: pending };
}