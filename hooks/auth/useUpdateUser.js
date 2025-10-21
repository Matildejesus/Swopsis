import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser as updateUserApi } from "../../services/apiAuth";
import Toast from "react-native-toast-message";

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
            Toast.show({
                type: 'success',
                text1: "Update successful"
            })
        },
        onError: (err) => Toast.show({
                                type: 'error',
                                text1: "Something went wrong",
                                text2: "Update was not successful"
        }),
    });

    return { updateUser, isUpdating };
}
