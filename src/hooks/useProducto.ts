import { useQuery } from "@tanstack/react-query";
import { getProducto, getProducts } from "../api/ProductosApi.ts";
import { Producto } from "../types/productos.ts";

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

export function useProducts() {
    return useQuery<Producto[]>({
        queryKey: ["productos"],
        queryFn: getProducts,
        //sirve para no volver a cargar los datos si no han pasado 5 minutos
        staleTime: 1000 * 60 * 5,
    });
}