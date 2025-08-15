import { useQuery, useQueryClient } from "@tanstack/react-query";

import { useUser } from "./auth/useUser";
import { getAllUsers } from "../services/apiAdmin";

export function useAllMembers() {
    const { user } = useUser();
    const queryClient = useQueryClient();

    const {data: members, isLoading, isFetching } = useQuery({
        queryKey: ["allMembers",],
        queryFn: async () => {
        
            const data = await getAllUsers();
            return data;
        },
        onSuccess: (membersData) => {
            console.log("Members Data: ", membersData);
            queryClient.setQueryData(["allMembers"], membersData);
        },
    });
    // console.log("members: ", members);
    return { members, isLoading, isFetching };        
}