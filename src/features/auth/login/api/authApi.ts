import {LoginForm, LoginResponse} from "../../../../entities/empleados";
import api from "../../../../shared/lib/axios.ts";
import {isAxiosError} from "axios";

export async function loginEmpleado(formData: LoginForm): Promise<LoginResponse> {
    try {
        const response = await api.post<LoginResponse>("/login/", formData);

        const { access, refresh } = response.data;

        if (!access || !refresh) {
            throw new Error("No se recibieron tokens del servidor.");
        }

        return { access, refresh };
    } catch (error: unknown) {
        if (isAxiosError(error) && error.response) {
            const detail = (error.response.data as { detail?: string }).detail;
            throw new Error(detail || "Error en la autenticación.");
        }

        throw new Error("Ocurrió un error inesperado al iniciar sesión.");
    }
}
