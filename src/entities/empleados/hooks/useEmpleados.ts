import {useQuery} from "@tanstack/react-query";
import {Empleado} from "../model/types.ts";
import {getUsers} from "../api/EmpleadoApi.ts";

export function useEmpleados() {
    return useQuery<Empleado[]>({
        queryKey: ["empleados"],
        queryFn: getUsers,
        staleTime: 1000 * 60 * 5, // opcional: 5 minutos de "freshness"
    });
}
