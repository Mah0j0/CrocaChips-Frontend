import { isAxiosError } from "axios";
import api from "../config/axios";
import { LoginForm } from "../types/empleados";

export async function loginUser(formData: LoginForm): Promise<void> {
    try {
        const response = await api.post("/api/login/", formData);
        console.log(response);
        const accessToken = response.data.access;
        console.log(accessToken);
        if (!accessToken) {
            throw new Error("Token no recibido del servidor.");
        }

        // Guardar token en localStorage
        localStorage.setItem("AUTH_CROCA", accessToken);
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            console.error("Error al iniciar sesión:", error.response);
            // Puedes adaptar este mensaje según tu backend
            throw new Error(error.response.data.detail || "Error en la autenticación.");
        }

        throw new Error("Ocurrió un error inesperado al iniciar sesión.");
    }
}
