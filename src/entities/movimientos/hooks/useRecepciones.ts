import {useQuery} from "@tanstack/react-query";
import {Movimiento} from "../model/type.ts";
import {getRecepciones} from "../api/getRecepciones.ts";

export function useRecepciones() {
    return useQuery<Movimiento[]>({
        queryKey: ["recepciones"],
        queryFn: getRecepciones,
        staleTime: 1000 * 60 * 5,
    });
}