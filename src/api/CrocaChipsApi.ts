import { isAxiosError } from "axios";
import api from "../config/axios";
import { LoginForm, Empleado } from "../types/empleados";

type LoginResponse = {
    access: string;
    refresh?: string;
};

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