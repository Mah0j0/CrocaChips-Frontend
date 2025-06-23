import {useQuery} from "@tanstack/react-query";
import {getClientesFrecuentes} from "../../api/clientes/getClientesFrecuentes.ts";

export function useClientesFrecuentas() {
    return useQuery({
        queryKey: ["clientesFrecuentes"],
        queryFn : getClientesFrecuentes,
        staleTime: 1000 * 60 * 5,
    })
}