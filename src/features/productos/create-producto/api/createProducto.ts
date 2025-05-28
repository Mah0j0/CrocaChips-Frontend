import {ProductosCreate} from "../../../../entities/productos";
import api from "../../../../shared/lib/axios.ts";
import {isAxiosError} from "axios";

export async function createProducto(producto: ProductosCreate): Promise<ProductosCreate> {
    try {
        const { data } = await api.post<ProductosCreate>("productos/registrar/", producto);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            console.error('Error detallado:', error.response.data); // Para depuración
            const message = (error.response.data as { error?: string }).error;
            throw new Error(message || "Error al crear el producto.");
        }

        throw new Error("Error inesperado al crear el producto.");
    }
}