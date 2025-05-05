import { useQuery } from "@tanstack/react-query";
import { getDespachos, getProductosVendedor } from "../api/DespachosApi.ts";
import { Movimiento } from "../types/movimientos.ts";

//DESPACHOS
export function useDespachos() {
    return useQuery<Movimiento[]>({
        queryKey: ["despachos"],
        queryFn: getDespachos,

        staleTime: 1000 * 60 * 5,
    });
}
export function useProductosVendedor() {
    return useQuery<Movimiento[]>({
        queryKey: ["productosVendedor"],
        queryFn: getProductosVendedor,
        staleTime: 1000 * 60 * 5, // Los datos se consideran frescos por 5 minutos
    });
}