import { isAxiosError } from "axios";
import api from "../../../shared/lib/axios.ts";
import {LoteProduccion} from "../../movimientos";

export async function getLotesEnProduccion(): Promise<LoteProduccion[]> {
  try {
    const { data } = await api.get<LoteProduccion[]>("productos/lotes/");
    return data;
  } catch (error) {
    console.error("Error al obtener lotes en produccion:", error);
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error || "Error al cargar lotes en produccion.");
    }
    throw new Error("Ocurrió un error inesperado al cargar lotes en produccion.");
  }
}
