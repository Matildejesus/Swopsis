// useRequestsSubscription.js
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import supabase from "../services/supabase";

// ⚠️ EXACT table/column names. Change only these two constants if needed.
const TABLE = "JoinRequests";     // your mixed-case table name
const GROUP_COL = "group";        // e.g. "group" or "groupId"

export function useRequestsSubscription(groupId) {
  const qc = useQueryClient();

  useEffect(() => {
    const topic = `reqs-${groupId ?? "all"}`;
    const KEY_MAIN = ["requests", groupId ?? "all"];

    console.log("[REQSUB] start", { topic, groupId, KEY_MAIN });

    // --- Subscribe (first try: NO FILTER to prove it works) ---
    const channel = supabase
      .channel(topic)
      .on(
        "postgres_changes",
        {
          event: "*",               // INSERT / UPDATE / DELETE
          schema: "public",
          table: TABLE,             // must match exactly
          // 👉 Once you see events, uncomment next line to re-add filter:
          // ...(groupId ? { filter: `${GROUP_COL}=eq.${groupId}` } : {}),
        },
        (payload) => {
          console.log(
            "[REQSUB] change",
            payload.eventType,
            "id=", payload.new?.id ?? payload.old?.id,
            "status=", payload.new?.status ?? payload.old?.status
          );

          // 🔁 Trigger refetch for both keys your app uses
          qc.invalidateQueries({ queryKey: KEY_MAIN });
          qc.invalidateQueries({ queryKey: ["requests"] });
        }
      )
      .subscribe((status) => {
        console.log("[REQSUB] status:", status, "topic:", topic);
      });

    console.log("[REQSUB] active:", supabase.getChannels().map(c => c.topic));

    return () => {
      console.log("[REQSUB] stop", topic);
      supabase.removeChannel(channel);
    };
  }, [groupId, qc]);
}
