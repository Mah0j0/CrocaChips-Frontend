import api from "../../../../shared/lib/axios.ts";
import {isAxiosError} from "axios";
import {Movimiento} from "../../../../entities/movimientos";

export async function editDespacho(movimiento: Movimiento): Promise<Movimiento> {
    try {
        const { data } = await api.put<Movimiento>("/movimientos/despachos/actualizar/", movimiento);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            const message = (error.response.data as { error?: string }).error;
            throw new Error(message || "Error al editar el despacho.");
        }

        throw new Error("Error inesperado al editar el despacho.");
    }
}