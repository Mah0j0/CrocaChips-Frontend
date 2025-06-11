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