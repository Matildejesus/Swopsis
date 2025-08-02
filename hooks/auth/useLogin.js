import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-root-toast";

export function useLogin() {
    const navigation = useNavigation();
    const queryClient = useQueryClient();

    const { mutate: login, isLoading } = useMutation({
        mutationFn: async ({ email, password }) => {
            const user = await loginApi({ email, password });

            return user;
        },
        onSuccess: (user) => {
            queryClient.setQueryData(["user"], user);
            
            
            console.log("User logged in:", user.user);

            if (user.user.user_metadata.group) {
                navigation.reset({
                    index: 0,
                    routes: [
                        {
                            name: "InApp",
                        },
                    ],
                });
            } else if (user.user.app_metadata.role === "super-admin") {
                navigation.reset({
                    index: 0,
                    routes: [
                        {
                            name: "AdminApp",
                        },
                    ],
                });
            } else if (!user.user.user_metadata.group) {
                navigation.navigate("Postcode");
            } else {
                navigation.reset({
                    index: 0,
                    routes: [
                        {
                            name: "InApp",
                        },
                    ],
                });
            }
        },
        onError: (err) => {
            Toast.show(err.message);
        },
    });

    return { login, isLoading };
}
