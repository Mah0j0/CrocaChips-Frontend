import { isAxiosError } from "axios";
import api from "../config/axios";
import {LoginForm, Empleado, LoginResponse, EmpleadoPasUser, EmpladoDeleteResponse} from "../types/empleados";

export async function loginUser(formData: LoginForm): Promise<LoginResponse> {
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

export async function getUser(): Promise<Empleado> {
    try {
        const { data } = await api.get<Empleado>("/mi-perfil/");
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            const message = (error.response.data as { error?: string }).error;
            throw new Error(message || "Error al obtener el perfil.");
        }

        throw new Error("Error inesperado al obtener los datos del usuario.");
    }
}

export async function getUsers(): Promise<Empleado[]> {
    try {
        const { data } = await api.get<Empleado[]>("/empleados/");
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            const message = (error.response.data as { error?: string }).error;
            throw new Error(message || "Error al obtener los empleados.");
        }

        throw new Error("Error inesperado al obtener los empleados.");
    }
}

export async function editUser(empleado: Empleado): Promise<Empleado> {
    try {
        const { data } = await api.put<Empleado>("/empleados/actualizar/", empleado);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            const message = (error.response.data as { error?: string }).error;
            throw new Error(message || "Error al editar el perfil.");
        }

        throw new Error("Error inesperado al editar el perfil.");
    }
}

export async function createUser(empleado: Empleado): Promise<EmpleadoPasUser> {
    try {
        const { data } = await api.post<EmpleadoPasUser>("/empleados/registrar/", empleado);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            const message = (error.response.data as { error?: string }).error;
            throw new Error(message || "Error al registrar el empleado.");
        }

        throw new Error("Error inesperado al registrar el empleado.");
    }
}

export async function deleteUser(empleado: Empleado): Promise<EmpladoDeleteResponse> {
    try {
        const { data } = await api.delete<EmpladoDeleteResponse>("/empleados/deshabilitar/", {
            data: empleado, // Enviar los datos en la configuración
        });
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            const message = (error.response.data as { error?: string }).error;
            throw new Error(message || "Error al deshabilitar el empleado.");
        }

        throw new Error("Error inesperado al deshabilitar el empleado.");
    }
}