import { isAxiosError } from "axios";
import api from "../../../shared/lib/axios.ts";
import { Venta, DetalleVenta, VentaResponse, ConfirmarVenta } from "../model/type.ts";

// GET - OBTENER todas las ventas disponibles
export async function getVentas(): Promise<Venta[]> {
    try {
        const { data } = await api.get<Venta[]>("/ventas/");
        return data; // Devolverá un array de objetos Venta
    } catch (error) {
        if (isAxiosError(error) && error.response) { // Captura y formatea errores de la API
            const message = (error.response.data as { error?: string }).error;
            throw new Error(message || "Error al obtener ventas.");
        }
        throw new Error("Ocurrió un error inesperado al cargar ventas.");
    }
}

// POST - OBTENER detalles de una venta específica
export async function getDetallesVenta(id_venta: number): Promise<DetalleVenta[]> {
    try {
        const { data } = await api.post<{ detalles: DetalleVenta[] }>("/ventas/detalles/", { id_venta });
        return data.detalles; // Devolverá un array de objetos DetalleVenta
    } catch (error) {
        console.error("Error al obtener detalles de venta:", error);
        if (isAxiosError(error) && error.response) { // Captura y formatea errores de la API
            throw new Error(error.response.data.error || "Error al cargar detalles de venta.");
        }
        throw new Error("Ocurrió un error inesperado al cargar detalles de venta.");
    }
}

// POST - REGISTRAR una nueva venta
export async function createVenta(venta: Venta): Promise<Venta> {
    try {
        const { data } = await api.post<Venta>("/ventas/registrar/", venta);
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