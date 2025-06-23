import {useQuery} from "@tanstack/react-query";
import {getTicketPromedio} from "../../api/ventas/getTicketPromedio.ts";

export function useTicketPromedio() {
    return useQuery({
        queryKey: ["ticketPromedio"],
        queryFn : getTicketPromedio,
        staleTime: 1000 * 60 * 5,
    })
}