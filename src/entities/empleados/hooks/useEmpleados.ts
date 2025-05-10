import {useQuery} from "@tanstack/react-query";
import {Empleado} from "../model/types.ts";
import {getEmpleados} from "../api/getEmpledos.ts";

export function useEmpleados() {
    return useQuery<Empleado[]>({
        queryKey: ["empleados"],
        queryFn: getEmpleados,
        staleTime: 1000 * 60 * 5, // opcional: 5 minutos de "freshness"
    });
}
