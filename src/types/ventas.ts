export type venta = {
    vendedor: number;
    cliente: number;
    vendedor_nombre: string;
    cliente_nombre: string;
    precio_total: number;
}

export type detalleVenta = {
    id_venta: number;
    producto: number;
    cantidad: number;
    precio_unitario: number;
    subtotal: number;
    producto_nombre: string;
}