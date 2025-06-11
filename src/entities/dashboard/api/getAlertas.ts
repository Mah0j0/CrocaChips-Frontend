import { isAxiosError } from "axios";
import api from "../../../shared/lib/axios.ts";
import { AlertasResponse } from "../model/type.ts";

export async function getAlertas(): Promise<AlertasResponse> {
    try {
        const { data } = await api.get<AlertasResponse>("/alertas/");
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            const message = (error.response.data as { error?: string }).error;
            throw new Error(message || "Error al obtener las alertas.");
        }
        throw new Error("Error inesperado al obtener las alertas.");
    }
}