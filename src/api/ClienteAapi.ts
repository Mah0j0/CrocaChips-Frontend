import { isAxiosError } from "axios";
import api from "../config/axios";
import {Cliente, ClientesDeleteResponse} from "../types/clientes.ts";

export async function getClientes(): Promise<Cliente[]> {
    try {
        const { data } = await api.get<Cliente[]>("/clientes/");
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            const message = (error.response.data as { error?: string }).error;
            throw new Error(message || "Error al obtener los clientes.");
        }

        throw new Error("Error inesperado al obtener los clientes.");
    }
}

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