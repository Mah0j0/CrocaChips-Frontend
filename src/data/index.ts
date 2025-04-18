type rol = {
    value: string|boolean|number;
    label: string;
}

export const roles: rol[] = [
    { value: "Almacen", label: "Almacen" },
    { value: "Vendedor", label: "Vendedor" },
    { value: "Administrador", label: "Administrador" },
];

export const estados: rol[] = [
    { value: true, label: "Activo" },
    { value: false, label: "Inactivo" },
];