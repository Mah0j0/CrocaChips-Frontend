import {useQuery} from "@tanstack/react-query";
import {getVentasMensuales} from "../../api/ventas/getVentasMensuales.ts";

export function useVentasMensuales() {
    return useQuery({
        queryKey: ["dashVentasMensuales"],
        queryFn : getVentasMensuales,
        staleTime: 1000 * 60 * 5,
    })
}