import {useQuery} from "@tanstack/react-query";
import {getDespachos} from "../api/DespachosApi.ts";
import {Movimiento} from "../types/movimientos.ts";

//DESPACHOS
export function useDespachos() {
    return useQuery<Movimiento[]>({
        queryKey: ["despachos"],
        queryFn: getDespachos,
        staleTime: 1000 * 60 * 5,
    });
}
