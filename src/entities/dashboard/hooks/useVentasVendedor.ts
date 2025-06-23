import {useQuery} from "@tanstack/react-query";
import {getVentasVendedor} from "../api/getVentasVendedor.ts";

export function useVentasVendedor() {
    return useQuery({
        queryKey: ["ventasVendedor"],
        queryFn : getVentasVendedor,
        staleTime: 1000 * 60 * 5,
    })
}