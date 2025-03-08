import { useMutation, useQueryClient } from "@tanstack/react-query";
//import { toast } from "react-native-toast-message";
import { updateUser as updateUserApi } from "../../services/apiAuth";
import { useDispatch } from "react-redux";

export function useUpdateUser() {
    const queryClient = useQueryClient();
    const dispatch = useDispatch();

    const { mutate: updateUser, isLoading: isUpdating } = useMutation({
        mutationFn: updateUserApi,
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
