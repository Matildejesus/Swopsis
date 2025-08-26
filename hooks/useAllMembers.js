import { useQuery, useQueryClient } from "@tanstack/react-query";

import { useUser } from "./auth/useUser";
import { getAllUsers, getGroupMembers } from "../services/apiAdmin";

export function useAllMembers() {
    const { user } = useUser();
    const queryClient = useQueryClient();
    // console.log("user: ", user.user.user_metadata);
    const groupId = user?.user?.user_metadata?.group;

    const {data: members, isLoading, isFetching } = useQuery({
        queryKey: ["allMembers"],
        queryFn: async () => {
            if (user.user.user_metadata.ambassador && groupId){
                console.log("thsi is an ambassador");
                return await getGroupMembers({ groupId });
            } else {
                const data = await getAllUsers();
                return data;
            }
        },
        enabled: !!user,
        onSuccess: (membersData) => {
            console.log(" ", membersData);
            queryClient.setQueryData(["allMembers"], membersData);
        },
    });
    // console.log("members: ", members);
    return { members, isLoading, isFetching };        
}