export type Venta = {
    id_venta: number;
    vendedor: number;
    cliente: number;
    vendedor_nombre: string;
    cliente_nombre: string;
    estado: boolean;
    fecha: string;
    precio_total: string;
};

export type DetallesVentaResponse = {
    detalles: Detalle[];
};

export type NuevaVenta = {
    cliente: number;
    detalles: NuevoDetalle[];
    cantidad: number;
};
export type NuevoDetalle = {
    producto: number;
    cantidad: number;
}

export type Detalle = {
    id_detalle: number;
    id_venta: number;
    producto: number;
    producto_nombre: string;
    cantidad: number;
    precio_unitario: string;
    subtotal: string;
};

export interface ConfirmarVenta {
    id_venta: number;
}

export type VentaResponse = {
    message: string;
};