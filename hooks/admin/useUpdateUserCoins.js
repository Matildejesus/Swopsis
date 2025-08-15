import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserCoin } from "../../services/apiAdmin";
import Toast from "react-native-toast-message";

export function useUpdateUserCoins() {
    const queryClient = useQueryClient();

    const { mutate: updateUserCoins, isLoading, isSuccess } = useMutation({
        mutationFn: async ({ id, coins }) => {
            const data = await updateUserCoin({ id, coins });
            return {userData: data[0], id, coins};
        },
        onSuccess: ({userData, id, coins}) => {
            queryClient.setQueryData(["allMembers"], (old) => {
                return old?.map(user => 
                    user.id === id
                        ? { 
                            ...user, 
                            user_metadata: {
                                ...user.user_metadata,
                                coins: coins
                            }
                        }
                        : user
                );
            });
            Toast.show({
                type: 'success',
                text1: 'Congrats',
                text2: 'User Data Updated Succesfully'
            });
        },
        onError: (err) => {
            throw new Error(err.message);
        }
    });
    return { updateUserCoins, isLoading, isSuccess};
}