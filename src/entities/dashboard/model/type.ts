import {Producto} from "../../productos";

export type infoCards = {
    cantidad_empleados: number,
    cantidad_productos: number,
    cantidad_clientes: number,
    total_ventas: number
}

 export type DatosSerie = {
  nombre: string;
  datos: number[];
};

export type DatosGraficos = {
  categorias: string[];
  series: DatosSerie[];
};

export type Alerta =
    | {
    tipo: "ventas_pendientes";
    mensaje: string;
    cantidad: number;
}
    | {
    tipo: "productos_sin_stock" | "productos_stock_bajo";
    mensaje: string;
    productos: Producto[]; // Puedes reemplazar `any` por el tipo de producto si lo tienes definido
};

export type AlertasResponse = {
    alertas: Alerta[];
};