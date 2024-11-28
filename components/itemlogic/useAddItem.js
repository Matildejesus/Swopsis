import { useNavigation } from "@react-navigation/native";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { addItem as addItemApi} from "../../services/apiItems";
import Toast from "react-native-root-toast";

export function useAddItem() {
    const navigation = useNavigation();
    const [error, setError] = useState("");
    
    const queryClient = useQueryClient();

    const { mutate: addItem, isLoading } = useMutation({
        mutationFn: addItemApi,
        onSuccess: (item) => {
            console.log("Mutation succeeded with item:", item);
            queryClient.setQueryData(["item"], item);
        },
        onError: (err) => {
            console.log("ERROR", err);
            Toast.show(err);
        }
    });

    return { addItem, isLoading, error };
}