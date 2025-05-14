import { isAxiosError } from "axios";
import api from "../../../../shared/lib/axios.ts";
import {Cliente, ClientesDeleteResponse} from "../../../../entities/clientes";

export async function deleteCliente(cliente: Cliente): Promise<ClientesDeleteResponse> {
    try {
        const { data } = await api.delete<ClientesDeleteResponse>("/clientes/eliminar/", {
            data: cliente,
        });
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            const message = (error.response.data as { error?: string }).error;
            throw new Error(message || "Error al deshabilitar el cliente.");
        }

        throw new Error("Error inesperado al deshabilitar el cliente.");
    }
}