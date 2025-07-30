import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserData as updateUserDataApi } from "../../services/apiAuth";

export function useUpdateUserMetadata() {
    const queryClient = useQueryClient();

    const { mutate: updateUserMetadata, isLoading: isUpdating } = useMutation({
    mutationFn: async ( updateData ) => {
            const data = await updateUserDataApi(updateData);
            console.log("Updating user metadata with data:", data);
            return data;
        },
        onSuccess: (updatedUser) => {
            console.log("Updating user metadata with data:", updatedUser.user.user_metadata);
            queryClient.setQueryData(["user"], (old) => ({
                ...old,
                user: {
                    ...old?.user,  
                    user_metadata: {
                        ...old?.user?.user_metadata,  // ← Keep old metadata
                        ...updatedUser.user.user_metadata  // ← Merge new metadata
                    }
                }
            }));
            console.log("User Metadata updated successfully:", queryClient.getQueryData(["user"]));
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