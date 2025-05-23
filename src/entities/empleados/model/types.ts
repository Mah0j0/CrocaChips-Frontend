export type Empleado = {
    nombre: string;
    apellido: string;
    rol: string;
    id: number;
    usuario: string;
    telefono: number;
    carnet: string;
    imagen: string;
    habilitado: boolean;
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