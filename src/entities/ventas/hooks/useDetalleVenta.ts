import { useQuery } from "@tanstack/react-query";
import { getDetallesVenta } from "../api/getDetallesVenta.ts";
import { Detalle } from "../model/type.ts";

export function useDetallesVenta(id_venta: number) {
    return useQuery<Detalle[]>({
        queryKey: ["detallesVenta", id_venta], // Clave compuesta que incluye el ID
        queryFn: () => getDetallesVenta(id_venta),
        staleTime: 1000 * 60 * 5, // 5 minutos
        enabled: !!id_venta, // Solo se ejecuta si hay un id_venta válido
    });
}