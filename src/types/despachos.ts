
export type Movimiento = {
    id_movimiento: number; 
    vendedor: string;
    producto: string;
    cantidad: number;
    cantidad_volatil: number;
    fecha: string;
};

export type MovimientoDeleteResponse = {
    message: string;
};