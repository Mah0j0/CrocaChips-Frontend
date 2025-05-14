import {Producto} from "../model/type.ts";
import api from "../../../shared/lib/axios.ts";
import {isAxiosError} from "axios";

export async function getProducto(): Promise<Producto> {
    try {
        const { data } = await api.get<Producto>("/productos/");
        return data;
    } catch (error) {
        console.error("Error al obtener productos:", error);
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error || "Error al cargar productos.");
        }
        throw new Error("Ocurrió un error inesperado al cargar productos.");
    }
}
