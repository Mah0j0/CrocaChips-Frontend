import {useQuery} from "@tanstack/react-query";
import {getTopProductos} from "../../api/ventas/getTopProductos.ts";

export function useTopProductos() {
    return useQuery({
        queryKey: ["topProductos"],
        queryFn : getTopProductos,
        staleTime: 1000 * 60 * 5,
    })
}