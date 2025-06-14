import api from "../../../../shared/lib/axios.ts";
import { isAxiosError } from "axios";
import { Movimiento, MovimientosDeleteResponse } from "../../../../entities/movimientos";

export async function deleteRecepcion(movimiento: Movimiento): Promise<MovimientosDeleteResponse> {
    try {
        // DELETE - Extraer y retornar datos
        const { data } = await api.delete<MovimientosDeleteResponse>("/movimientos/recepciones/eliminar/", {
            data: movimiento,
        });
        return data;
    } catch (error) {
        // Manejo de errores
        if (isAxiosError(error) && error.response) {
            console.error('Error detallado:', error.response.data);
            const message = (error.response.data as { error?: string }).error;
            throw new Error(message || "Error al eliminar la recepción.");
        }
        throw new Error("Error inesperado al eliminar la recepción.");
    }
}