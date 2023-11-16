import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import Toast from "react-native-toast-message";

export function useLogin() {
  const navigation = useNavigation();
  const [error, setError] = useState("");

  const queryClient = useQueryClient();

  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (user) => {
      queryClient.setQueriesData(["user"], user);
      navigation.reset({
        index: 0,
        routes: [
          {
            name: "InApp",
            params: {
              screen: "Profile",
              initial: false,
              // params: {
              //   name: email,
              // },
            },
          },
        ],
      });
    },
    onError: (err) => {
      console.log("ERROR", err);
      Toast.show({
        type: "error",
        text1: err.message,
        visibilityTime: 4000,
        autoHide: true,
      });
    },
  });

  return { login, isLoading, error };
}
