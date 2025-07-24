import { useMutation, useQueryClient } from "@tanstack/react-query";
//import { toast } from "react-native-toast-message";
import { updateUser as updateUserApi } from "../services/apiAuth";
import { useDispatch } from "react-redux";
import { useUser } from "./useUser";

export function useUpdateUser() {
    const queryClient = useQueryClient();
    const dispatch = useDispatch();
    const { user } = useUser();

    const { mutate: updateUser, isLoading: isUpdating } = useMutation({
        mutationFn: (updateData) => updateUserApi(updateData, user?.id),
        onSuccess: ({ user }) => {
            dispatch(updateUserName(user.userName));
            dispatch(updatePicture(user.avatar));
            //   toast.success("User account successfully updated");
            queryClient.setQueryData(["user"], user);
        },
        onError: (err) => toast.error(err.message),
    });

    return { updateUser, isUpdating };
}
