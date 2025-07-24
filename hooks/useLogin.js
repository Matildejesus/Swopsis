import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../services/apiAuth";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import Toast from "react-native-root-toast";
import { getGroupItems } from "../services/apiItems";
import { setItem } from "../store/item";

export function useLogin() {
    const navigation = useNavigation();
    const queryClient = useQueryClient();

    const { mutate: login, isLoading } = useMutation({
        mutationFn: async ({ email, password }) => {
            const user = await loginApi({ email, password });


            // if (user?.user?.user_metadata?.group) {
            //     await queryClient.prefetchQuery({
            //         queryKey: ['groupWardrobe', user.user.user_metadata.group],
            //         queryFn: () => getGroupItems({ groupId: user.user.user_metadata.group }),
            //         onSuccess: (wardrobeData) => {
            //             dispatch(setItem(userData));
            //         },
            //     });
            // }
            return user;
        },
        onSuccess: (user) => {
            queryClient.setQueriesData(["user"], user);
            queryClient.invalidateQueries(["user"]);

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

    return { login, isLoading };
}
