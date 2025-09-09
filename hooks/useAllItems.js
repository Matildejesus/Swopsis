import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllItems } from "../services/apiAdmin";
import { useAllMembers } from "./useAllMembers";
import { useAllItemConversions } from "./useAllItemConversions";
import { useUser } from "./auth/useUser";
import { getGroupItems } from "../services/apiItems";

export function useAllItems() {
    const queryClient = useQueryClient();
    const { user } = useUser();
    const { members, isLoading: membersLoading } = useAllMembers();
    const { itemConversions, isLoading: convLoading } = useAllItemConversions();

    const enabled = !!members && !!itemConversions;

    const { data = [], isLoading, isFetching } = useQuery({
        queryKey: ["allItems", members?.length ?? 0, itemConversions?.length ?? 0],
        queryFn: async () => {
            if (user.user.user_metadata.ambassador) {
                return await getGroupItems({groupId: user.user.user_metadata.group, groupMembers: members, itemConversions })
            } else {
                const items = await getAllItems(members, itemConversions);
                return items;
            }
        
        },
        enabled: !!user,
        staleTime: 60_000,
        gcTime: 5 * 60_000,
        onSuccess: (itemsData) => {
        queryClient.setQueryData(["allItems"], itemsData);
        },
    });

    const pending = !enabled || isLoading || isFetching || membersLoading || convLoading;

    return { items: data, isLoading: pending };
}