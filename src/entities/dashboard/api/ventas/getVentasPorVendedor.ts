import { isAxiosError } from "axios";
import {VendedorVentas} from "../../model/type.ts";
import api from "../../../../shared/lib/axios.ts";

export async function getVentasPorVendedor(): Promise<VendedorVentas[]> {
    try {
        const { data } = await api.get<VendedorVentas[]>("/dashboard/ventas/vendedor/");
        console.log("SEMANAL ",data);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            const message = (error.response.data as { error?: string }).error;
            throw new Error(message || "Error al obtener las ventas mensuales.");
        }
        throw new Error("Error inesperado al obtener las ventas mensuales.");
    }
}