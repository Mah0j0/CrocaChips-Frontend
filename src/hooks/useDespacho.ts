import {useQuery} from "@tanstack/react-query";
import {getDespachos} from "../api/DespachosApi.ts";
import {Movimiento} from "../types/movimientos.ts";

//DESPACHOS
export function useDespachos() {
    return useQuery<Movimiento[]>({
        queryKey: ["movimientos"],
        queryFn: getDespachos,
        staleTime: 1000 * 60 * 5, // opcional: 5 minutos de "freshness"
    });
}
