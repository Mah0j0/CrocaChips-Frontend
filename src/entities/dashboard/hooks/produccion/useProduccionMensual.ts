import {useQuery} from "@tanstack/react-query";
import {getProduccionMensual} from "../../api/produccion/getProduccionMensual.ts";

export function useProduccionMensual() {
    return useQuery({
        queryKey: ["produccionMensual"],
        queryFn : getProduccionMensual,
        staleTime: 1000 * 60 * 5,
    })
}