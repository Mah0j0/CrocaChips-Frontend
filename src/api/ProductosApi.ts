import { isAxiosError } from "axios";
import api from "../config/axios";
import { Producto, ProductosDeleteResponse } from "../types/productos";

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
      const { data } = await api.post<Producto>("productos/registrar/", producto);
      return data;
  } catch (error) {
      if (isAxiosError(error) && error.response) {
        console.error('Error detallado:', error.response.data); // Para depuración  
        const message = (error.response.data as { error?: string }).error;
          throw new Error(message || "Error al crear el producto.");
      }

      throw new Error("Error inesperado al crear el producto.");
  }
}
//Eliminar producto
export async function deleteProducto(producto: Producto): Promise<ProductosDeleteResponse> {
  try {
      const { data } = await api.delete<ProductosDeleteResponse>("productos/eliminar/", {
          data: producto,
      });
      return data;
  } catch (error) {
      if (isAxiosError(error) && error.response) {
          const message = (error.response.data as { error?: string }).error;
          throw new Error(message || "Error al desactivar el producto.");
      }

      throw new Error("Error inesperado al desactivar el cliente.");
  }
}
// Aumentar stock
export async function increaseProductStock({ id, cantidad }: { id: number; cantidad: number }): Promise<Producto> {
  try {
    const { data } = await api.patch<Producto>(`productos/${id}/aumentar-stock/`, { cantidad });
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error || "Error al aumentar el stock");
    }
    throw new Error("Error inesperado al aumentar el stock");
  }
}

// Reducir stock
export async function decreaseProductStock({ id, cantidad }: { id: number; cantidad: number }): Promise<Producto> {
  try {
    const { data } = await api.patch<Producto>(`productos/${id}/reducir-stock/`, { cantidad });
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error || "Error al reducir el stock");
    }
    throw new Error("Error inesperado al reducir el stock");
  }
}