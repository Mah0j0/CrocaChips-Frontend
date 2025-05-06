import { isAxiosError } from "axios";
import api from "../config/axios";
import { Movimiento, MovimientosDeleteResponse } from "../types/movimientos";

//DESPACHOS
//Obtener despachos
export async function getDespachos(): Promise<Movimiento[]> {
    try {
        const { data } = await api.get<Movimiento[]>("/movimientos/despachos/");
        return data;
    } catch (error) {
        console.error("Error al obtener despachos:", error);
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error || "Error al cargar despachos.");
        }
        throw new Error("Ocurrió un error inesperado al cargar despachos.");
    }
}
//Crear despacho
export async function createDespacho(movimiento: Movimiento): Promise<Movimiento> {
    try {
        const { data } = await api.post<Movimiento>("movimientos/despachos/registrar/", movimiento);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            console.error('Error detallado:', error.response.data);
            const message = (error.response.data as { error?: string }).error;
            throw new Error(message || "Error al crear el despacho.");
        }

        throw new Error("Error inesperado al crear el despacho.");
    }
}
//Editar despacho
export async function editDespacho(movimiento: Movimiento): Promise<Movimiento> {
    try {
        const { data } = await api.put<Movimiento>("/movimientos/despachos/actualizar/", movimiento);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            const message = (error.response.data as { error?: string }).error;
            throw new Error(message || "Error al editar el despacho.");
        }

        throw new Error("Error inesperado al editar el despacho.");
    }
}

//Eliminar despacho
export async function deleteDespacho(movimiento: Movimiento): Promise<MovimientosDeleteResponse> {
    try {
        const { data } = await api.delete<MovimientosDeleteResponse>("/movimientos/despachos/eliminar/", {
            data: movimiento,
        });
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            const message = (error.response.data as { error?: string }).error;
            throw new Error(message || "Error al eliminar el despacho.");
        }

        throw new Error("Error inesperado al eliminar el despacho.");
    }
}

// Obtener productos de un vendedor especifico 
export async function getProductosVendedor(): Promise<Movimiento[]> {
    try {
        const { data } = await api.get<Movimiento[]>("/movimientos/cantidad/");
        return data;
    } catch (error) {
        console.error("Error al obtener productos del vendedor:", error);
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error || "Error al cargar productos del vendedor.");
        }
        throw new Error("Ocurrió un error inesperado al cargar productos del vendedor.");
    }
}