import {useQuery} from "@tanstack/react-query";
import {getClientes} from "../api/ClienteAapi.ts";
import {Cliente} from "../types/clientes.ts";

export function useClientes() {
    return useQuery<Cliente[]>({
        queryKey: ["clientes"],
        queryFn: getClientes,
        staleTime: 1000 * 60 * 5, // opcional: 5 minutos de "freshness"
    });
}