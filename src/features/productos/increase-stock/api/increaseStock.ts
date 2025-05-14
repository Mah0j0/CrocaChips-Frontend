import {Producto} from "../../../../entities/productos";
import api from "../../../../shared/lib/axios.ts";
import {isAxiosError} from "axios";

export async function increaseStock({
    id,
    cantidad,
}: {
    id: number;
    cantidad: number;
}): Promise<Producto> {
    try {
        const { data } = await api.patch(`productos/aumentar_stock/`, {
            id_producto: id,
            cantidad,
        });
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error || "Error al aumentar el stock");
        }
        throw new Error("Error inesperado al aumentar el stock");
    }
}