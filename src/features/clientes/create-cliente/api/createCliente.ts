import api from "../../../../shared/lib/axios.ts";
import {isAxiosError} from "axios";
import {Cliente} from "../../../../entities/clientes";

export async function createCliente(cliente: Cliente): Promise<string> {
    try {
        const { data } = await api.post<string>("/clientes/registrar/", cliente);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            const message = (error.response.data as { error?: string }).error;
            throw new Error(message || "Error al registrar el cliente.");
        }

        throw new Error("Error inesperado al registrar el cliente.");
    }
}