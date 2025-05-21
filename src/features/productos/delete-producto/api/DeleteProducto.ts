import {Producto, ProductosDeleteResponse} from "../../../../entities/productos";
import api from "../../../../shared/lib/axios.ts";
import {isAxiosError} from "axios";

export async function deleteProducto(producto: Producto): Promise<ProductosDeleteResponse> {
    try {
        const { data } = await api.delete<ProductosDeleteResponse>("productos/eliminar/", {
            data: producto,
        });
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            const message = (error.response.data as { error?: string }).error;
            throw new Error(message || "Error al desactivar el producto.");
        }

        throw new Error("Error inesperado al desactivar el cliente.");
    }
}