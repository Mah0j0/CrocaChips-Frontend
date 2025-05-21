import {NuevaVenta} from "../../../../entities/ventas";
import api from "../../../../shared/lib/axios.ts";
import {isAxiosError} from "axios";

export async function createVenta(venta: NuevaVenta): Promise<NuevaVenta> {
    try {
        const { data } = await api.post<NuevaVenta>("/ventas/registrar/", venta);
        return data; // Devolverá un objeto Venta
    } catch (error) {
        console.error("Error al registrar venta:", error);
        if (isAxiosError(error) && error.response) { // Captura y formatea errores de la API
            console.error('Error detallado:', error.response.data);
            const message = (error.response.data as { error?: string }).error;
            throw new Error(message || "Error al registrar la venta.");
        }
        throw new Error("Error inesperado al registrar la venta.");
    }
}