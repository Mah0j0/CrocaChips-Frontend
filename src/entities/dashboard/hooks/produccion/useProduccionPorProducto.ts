import {useQuery} from "@tanstack/react-query";
import {getProduccionPorProducto} from "../../api/produccion/getProduccionPorProducto.ts";

export function useProduccionPorProducto() {
    return useQuery({
        queryKey: ["produccionPorProducto"],
        queryFn : getProduccionPorProducto,
        staleTime: 1000 * 60 * 5,
    })
}