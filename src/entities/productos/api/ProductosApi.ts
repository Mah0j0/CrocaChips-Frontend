import { isAxiosError } from "axios";
import api from "../../../shared/lib/axios.ts";
import { Producto } from "../model/type.ts";
import { LoteProduccion } from "../../../types/lotes_producción.ts";

// Función para obtener los productos de la API
export async function getProducts(): Promise<Producto[]> { 
    try {
      const { data } = await api.get<Producto[]>("/productos/");
      return data;
    } catch (error) {
      console.error("Error al obtener productos:", error);
      if (isAxiosError(error) && error.response) {
        throw new Error(error.response.data.error || "Error al cargar productos.");
      }
      throw new Error("Ocurrió un error inesperado al cargar productos.");
    }
  }

// Función para obtener un producto individual
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

//Obtener lotes en produccion
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
