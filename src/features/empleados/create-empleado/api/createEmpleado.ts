import {Empleado, EmpleadoPasUser} from "../../../../entities/empleados";
import api from "../../../../shared/lib/axios.ts";
import {isAxiosError} from "axios";

export async function createEmplado(empleado: Empleado): Promise<EmpleadoPasUser> {
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