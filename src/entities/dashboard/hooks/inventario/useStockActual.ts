import {useQuery} from "@tanstack/react-query";
import {getStockActual} from "../../api/inventario/getStockActual.ts";

export function useStockActual() {
    return useQuery({
        queryKey: ["stockActual"],
        queryFn : getStockActual,
        staleTime: 1000 * 60 * 5,
    })
}