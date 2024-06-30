import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import Toast from 'react-native-root-toast';

export function useLogin() {
  const navigation = useNavigation();
  const [error, setError] = useState("");

  const queryClient = useQueryClient();

  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (user) => {
      queryClient.setQueriesData(["user"], user);
   //   navigation.reset({
     //   index: 0,
   //     routes: [
     //     {
       //     name: "InApp",
         //   params: {
           //   screen: "Profile",
             // initial: false,
      //      },
        //  },
      //  ],
     // });
     navigation.navigate("Profile");
    },
    onError: (err) => {
      console.log("ERROR", err);
      Toast.show(err.message);
    },
  });

  return { login, isLoading, error };
}