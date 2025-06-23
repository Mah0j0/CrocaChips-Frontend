import {useQuery} from "@tanstack/react-query";
import {getProyeccionProductos} from "../../api/proyeccion/getProyeccionProductos.ts";

export function useProeyeccionProductos() {
    return useQuery({
        queryKey: ["proyeccionProductos"],
        queryFn : getProyeccionProductos,
        staleTime: 1000 * 60 * 5,
    })
}