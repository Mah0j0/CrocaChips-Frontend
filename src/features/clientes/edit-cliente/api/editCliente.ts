import { isAxiosError } from "axios";
import {Cliente} from "../../../../entities/clientes";
import api from "../../../../shared/lib/axios.ts";

export async function editCliente(cliente: Cliente): Promise<Cliente> {
    try {
        const { data } = await api.put<Cliente>("/clientes/actualizar/", cliente);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            const message = (error.response.data as { error?: string }).error;
            throw new Error(message || "Error al editar el cliente.");
        }

        throw new Error("Error inesperado al editar el cliente.");
    }
}