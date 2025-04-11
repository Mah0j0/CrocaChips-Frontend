export type Empleado = {
    nombre: string;
    apellido: string;
    rol: string;
    _id: number;
    usuario: string;
};

export type RegisterForm = Pick<Empleado, "nombre" | "apellido" | "rol"> & {
    password: string;
    password_confirmation: string;
};

export type LoginForm = Pick<Empleado, "usuario"> & {
    clave: string;
};
