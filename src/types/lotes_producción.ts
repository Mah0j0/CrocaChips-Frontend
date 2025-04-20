import {Producto} from "./productos";

export type LoteProduccion = {
    id_lote: number; 
    producto: Producto;
    cantidad: number;
    fecha_elaboracion: string;
};