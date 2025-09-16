import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getJoinRequests } from "../services/apiJoinRequests";
import { useAllGroups } from "./useAllGroups";
import { useUser } from "./auth/useUser";

export function useRequests() {
    const queryClient = useQueryClient();
    const { user } = useUser();
    const groupId = user?.user?.user_metadata?.group;
    const { groups, isLoading: groupsLoading} = useAllGroups();
    const { data: requests, isLoading } = useQuery({
        queryKey: ["requests", groupId ?? "all"],
        queryFn: async () => {
            if (user?.user?.user_metadata?.group) {
                const data = await getJoinRequests({groupId: user.user.user_metadata.group});
                return data;
            } else {
                const accepted = [];
                const rejected = [];
                const pending = [];
                groups?.forEach((group) => {
                    if (group.status === "Approved") {
                        accepted.push(group);
                    } else if (group.status === "Rejected") {
                        rejected.push(group);
                    } else {
                        pending.push(group);
                    }
                });

                return { accepted, rejected, pending };
            }
        },
        enabled: !groupsLoading || !!user && !!groups,
        onSuccess: (requestsData) => {
            queryClient.setQueryData(["requests"], requestsData);
        }
    });
    return { 
        accepted: requests?.accepted || [], 
        pending: requests?.pending || [], 
        rejected: requests?.rejected || [], 
        isLoading 
    };
}