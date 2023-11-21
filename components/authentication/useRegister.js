import { useMutation } from "@tanstack/react-query";
import { register as registerApi } from "../../services/apiAuth";
import { Toast } from "react-native-toast-message";

export function useRegister() {
  const { mutate: register, isLoading } = useMutation({
    mutationFn: registerApi,
    onSuccess: (user) => {
      console.log(user);
      Toast.show({
        type: "success",
        text1: "Account successfully created!",
        visibilityTime: 4000,
        autoHide: true,
      });
    },
  });
  return { register, isLoading };
}
