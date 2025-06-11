import { isAxiosError } from "axios";
import api from "../../../shared/lib/axios.ts";
import { DatosGraficos } from "../model/type.ts";

export async function getVentasSemanal(): Promise<DatosGraficos> {
    try {
        const { data } = await api.get<DatosGraficos>("/dashboard/ventas_semanales/");
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