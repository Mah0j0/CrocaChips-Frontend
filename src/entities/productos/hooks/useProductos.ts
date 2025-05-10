import {useQuery} from "@tanstack/react-query";
import {Producto} from "../model/type.ts";
import {getProducts} from "../api/getProductos.ts";

export function useProducts() {
    return useQuery<Producto[]>({
        queryKey: ["productos"],
        queryFn: getProducts,
        //sirve para no volver a cargar los datos si no han pasado 5 minutos
        staleTime: 1000 * 60 * 5,
    });
}