import { useQuery } from "@tanstack/react-query";
import { getVentas, getDetallesVenta } from "../api/VentasApi";
import { Venta, DetalleVenta } from "../types/ventas";

// Hook para obtener todas las ventas
export function useVentas() {
    return useQuery<Venta[]>({  // Retorno como array de Venta
        queryKey: ["ventas"], // Clave única
        queryFn: getVentas,
        staleTime: 1000 * 60 * 5, // Los datos se consideran frescos por 5 minutos
    });
}

// Hook para obtener detalles de una venta específica
export function useDetallesVenta(id_venta: number) {
    return useQuery<DetalleVenta[]>({  // Retorno como array de DetalleVenta
        queryKey: ["detallesVenta", id_venta], // Clave compuesta que incluye el ID
        queryFn: () => getDetallesVenta(id_venta),
        staleTime: 1000 * 60 * 5,
        enabled: !!id_venta, // Solo se ejecuta si hay un id_venta válido
    });
}