import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getGroups } from "../services/apiGroups";

export function useAllGroups() {
    const queryClient = useQueryClient();
    const { data: groups, isLoading, isFetching } = useQuery({
        queryKey: ["allGroups"],
        queryFn: async () => {
            const groups = await getGroups();
            return groups;
        },
        onSuccess: (groupsData) => {
            queryClient.setQueryData(["allGroups"], groupsData);
        }
    });
    return { groups, isLoading, isFetching };
}

