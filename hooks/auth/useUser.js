import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getUser } from "../../services/apiAuth";
import { useEffect } from "react";
import supabase from "../../services/supabase";

export function useUser() {
    const queryClient = useQueryClient();
    const { data: user, isLoading, error } = useQuery({
        queryKey: ["user"],
        queryFn: getUser,
        cacheTime: 24 * 60 * 60 * 1000,
        // staleTime: Infinity,
    });

    useEffect(() => {
        supabase.auth.getSession().then(({ data }) => {
          if (data.session) {
            queryClient.setQueryData(["user"], { user: data.session.user });
          }
        });
    
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
          queryClient.setQueryData(["user"], session ? { user: session.user } : null);
        });
        return () => subscription.unsubscribe();
    }, [queryClient]);

    useEffect(() => {
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
            queryClient.setQueryData(["user"], session ? { user: session.user } : null);
        });
        return () => subscription.unsubscribe();
    }, [queryClient]);

    return { 
        isLoading, 
        user, 
        error,
        isAuthenticated: !!user?.user?.id,
    };
}


