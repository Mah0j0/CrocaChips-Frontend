import { isAxiosError } from "axios";
import api from "../../../../shared/lib/axios.ts";
import {Movimiento, MovimientosDeleteResponse} from "../../../../entities/movimientos";

export async function deleteDespacho(movimiento: Movimiento): Promise<MovimientosDeleteResponse> {
    try {
        const { data } = await api.delete<MovimientosDeleteResponse>("/movimientos/despachos/eliminar/", {
            data: movimiento,
        });
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            const message = (error.response.data as { error?: string }).error;
            throw new Error(message || "Error al eliminar el despacho.");
        }

        throw new Error("Error inesperado al eliminar el despacho.");
    }
}