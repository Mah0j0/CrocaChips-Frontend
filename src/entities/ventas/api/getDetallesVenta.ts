import {Detalle, DetallesVentaResponse} from "../model/type.ts";
import api from "../../../shared/lib/axios.ts";
import {isAxiosError} from "axios";

export async function getDetallesVenta(id_venta: number): Promise<Detalle[]> {
    try {
        const { data } = await api.post<DetallesVentaResponse>("/ventas/detalles/", { id_venta });
        return data.detalles;
    } catch (error) {
        console.error("Error al obtener detalles de venta:", error);
        if (isAxiosError(error) && error.response) { // Captura y formatea errores de la API
            throw new Error(error.response.data.error || "Error al cargar detalles de venta.");
        }
        throw new Error("Ocurrió un error inesperado al cargar detalles de venta.");
    }
}