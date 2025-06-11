import {useQuery} from "@tanstack/react-query";
import {getVentasSemanal} from "../api/getVentasSemanales.ts";

export function useVentasSemanales() {
    return useQuery({
        queryKey: ["ventasSemanales"],
        queryFn : getVentasSemanal,
        staleTime: 1000 * 60 * 5,
    })
}