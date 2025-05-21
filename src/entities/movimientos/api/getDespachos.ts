import { isAxiosError } from "axios";
import api from "../../../shared/lib/axios.ts";
import {Movimiento} from "../model/type.ts";

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