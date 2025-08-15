import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getJoinRequests } from "../services/apiJoinRequests";
import { useAllGroups } from "./useAllGroups";
import { useUser } from "./auth/useUser";

export function useRequests() {
    const queryClient = useQueryClient();
    const { user } = useUser();
    const { groups, isLoading: groupsLoading} = useAllGroups();
    console.log("GROUPS: ", groups);
    const { data: requests, isLoading } = useQuery({
        queryKey: ["requests" || "allGroups"],
        queryFn: async () => {
            console.log("use req running");
            if (user?.user?.user_metadata?.group) {
                const data = await getJoinRequests({groupId: user.user.user_metadata.group});
                console.log("JOIN REQUEST DATA: ", data);
                return data;
            } else {
                const accepted = [];
                const rejected = [];
                const pending = [];
                console.log("no group ID so grouping the groups");
                groups?.forEach((group) => {
                    if (group.status === "approve") {
                        accepted.push(group);
                    } else if (group.status === "reject") {
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