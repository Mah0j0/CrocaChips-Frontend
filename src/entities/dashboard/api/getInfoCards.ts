import { isAxiosError } from "axios";
import api from "../../../shared/lib/axios.ts";
import {infoCards} from "../model/type.ts";

export async function getInfoCards(): Promise<infoCards> {
    try {
        const { data } = await api.get<infoCards>("/dashboard/");
        console.log('getinfo ',data);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            const message = (error.response.data as { error?: string }).error;
            throw new Error(message || "Error al obtener las info cards.");
        }

        throw new Error("Error inesperado al obtener las info cards.");
    }
}