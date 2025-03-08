import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import Toast from "react-native-root-toast";

export function useLogin() {
    const navigation = useNavigation();
    const [error, setError] = useState("");

    const queryClient = useQueryClient();

    const { mutate: login, isLoading } = useMutation({
        mutationFn: ({ email, password }) => loginApi({ email, password }),
        onSuccess: (user) => {
            queryClient.setQueriesData(["user"], user);
            queryClient.invalidateQueries(["user"]);

            console.log(user.user);
            if (user.user.user_metadata.group) {
                navigation.reset({
                    index: 0,
                    routes: [
                        {
                            name: "InApp",
                        },
                    ],
                });
            } else if (user.user.app_metadata.role == "super-admin") {
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

    return { login, isLoading, error };
}
