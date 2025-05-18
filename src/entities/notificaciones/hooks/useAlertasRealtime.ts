import { useQuery } from "@tanstack/react-query";
import { getAlertasRealtime, Alerta } from "../api/getAlertasRealtime";

export function useAlertasRealtime(pollingInterval = 10000) { // 10 segundos por defecto
  return useQuery<Alerta[]>({
    queryKey: ["alertas-realtime"],
    queryFn: getAlertasRealtime,
    refetchInterval: pollingInterval,
  });
}