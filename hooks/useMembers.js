import { useQuery, useQueryClient } from "@tanstack/react-query";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import { getFilteredGroupMember } from "../services/apiAdmin";

export function useMembers(groupId) {
    const queryClient = useQueryClient();
    const {data: members, isLoading} = useQuery({
        queryKey: ["members"],
        queryFn: async () => {
            const data = getFilteredGroupMember({groupId});
            return data;
        },
        enabled: !!groupId,
        onSuccess: (membersData) => {
            queryClient.setQueryData(["members"], membersData);
        }
    });   
    
    return { members, isLoading };

}