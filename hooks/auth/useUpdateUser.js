import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser as updateUserApi } from "../../services/apiAuth";

export function useUpdateUser() {
    const queryClient = useQueryClient();

    const { mutate: updateUser, isLoading: isUpdating } = useMutation({
        mutationFn: async ({ updateData, userId }) => {
            const updatedUser = await updateUserApi(updateData, userId);
            console.log("Updating user with data:", updatedUser, "for userId:", userId);
            return updatedUser;
        },
        onSuccess: (updatedUser) => {
            console.log("Updating cache with:", updatedUser);
            // queryClient.setQueryData(["user"], updateUser);
            queryClient.setQueryData(["user"], (oldData) => {
                return {
                    ...oldData,
                    user: updatedUser
                };
            });
            console.log("User updated successfully:", queryClient.getQueryData(["user"]));
        },
        onError: (err) => toast.error(err.message),
    });

    return { updateUser, isUpdating };
}
