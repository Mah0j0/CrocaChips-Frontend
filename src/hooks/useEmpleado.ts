import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../api/EmpleadoApi.ts";
import { EmpleadoInfo } from "../types/empleados";

export function useEmpleados() {
    return useQuery<EmpleadoInfo[]>({
        queryKey: ["empleados"],
        queryFn: getUsers,
        staleTime: 1000 * 60 * 5, // opcional: 5 minutos de "freshness"
    });
}
