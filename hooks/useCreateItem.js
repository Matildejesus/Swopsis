import { useMutation, useQueryClient } from "@tanstack/react-query";
//import { toast } from "react-native-toast-message";
import { updateUser as updateUserApi } from "../services/apiAuth";
import { addItem as addItemApi } from "../services/apiItems";
import { useDispatch } from "react-redux";
import { useUser } from "./useUser";

export function useCreateItem() {
    const queryClient = useQueryClient();
    const dispatch = useDispatch();
    const { user } = useUser();

    const { mutate: createItem, isLoading: isCreating } = useMutation({
        mutationFn: (createItem) => (createItem, user?.id),
        onSuccess: ({ item }) => {
            dispatch(setItem(item));
            //   toast.success("User account successfully updated");
            queryClient.setQueryData(["item"], item);
        },
        onError: (err) => toast.error(err.message),
    });

    return { createItem, isUpdating };
}
