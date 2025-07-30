import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addItem as addItemApi } from "../../services/apiItems";
import Toast from "react-native-toast-message";

export function useAddItem() {

    const { mutate: addItem, isLoading } = useMutation({
        mutationFn: addItemApi,
        onSuccess: () => {
             Toast.show({
                type: 'success',
                text1: 'Complete!',
                text2: 'Item Created succesfully"'
            });
        },
        onError: (err) => {
            Toast.show(err);
        },
    });

    return { addItem, isLoading };
}
