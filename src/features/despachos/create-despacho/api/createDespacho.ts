import api from "../../../../shared/lib/axios.ts";
import {isAxiosError} from "axios";
import {Movimiento} from "../../../../entities/movimientos";

export async function createDespacho(movimiento: Movimiento): Promise<Movimiento> {
    try {
        const { data } = await api.post<Movimiento>("movimientos/despachos/registrar/", movimiento);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            console.error('Error detallado:', error.response.data);
            const message = (error.response.data as { error?: string }).error;
            throw new Error(message || "Error al crear el despacho.");
        }

        throw new Error("Error inesperado al crear el despacho.");
    }
}