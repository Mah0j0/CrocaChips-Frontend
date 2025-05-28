export type ProductosCreate = {
    nombre: string;
    descripcion: string;
    tiempo_vida: number;
    precio_unitario: number;
    stock: number;
    habilitado?: boolean;
};

export type Producto = ProductosCreate & {
    id_producto: number;
};

export type ProductoStock = Producto & {
    id_producto: number;
    producto_nombre: string;
    cantidad_volatil: number;
}

export type ProductosDeleteResponse = {
    message: string;
};