import { isAxiosError } from "axios";
import api from "../../../shared/lib/axios.ts";
import { VentaResponse, ConfirmarVenta } from "../model/type.ts";

// PUT - CONFIRMAR una venta existente, cambia su estado 
export async function confirmarVenta(venta: ConfirmarVenta): Promise<VentaResponse> {
    try {
        const { data } = await api.put<VentaResponse>("/ventas/confirmar/", venta);
        return data; // Devolverá un objeto VentaResponse
    } catch (error) {
        console.error("Error al confirmar venta:", error);
        if (isAxiosError(error) && error.response) { // Captura y formatea errores de la API
            const message = (error.response.data as { error?: string }).error;
            throw new Error(message || "Error al confirmar la venta.");
        }
        throw new Error("Error inesperado al confirmar la venta.");
    }
}