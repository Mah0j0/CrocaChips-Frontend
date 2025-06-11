import {useQuery} from "@tanstack/react-query";
import {getInfoCards} from "../api/getInfoCards.ts";
import {infoCards} from "../model/type.ts";

export function useInfoCard() {
    return useQuery<infoCards>({
        queryKey: ["infoCards"],
        queryFn: getInfoCards,
        staleTime: 1000 * 60 * 5, // opcional: 5 minutos de "freshness"
    });
}