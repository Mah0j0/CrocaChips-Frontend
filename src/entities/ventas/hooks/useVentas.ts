import { useQuery } from "@tanstack/react-query";
import { Venta } from "../model/type.ts";
import {getVentas} from "../api/getVentas.ts";

// Hook para obtener todas las ventas
export function useVentas() {
    return useQuery<Venta[]>({  // Retorno como array de Venta
        queryKey: ["ventas"], // Clave única
        queryFn: getVentas,
        staleTime: 1000 * 60 * 5, // Los datos se consideran frescos por 5 minutos
    });
}

// Hook para obtener detalles de una venta específica
