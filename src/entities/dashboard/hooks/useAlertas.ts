import { useQuery } from "@tanstack/react-query";
import { getAlertas } from "../api/getAlertas";
import { AlertasResponse } from "../model/type";

export function useAlertas() {
  return useQuery<AlertasResponse, Error>({
    queryKey: ["alertas"],
    queryFn: getAlertas,
    refetchInterval: 15000,
    refetchIntervalInBackground: true,
    staleTime: 0,
    gcTime: 5 * 60 * 1000,
  });
}