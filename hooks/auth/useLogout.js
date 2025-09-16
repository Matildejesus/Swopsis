import { useNavigation } from "@react-navigation/native";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout as logoutApi } from "../../services/apiAuth";

export function useLogout() {
    const queryClient = useQueryClient();
    const navigation = useNavigation();

    const { mutate: logout, isLoading } = useMutation({
        mutationFn: logoutApi,
        onSuccess: () => {
            // queryClient.setQueryData(["user"], null);
            queryClient.removeQueries();
            navigation.reset({
                index: 0,
                routes: [{ name: "Welcome" }],
            });
        },
        onError: (error) => {
            console.error("Logout error:", error);
        },
    });
    return { logout, isLoading };
}
