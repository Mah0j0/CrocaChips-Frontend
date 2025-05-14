import {useQuery} from "@tanstack/react-query";
import {getLotesEnProduccion} from "../api/getLotesProduccion.ts";
import {LoteProduccion} from "../../movimientos/model/type.ts";

export function useLotes(){
    return useQuery<LoteProduccion[]>({
        queryKey: ["lotes"],
        queryFn: getLotesEnProduccion,
        staleTime: 1000 * 60 * 5,
    });
}