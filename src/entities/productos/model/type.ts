export type Producto = {
    id_producto: number; 
    nombre: string;
    descripcion: string;
    tiempo_vida: number;
    precio_unitario: number;
    stock: number;
    habilitado?: boolean;
    producto_nombre: string;
    cantidad_volatil: number;
};

export type ProductosDeleteResponse = {
    message: string;
};