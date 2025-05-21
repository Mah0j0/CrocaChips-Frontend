import {Producto} from "../../../../entities/productos";
import api from "../../../../shared/lib/axios.ts";
import {isAxiosError} from "axios";

export async function editProducto(producto: Producto): Promise<Producto> {
    try {
        const { data } = await api.put<Producto>("/productos/actualizar/", producto);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            const message = (error.response.data as { error?: string }).error;
            throw new Error(message || "Error al editar el producto.");
        }

        throw new Error("Error inesperado al editar el producto.");
    }
}