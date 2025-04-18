import {Empleado} from "./empleados.ts";

export type Cliente = {
    id_cliente: number;
    nombre: string;
    direccion: string;
    telefono: string;
    habilitado: boolean;
    created_at: Date;
    imagen: string;
}

export type ClientesDeleteResponse = {
    message: string;
    empleado: Empleado;
}