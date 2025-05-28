import {ProductoStock} from "../model/type.ts";
import api from "../../../shared/lib/axios.ts";
import {isAxiosError} from "axios";

export async function getMisProductos(): Promise<ProductoStock[]> {
    try {
        const { data } = await api.get<ProductoStock[]>("/movimientos/cantidad/");
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error || "Error al cargar productos.");
        }
        throw new Error("Ocurrió un error inesperado al cargar productos.");
    }
}