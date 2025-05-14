import {Empleado} from "../../empleados";

export type Cliente = {
    id_cliente: number;
    nombre: string;
    direccion: string;
    telefono: string;
    habilitado: boolean;
    carnet: string;
    created_at: Date;
    imagen: string;
}

export type ClientesDeleteResponse = {
    message: string;
    empleado: Empleado;
}