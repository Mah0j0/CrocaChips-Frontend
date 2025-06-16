import api from "../../../../shared/lib/axios.ts";
import { isAxiosError } from "axios";
import { Movimiento } from "../../../../entities/movimientos";

export async function createRecepcion(movimiento: Movimiento): Promise<Movimiento> {
    try {
        // POST - Extraer y retornar datos
        const { data } = await api.post<Movimiento>("/movimientos/recepciones/registrar/", movimiento);
        return data;
    } catch (error) {
        // Manejo de errores
        if (isAxiosError(error) && error.response) {
            console.error('Error detallado:', error.response.data);
            const message = (error.response.data as { error?: string }).error;
            throw new Error(message || "Error al crear la recepción.");
        }
        throw new Error("Error inesperado al crear la recepción.");
    }
}