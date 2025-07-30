import { useMutation } from "@tanstack/react-query";
import { deleteItems as deleteItemApi } from "../../services/apiItems";
import Toast from "react-native-toast-message";

export function useDeleteItem() {

    const { mutate: deleteItem, isLoading: isDeleting } = useMutation({
        mutationFn: deleteItemApi,
        onSuccess: () => {
            Toast.show({
                type: 'success',
                text1: 'Complete!',
                text2: 'Item Deleted succesfully"'
            });
        },
        onError: (err) => {
            Toast.show(err.message);
        },
    });

    return { deleteItem, isDeleting };
}
