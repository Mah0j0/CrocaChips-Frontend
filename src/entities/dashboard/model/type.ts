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

export type VentasVendedor = {
    vendedor: string;
    total_ventas: number;
    cantidad_ventas: number;
}

export type VentasClienteFrecuente = {
    cliente_id: number,
    cliente__nombre: string,
    compras: number
}

export type ClientesNuevosMes = {
    mes: string;
    total: number;
};

export type ProduccionProducto = {
    producto_id: number;
    producto__nombre: string;
    total: number;
}

export type ProduccionMensual = {
    fecha: string;
    total: number;
};

export type MovimientoProducto = {
    producto_id: number;
    producto__nombre: string;
    tipo_movimiento: string;
    total: number;
};

export type ProductoStockActual = {
    nombre: string;
    stock: number;
};

export type TicketPromedio = {
    promedio : number;
}

export type VendedorVentas = {
    vendedor_id: number;
    vendedor__nombre: string;
    total: number;
};

export type TopProductos = {
    producto_id: number;
    producto__nombre: string;
    total_vendido: number;
};

export type VentasMensuales = {
    mes: number;
    total: number;
};

export type ProductoProyecccion = {
    anio_prediccion: number;
    mes_prediccion: string;
    id_producto: number;
    nombre_producto: string;
    prediccion: number;
};

export type ProyeccionGeneral = {
    anio_prediccion: number;
    mes_prediccion: string;
    cantidad_anterior: number;
    prediccion: number;
};