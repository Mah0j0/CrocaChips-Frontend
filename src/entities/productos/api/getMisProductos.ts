import {Producto} from "../model/type.ts";
import api from "../../../shared/lib/axios.ts";
import {isAxiosError} from "axios";

export async function getMisProductos(): Promise<Producto[]> {
    try {
        const { data } = await api.get<Producto[]>("/movimientos/cantidad/");
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error || "Error al cargar productos.");
        }
        throw new Error("Ocurrió un error inesperado al cargar productos.");
    }
}