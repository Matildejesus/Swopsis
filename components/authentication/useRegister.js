import { useMutation, useQueryClient } from "@tanstack/react-query";
import { register as registerApi } from "../../services/apiAuth";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import Toast from "react-native-toast-message";

export function useRegister() {
    const navigation = useNavigation();
    const [error, setError] = useState("");


    const { mutate: register, isLoading } = useMutation({
        mutationFn: registerApi,
        onSuccess: () => {
            Toast.show({
                type: 'success',
                text1: 'Hello 👋',
                text2: 'Account Created succesfully"'
                });
            navigation.navigate("Login");
        },
        onError: (err) => {
            Toast.show({
                type: 'error',
                text1: 'Something has gone wrong ❌',
                text2: err
            });
        },
    });

    return { register, isLoading, error };
}
