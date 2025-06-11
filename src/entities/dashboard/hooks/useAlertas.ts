import { useQuery } from "@tanstack/react-query";
import { getAlertas } from "../api/getAlertas";
import { AlertasResponse } from "../model/type";

export function useAlertas() {
  return useQuery<AlertasResponse, Error>({
    queryKey: ["alertas"],
    queryFn: getAlertas,
  });
}