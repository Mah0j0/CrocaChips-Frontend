export type Empleado = {
    nombre: string;
    apellido: string;
    rol: string;
    _id: number;
    usuario: string;
    telefono: number;
    carnet: string;
};

export type EmpleadoDatos = Pick<Empleado, "nombre" | "apellido" | "rol" | "usuario" | "telefono" | "carnet">;
export type RegisterForm = Pick<Empleado, "nombre" | "apellido" | "rol"> & {
    password: string;
    password_confirmation: string;
};

export type LoginForm = Pick<Empleado, "usuario"> & {
    clave: string;
};

export type LoginResponse = {
    access: string;
    refresh: string;
};

export type EmpleadoInfo = Pick<Empleado, "nombre" | "apellido" |"rol" | "usuario" >