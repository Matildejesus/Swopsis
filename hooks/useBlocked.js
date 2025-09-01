import { useQuery } from "@tanstack/react-query";
import { useUser } from "./auth/useUser";
import { getAllBlocked } from "../services/apiBlocked";

export function useBlocked() {
  const { user } = useUser();

  const { data, isLoading } = useQuery({
    queryKey: ["blockedState"],
    queryFn: async () => {
      const { blockedIds, beingBlockedIds } = await getAllBlocked({
        userId: user?.user?.id,
      });
      return { blockedIds, beingBlockedIds };
    },
    enabled: !!user?.user?.id,
  });

  const blocked = data?.blockedIds || [];
  const beingBlocked = data?.beingBlockedIds || [];

  return { blocked, beingBlocked, isLoading };
}
