import {useQuery} from "@tanstack/react-query";
import {getProyeccionGeneral} from "../../api/proyeccion/getProyeccionGeneral.ts";

export function useProyeccionGeneral() {
    return useQuery({
        queryKey: ["proyeccionGeneral"],
        queryFn : getProyeccionGeneral,
        staleTime: 1000 * 60 * 5,
    })
}