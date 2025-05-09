import {Empleado} from "../model/types.ts";
import api from "../../../shared/lib/axios.ts";
import {isAxiosError} from "axios";

export async function getEmpleados(): Promise<Empleado[]> {
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