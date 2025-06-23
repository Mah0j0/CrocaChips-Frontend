import {useQuery} from "@tanstack/react-query";
import {getNuevosClientes} from "../../api/clientes/getNuevosClientes.ts";

export function useNuevosClientes() {
    return useQuery({
        queryKey: ["nuevosClientes"],
        queryFn : getNuevosClientes,
        staleTime: 1000 * 60 * 5,
    })
}