import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "../services/apiAdmin";
import { useUser } from "./auth/useUser";

export function useAllMembers(groupId) {
    const { user } = useUser();
    // if (user?.user?.is_super_admin) {
    //     // all Member
    //     // the function will be getAllUsers()
    // } else if (user?.user?.user_metadata?.ambassador
    //     // sees all member info that is in the group
    //     // the function will be getGroupMembers({ groupId })
    // )

    const {data: members, isLoading, isFetching } = useQuery({
        queryKey: ["allMembers",],
        queryFn: async () => {
            // console.log("Fetching all members for group:", groupId);
            const data = await getAllUsers();
            return data;
        },
        onSuccess: (membersData) => {
            // console.log("Members Data: ", membersData);
            queryClient.setQueryData(["allMembers"], membersData);
        }
    });
    return { members, isLoading, isFetching };        
}