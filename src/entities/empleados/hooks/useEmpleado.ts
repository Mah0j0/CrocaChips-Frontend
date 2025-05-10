import {useQuery} from "@tanstack/react-query";
import {Empleado} from "../model/types.ts";
import {getEmpleado} from "../api/getEmpledo.ts";

export function useEmpleado() {
    return useQuery<Empleado>({
        queryKey: ["empleado"],
        queryFn: getEmpleado,
        retry: 1,
        // retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 30000), // Estrategia de backoff exponencial (opcional)
        refetchOnWindowFocus: false,
        staleTime: 5 * 60 * 1000,
    });
}
