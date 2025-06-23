import {useQuery} from "@tanstack/react-query";
import {getVentasPorVendedor} from "../../api/ventas/getVentasPorVendedor.ts";

export function useVentasPorVendedor() {
    return useQuery({
        queryKey: ["ventasPorVendedor"],
        queryFn : getVentasPorVendedor,
        staleTime: 1000 * 60 * 5,
    })
}