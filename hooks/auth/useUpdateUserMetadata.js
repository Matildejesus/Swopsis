import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserData as updateUserDataApi } from "../../services/apiAuth";

export function useUpdateUserMetadata() {
    const queryClient = useQueryClient();

    const { mutate: updateUserMetadata, isLoading: isUpdating } = useMutation({
        mutationFn: async ( updateData ) => {
            const data = await updateUserDataApi(updateData);
            return data;
        },
        onSuccess: (updatedUser) => {
            queryClient.setQueryData(["user"], (old) => ({
                ...old,
                user: {
                    ...old?.user,  
                    user_metadata: {
                        ...old?.user?.user_metadata, 
                        ...updatedUser.user.user_metadata 
                    }
                }
            }));
        },
        onError: (err) => {
            Toast.show({
                type: 'error',
                text1: 'Update Failed',
                text2: err.message
            });
        },
    });

    return { updateUserMetadata, isUpdating };
}