import api from "../../../shared/lib/axios.ts";

export interface Alerta {
    tipo: string;
    mensaje: string;
    cantidad?: number;
    productos?: string[];
}

export interface AlertasResponse {
    alertas: Alerta[];
}

export async function getAlertasRealtime(): Promise<Alerta[]> {
    const { data } = await api.get<AlertasResponse>("/alertas/");
    return data.alertas;
}