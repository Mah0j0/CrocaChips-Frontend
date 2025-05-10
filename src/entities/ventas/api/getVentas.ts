import {Venta} from "../model/type.ts";
import api from "../../../shared/lib/axios.ts";
import {isAxiosError} from "axios";

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