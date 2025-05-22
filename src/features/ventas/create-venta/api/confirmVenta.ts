import {ConfirmarVenta} from "../../../../entities/ventas";
import api from "../../../../shared/lib/axios.ts";
import {isAxiosError} from "axios";

export async function confirmVenta(venta: ConfirmarVenta): Promise<ConfirmarVenta>{
    try {
        const { data } = await api.put<ConfirmarVenta>("/ventas/confirmar/", venta);
        return data; // Devolverá un objeto Venta
    } catch (error) {
        console.error("Error al confirmar venta:", error);
        if (isAxiosError(error) && error.response) { // Captura y formatea errores de la API
            console.error('Error detallado:', error.response.data);
            const message = (error.response.data as { error?: string }).error;
            throw new Error(message || "Error al confirmar la venta.");
        }
        throw new Error("Error inesperado al confirmar la venta.");
    }
}