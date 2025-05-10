import {useQuery} from "@tanstack/react-query";
import {Movimiento} from "../model/type.ts";
import {getDespachos} from "../api/getDespachos.ts";

export function useDespachos() {
    return useQuery<Movimiento[]>({
        queryKey: ["despachos"],
        queryFn: getDespachos,

        staleTime: 1000 * 60 * 5,
    });
}