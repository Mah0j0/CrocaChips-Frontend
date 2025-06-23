import {useQuery} from "@tanstack/react-query";
import {getMovimientos} from "../../api/inventario/getMovimientos.ts";

export function useMovimientos() {
    return useQuery({
        queryKey: ["dashMovimientos"],
        queryFn : getMovimientos,
        staleTime: 1000 * 60 * 5,
    })
}