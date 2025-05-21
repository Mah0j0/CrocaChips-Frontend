import { isAxiosError } from "axios";
import {Empleado } from "../../../../entities/empleados";
import api from "../../../../shared/lib/axios.ts";

export async function editEmpleado(empleado: Empleado): Promise<Empleado> {
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