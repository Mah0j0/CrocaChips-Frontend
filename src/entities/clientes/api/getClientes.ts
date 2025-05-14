import { isAxiosError } from "axios";
import api from "../../../shared/lib/axios.ts";
import {Cliente} from "../model/type.ts";

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