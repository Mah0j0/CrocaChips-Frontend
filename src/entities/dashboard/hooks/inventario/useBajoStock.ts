import {useQuery} from "@tanstack/react-query";
import {getBajoStock} from "../../api/inventario/getBajoStock.ts";

export function useBajoStock() {
    return useQuery({
        queryKey: ["bajoStock"],
        queryFn : getBajoStock,
        staleTime: 1000 * 60 * 5,
    })
}