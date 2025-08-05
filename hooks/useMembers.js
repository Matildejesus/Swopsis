import { useQuery, useQueryClient } from "@tanstack/react-query";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import { getFilteredGroupMember } from "../services/apiAdmin";

export function useMembers(groupId) {
    const queryClient = useQueryClient();
    console.log("Setting up useMembers hook for group:", groupId);
    const {data: members, isLoading} = useQuery({
        queryKey: ["members"],
        queryFn: async () => {
            console.log("Fetching members for group:", groupId);
            const data = getFilteredGroupMember({groupId});
            return data;
        },
        enabled: !!groupId,
        onSuccess: (membersData) => {
            queryClient.setQueryData(["members"], membersData);
        }
    });   
        console.log("Members data:", members);
    console.log("Is loading:", isLoading);
    return { members, isLoading };

}