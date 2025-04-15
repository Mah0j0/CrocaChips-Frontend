import { useQuery } from "@tanstack/react-query";
import { getUsers, getUser } from "../api/EmpleadoApi.ts";
import { Empleado } from "../types/empleados";

export function useEmpleado() {
    return useQuery<Empleado>({
        queryKey: ["empleado"],
        queryFn: getUser,
        retry: 1,
        // retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 30000), // Estrategia de backoff exponencial (opcional)
        refetchOnWindowFocus: false,
        staleTime: 5 * 60 * 1000,
    });
}

export function useEmpleados() {
    return useQuery<Empleado[]>({
        queryKey: ["empleados"],
        queryFn: getUsers,
        staleTime: 1000 * 60 * 5, // opcional: 5 minutos de "freshness"
    });
}