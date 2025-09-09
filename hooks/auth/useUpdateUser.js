import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser as updateUserApi } from "../../services/apiAuth";

export function useUpdateUser() {
    const queryClient = useQueryClient();

    const { mutate: updateUser, isLoading: isUpdating } = useMutation({
        mutationFn: async ({ updateData, userId }) => {
            const updatedUser = await updateUserApi(updateData, userId);
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

    return { updateUser, isUpdating };
}
