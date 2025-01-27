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
    mutationFn: ({ email, password}) => loginApi({ email, password}),
    onSuccess: (user) => {
      queryClient.setQueriesData(["user"], user);
      console.log(user);
      console.log(user.user.email);
      console.log(user.user.user_metadata.email);
      if (user.user.user_metadata.group) {
        navigation.reset({
          index: 0,
          routes: [
            {
              name: "InApp",
              params: {
                screen: "Profile",
                initial: false,
              },
            },
          ],
        });
       
      }
      else if (user.user.email == "admin@gmail.com") {
        navigation.reset({
          index: 0,
          routes: [
            {
              name: "AdminProfile",
              params: {
                initial: false,
              }
            }
          ]
        });
      }
      else if (!user.user.user_metadata.group){
        navigation.navigate("Postcode");
      }
 
      else {
        navigation.reset({
          index: 0,
          routes: [
            {
              name: "InApp",
              params: {
                screen: "Profile",
                initial: false,
              },
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