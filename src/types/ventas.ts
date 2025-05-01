export interface Venta {
    id_venta?: number;
    vendedor?: number;
    cliente?: number;
    vendedor_nombre?: string;
    cliente_nombre?: string;
    estado?: boolean;
    fecha?: string;
    precio_total?: number;
}

export interface DetalleVenta {
    id_detalle?: number;
    id_venta?: number;
    producto?: number;
    producto_nombre?: string;
    cantidad?: number;
    precio_unitario?: number;
    subtotal?: number;
}

export interface NuevaVenta {
    cliente: number;
    detalles: {
        producto: number;
        cantidad: number;
    }[];
}

export interface ConfirmarVenta {
    id_venta: number;
}