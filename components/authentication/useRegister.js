import { useMutation, useQueryClient } from "@tanstack/react-query";
import { register as registerApi } from "../../services/apiAuth";
import { Toast } from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";

export function useRegister() {
  const navigation = useNavigation();
  const [error, setError] = useState("");

  const queryClient = useQueryClient();

  const { mutate: register, isLoading } = useMutation({
    mutationFn: registerApi,
    onSuccess: (user) => {
      // Assuming the registration API returns the user data
      queryClient.setQueryData(["user"], user);

      // Show toast message
      Toast.show({
        type: "success",
        text1: "Account successfully created!",
        visibilityTime: 4000,
        autoHide: true,
      });

      // You can navigate to the login screen or any other screen after successful registration
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

  return { register, isLoading, error };
}
