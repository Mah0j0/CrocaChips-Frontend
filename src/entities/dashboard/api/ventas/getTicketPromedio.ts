import { isAxiosError } from "axios";
import {TicketPromedio} from "../../model/type.ts";
import api from "../../../../shared/lib/axios.ts";

export async function getTicketPromedio(): Promise<TicketPromedio> {
    try {
        const { data } = await api.get<TicketPromedio>("/dashboard/ventas/ticket-promedio/");
        console.log("SEMANAL ",data);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            const message = (error.response.data as { error?: string }).error;
            throw new Error(message || "Error al obtener las ventas mensuales.");
        }
        throw new Error("Error inesperado al obtener las ventas mensuales.");
    }
}