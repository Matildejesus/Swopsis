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

            const role = user?.user?.app_metadata?.role ?? null;
            const group = user?.user?.user_metadata?.group ?? null;
            console.log("session login success. role =", role, "group =", group);

            if (role === "super-admin") {
                navigation.reset({
                    index: 0,
                    routes: [
                        {
                            name: "AdminApp",
                        },
                    ],
                });
                return;
            };

            if (group) {
                navigation.reset({
                    index: 0,
                    routes: [
                        {
                            name: "InApp",
                        },
                    ],
                });
                return;
            } 
            if (!user.user.user_metadata.group) {
                console.log("no group");
                navigation.reset({ index: 0, routes: [{ name: "Postcode" }] });
                return;
            }
        },
        onError: (err) => {
            Toast.show(err.message);
        },
    });

    return { login, isLoading };
}
