import { isAxiosError } from "axios";
import api from "../shared/lib/axios";
import { Movimiento, MovimientosDeleteResponse } from "../types/movimientos";

//RECEPCIONES
//Obtener Recepciones
export async function getRecepciones(): Promise<Movimiento[]> {
    try {
        const { data } = await api.get<Movimiento[]>("/movimientos/recepciones/");
        return data;
    } catch (error) {
        console.error("Error al obtener recepciones:", error);
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error || "Error al cargar recepciones.");
        }
        throw new Error("Ocurrió un error inesperado al cargar recepciones.");
    }
}
//Crear Recepcion
export async function createRecepcion(movimiento: Movimiento): Promise<Movimiento> {
    try {
        const { data } = await api.post<Movimiento>("movimientos/recepciones/registrar/", movimiento);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
          console.error('Error detallado:', error.response.data);
          const message = (error.response.data as { error?: string }).error;
            throw new Error(message || "Error al crear la recepcion.");
        }
  
        throw new Error("Error inesperado al crear la recepcion.");
    }
}
//Editar Recepcion
export async function editRecepcion(movimiento: Movimiento): Promise<Movimiento> {
    try {
        const { data } = await api.put<Movimiento>("/movimientos/recepciones/actualizar/", movimiento);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            const message = (error.response.data as { error?: string }).error;
            throw new Error(message || "Error al editar la recepcion.");
        }

        throw new Error("Error inesperado al editar la recepcion.");
    }
}
//Eliminar Recepcion
export async function deleteRecepcion(movimiento: Movimiento): Promise<MovimientosDeleteResponse> {
    try{
        const { data } = await api.delete<MovimientosDeleteResponse>("/movimientos/recepciones/eliminar/", {
            data: movimiento,
        });
        return data;
    }catch (error) {
        if (isAxiosError(error) && error.response) {
            const message = (error.response.data as { error?: string }).error;
            throw new Error(message || "Error al eliminar la recepción.");
        }

        throw new Error("Error inesperado al eliminar la recepción.");
    }
}