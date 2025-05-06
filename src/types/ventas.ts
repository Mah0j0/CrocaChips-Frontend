// Interfaces para el módulo de ventas

export interface Venta {
    id_venta: number;
    vendedor: number;
    vendedor_nombre: string;
    cliente: number;
    cliente_nombre: string;
    estado: boolean;
    fecha: string;
    precio_total: number;
    detalles: DetalleVenta[];
}

export interface DetalleVenta {
    id_detalle: number;
    id_venta: number;
    producto: number;
    producto_nombre: string;
    cantidad: number;
    precio_unitario: number;
    subtotal: number;
}

export interface ConfirmarVenta {
    id_venta: number;
}

export type VentaResponse = {
    message: string;
};