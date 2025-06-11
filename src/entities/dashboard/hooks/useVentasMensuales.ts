import {useQuery} from "@tanstack/react-query";
import {getVentasMensuales} from "../api/getVentasMensuales.ts";

export function useVentasMensuales() {
    return useQuery({
        queryKey: ["ventasMensuales"],
        queryFn : getVentasMensuales,
        staleTime: 1000 * 60 * 5,
    })
}