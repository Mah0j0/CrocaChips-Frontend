import { isAxiosError } from "axios";
import api from "../config/axios";
import { Venta, DetalleVenta, NuevaVenta, ConfirmarVenta, VentaResponse } from "../types/ventas";

// GET - OBTENER todas las ventas disponibles
export async function getVentas(): Promise<Venta[]> {
    try {
        const { data } = await api.get<Venta[]>("/ventas/");
        return data; // Devolverá un array de objetos Venta
    } catch (error) {
        console.error("Error al obtener ventas:", error);
        if (isAxiosError(error) && error.response) { // Captura y formatea errores de la API
            throw new Error(error.response.data.error || "Error al cargar ventas.");
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
export async function createVenta(venta: NuevaVenta): Promise<VentaResponse> {
    try {
        const { data } = await api.post<VentaResponse>("/ventas/registrar/", venta);
        return data; // Devolverá un objeto VentaResponse
    } catch (error) {
        console.error("Error al registrar venta:", error);
        if (isAxiosError(error) && error.response) { // Captura y formatea errores de la API
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