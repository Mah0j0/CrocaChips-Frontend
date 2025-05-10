export type Movimiento = {
    id_movimiento: number;
    vendedor: number;
    id_producto: number;
    vendedor_nombre: string;
    producto_nombre: string;
    tipo_movimiento: string;
    cantidad: number;
    cantidad_volatil: number;
    fecha: string;
}

export type MovimientosDeleteResponse = {
    message: string;
}

export type LoteProduccion = {
    id_lote: number;
    producto: number;
    producto_nombre: string;
    cantidad: number;
    fecha_elaboracion: string;
};