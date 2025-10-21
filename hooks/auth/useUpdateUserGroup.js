import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateGroup as updateGroupApi } from "../../services/apiAuth";

export function useUpdateUserGroup() {
    const queryClient = useQueryClient();

    const { mutate: updateGroup, isLoading: isUpdating } = useMutation({
        mutationFn: async ({ group, userId }) => {
            const updatedUser = await updateGroupApi(group, userId);
            return updatedUser;
        },
        onSuccess: (updatedUser) => {
            queryClient.setQueryData(["user"], (oldData) => {
                return {
                    ...oldData,
                    user: updatedUser
                };
            });
        },
        onError: (err) => toast.error(err.message),
    });

    return { updateGroup, isUpdating };
}
