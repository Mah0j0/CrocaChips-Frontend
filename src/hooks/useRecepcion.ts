import {useQuery} from "@tanstack/react-query";
import { getRecepciones } from "../api/RecepcionesApi";
import {Movimiento} from "../types/movimientos.ts";

//DESPACHOS
export function useRecepciones() {
    return useQuery<Movimiento[]>({
        queryKey: ["recepciones"],
        queryFn: getRecepciones,
        staleTime: 1000 * 60 * 5,
    });
}
