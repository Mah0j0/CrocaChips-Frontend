import { isAxiosError } from "axios";
import api from "../config/axios";
import { LoginForm, Empleado } from "../types/empleados";
import { Producto } from "../types/productos";

type LoginResponse = {
    access: string;
    refresh?: string;
};

//Inicio de sesión
export async function loginUser(formData: LoginForm): Promise<string> {
    try {
        const response = await api.post<LoginResponse>("/login/", formData);
        console.log("Response :",response);
        const accessToken = response.data.access;
        console.log("Access token",accessToken);
        if (!accessToken) {
            throw new Error("Token de acceso no recibido del servidor.");
        }

        return accessToken;
    } catch (error: unknown) {
        if (isAxiosError(error) && error.response) {
            const detail = (error.response.data as { detail?: string }).detail;
            throw new Error(detail || "Error en la autenticación.");
        }

        throw new Error("Ocurrió un error inesperado al iniciar sesión.");
    }
}

export async function getUser() {
    try {
        const { data } = await api.get<Empleado>("/mi-perfil/");
        return data;
    } catch (error) {
        console.log("error", error);
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

//Productos
export async function getProductos(): Promise<Producto[]> { 
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