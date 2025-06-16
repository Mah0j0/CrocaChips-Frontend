import api from "../../../../shared/lib/axios.ts";
import { isAxiosError } from "axios";
import { Movimiento } from "../../../../entities/movimientos";

export async function editRecepcion(movimiento: Movimiento): Promise<Movimiento> {
    try {
        // PUT - Extraer y retornar datos
        const { data } = await api.put<Movimiento>("/movimientos/recepciones/actualizar/", movimiento);
        return data;
    } catch (error) {
        // Manejo de errores
        if (isAxiosError(error) && error.response) {
            console.error('Error detallado:', error.response.data);
            const message = (error.response.data as { error?: string }).error;
            throw new Error(message || "Error al editar la recepción.");
        }
        throw new Error("Error inesperado al editar la recepción.");
    }
}