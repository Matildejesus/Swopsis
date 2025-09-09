import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateStatus } from "../../services/apiGroups";

export function useUpdateGroupStatus() {
    const queryClient = useQueryClient();

    const { mutate: updateGroupStatus, isLoading } = useMutation({
        mutationFn: async ({ id, status }) => {
            const data = await updateStatus({ id, status });
            return {groupData: data[0], id, status};
        },
        onSuccess: ({groupData, id, status }) => {
            queryClient.setQueryData(["allGroups"], (old) => {
                const update = old?.map(group => 
                    group.id === id
                        ? {...group, status }
                        : group
                );
                return update;
            });

            queryClient.setQueryData(["requests"], (old) => {
                return {
                    accepted: old.accepted.map(group => 
                        group.id === id ? { ...group, status } : group
                    ),
                    pending: old.pending.map(group => 
                        group.id === id ? { ...group, status } : group
                    ),
                    rejected: old.rejected.map(group => 
                        group.id === id ? { ...group, status } : group
                    )
                };
            });
        },
        onError: (err) => {
            console.error("Error updating group status:", err.message);
            throw new Error(err.message);
        }   
    });
    return { updateGroupStatus, isLoading };
}
           