import { useQuery } from "@tanstack/react-query";
import { getProducto } from "../api/getProducto.ts";
import { Producto } from "../model/type.ts";

export function useProduct() {
    return useQuery<Producto>({
        queryKey: ["producto"],
        queryFn: getProducto,
        retry: 1,
        //para no volver a cargar los datos si no han pasado 5 minutos
        refetchOnWindowFocus: false,
        staleTime: 5 * 60 * 1000,
    });
}