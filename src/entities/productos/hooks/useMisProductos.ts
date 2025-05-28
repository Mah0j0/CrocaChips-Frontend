import {useQuery} from "@tanstack/react-query";
import { ProductoStock} from "../model/type.ts";
import {getMisProductos} from "../api/getMisProductos.ts";

export function useMisProductos() {
    return useQuery<ProductoStock[]>({
        queryKey: ["MisProductos"],
        queryFn: getMisProductos,
        //sirve para no volver a cargar los datos si no han pasado 5 minutos
        staleTime: 1000 * 60 * 5,
    });
}