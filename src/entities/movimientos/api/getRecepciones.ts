import api from "../../../shared/lib/axios.ts";
import {isAxiosError} from "axios";
import {Movimiento} from "../model/type.ts";

export async function getRecepciones(): Promise<Movimiento[]> {
    try {
        const { data } = await api.get<Movimiento[]>("/movimientos/recepciones/");
        return data;
    } catch (error) {
        console.error("Error al obtener recepciones:", error);
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error || "Error al cargar recepciones.");
        }
        throw new Error("Ocurrió un error inesperado al cargar recepciones.");
    }
}