import { isAxiosError } from "axios";
import {VentasMensuales} from "../../model/type.ts";
import api from "../../../../shared/lib/axios.ts";

export async function getVentasMensuales(): Promise<VentasMensuales[]> {
    try {
        const { data } = await api.get<VentasMensuales[]>("/dashboard/ventas/mensual/");
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