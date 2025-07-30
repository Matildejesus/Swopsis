import { useQuery } from "@tanstack/react-query";
import { getUser } from "../../services/apiAuth";

export function useUser() {
    const { data: user, isLoading, error } = useQuery({
        queryKey: ["user"],
        queryFn: getUser,
        cacheTime: 24 * 60 * 60 * 1000,
        // staleTime: Infinity,
    });

    return { 
        isLoading, 
        user, 
        error,
        isAuthenticated: user?.role === "authenticated" 
    };
}