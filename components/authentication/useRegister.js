import { useMutation, useQueryClient } from "@tanstack/react-query";
import { register as registerApi } from "../../services/apiAuth";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import Toast from 'react-native-root-toast';

export function useRegister() {
  const navigation = useNavigation();
  const [error, setError] = useState("");

  const queryClient = useQueryClient();

  const { mutate: register, isLoading } = useMutation({
    mutationFn: registerApi,
    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user);
      Toast.show("Account Created uccesfully");
      navigation.navigate("Login");
    },
    onError: (err) => {
      console.log("ERROR", err);
      Toast.show('error');
    },
  });

  return { register, isLoading, error };
}
