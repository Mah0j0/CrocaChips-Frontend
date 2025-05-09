import { isAxiosError } from "axios";
import {EmpladoDeleteResponse, Empleado} from "../../../../entities/empleados";
import api from "../../../../shared/lib/axios.ts";

export async function deleteEmpleado(empleado: Empleado): Promise<EmpladoDeleteResponse> {
    try {
        const { data } = await api.delete<EmpladoDeleteResponse>("/empleados/deshabilitar/", {
            data: empleado, // Enviar los datos en la configuración
        });
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            const message = (error.response.data as { error?: string }).error;
            throw new Error(message || "Error al eliminar el empleado.");
        }

        throw new Error("Error inesperado al eliminar el empleado.");
    }
}