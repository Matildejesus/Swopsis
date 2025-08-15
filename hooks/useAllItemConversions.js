import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllConversions } from "../services/apiItemConvert";

export function useAllItemConversions() {
    const queryClient = useQueryClient();
    const { data: itemConversions, isLoading } = useQuery({
        queryKey: ["allConversions"],
        queryFn: async () => {
            const conversions = await getAllConversions();
            return conversions;
        },
        onSuccess: (conversionsData) => {
            queryClient.setQueryData(["allConversions"], conversionsData);
        }
    });
    return { itemConversions, isLoading };
}