import { isAxiosError } from "axios";
import api from "../config/axios";

import { Producto } from "../types/productos";

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

//Editar producto
export async function editProducto(producto: Producto): Promise<Producto> {
  try {
      const { data } = await api.put<Producto>("/productos/actualizar/", producto);
      return data;
  } catch (error) {
      if (isAxiosError(error) && error.response) {
          const message = (error.response.data as { error?: string }).error;
          throw new Error(message || "Error al editar el producto.");
      }

      throw new Error("Error inesperado al editar el producto.");
  }
}

//Crear producto
export async function createProducto(producto: Producto): Promise<Producto> {
  try {
      const { data } = await api.post<Producto>("/productos/crear/", producto);
      return data;
  } catch (error) {
      if (isAxiosError(error) && error.response) {
          const message = (error.response.data as { error?: string }).error;
          throw new Error(message || "Error al crear el producto.");
      }

      throw new Error("Error inesperado al crear el producto.");
  }
}
//Eliminar producto
//Cambiar el atributo habilitado a false
export async function deleteProducto(producto: Producto): Promise<Producto> {
  try {
      const { data } = await api.delete<Producto>(`/productos/${producto._id}/eliminar/`);
      return data;
  } catch (error) {
      if (isAxiosError(error) && error.response) {
          const message = (error.response.data as { error?: string }).error;
          throw new Error(message || "Error al deshabilitar el producto.");
      }

      throw new Error("Error inesperado al deshabilitar el producto.");
  }
}