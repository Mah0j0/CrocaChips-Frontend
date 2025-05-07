export type Producto = {
    id_producto: number; 
    nombre: string;
    producto_nombre: string;
    descripcion: string;
    tiempo_vida: number;
    precio_unitario: number; 
    cantidad_volatil: number;
    stock: number;
    habilitado?: boolean;
};

export type ProductosDeleteResponse = {
    message: string;
};