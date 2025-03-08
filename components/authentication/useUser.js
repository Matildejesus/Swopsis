import { useQuery } from "@tanstack/react-query";
import { getUser } from "../../services/apiAuth";
import { useDispatch } from "react-redux";

export function useUser() {
    const dispatch = useDispatch();
    const { data: user, isLoading } = useQuery({
        queryKey: ["user"],
        queryFn: getUser,
        onSuccess: (userData) => {
            dispatch(setUserInfo(userData));
        },
    });

    return { isLoading, user, isAuthenticated: user?.role === "authenticated" };
}
