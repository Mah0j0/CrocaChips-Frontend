export type Empleado = {
    id?: number;
    usuario?: string;
    nombre: string;
    apellido: string;
    carnet: string;
    telefono: number;
    rol: string;
    imagen?: string;
    habilitado?: boolean;
};

export type LoginForm = Pick<Empleado, "usuario"> & {
    clave: string;
};

export type LoginResponse = {
    access: string;
    refresh: string;
};

export type EmpleadoInfo = Pick<Empleado, "nombre" | "apellido" |"rol" | "usuario" >

export type EmpleadoPasUser =  {
    usuario_generado: string;
    clave_generada: string;
}

export type EmpladoDeleteResponse = {
    message: string;
    empleado: Empleado;
}