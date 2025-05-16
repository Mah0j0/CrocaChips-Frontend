import { Venta } from "../../../../entities/ventas";
import * as XLSX from 'xlsx';


interface ExportOptions {
  ventas: Venta[];
  filtro: string;
  fechaInicio: Date | null;
  fechaFin: Date | null;
  fileName?: string;
}

export const exportVentasToExcel = ({
  ventas,
  filtro,
  fechaInicio,
  fechaFin,
  fileName = `ventas_${new Date().toISOString().split('T')[0]}.xlsx`
}: ExportOptions) => {
  // Preparar los datos
  const data = ventas.map(venta => ({
    'ID': venta.id_venta,
    'Cliente': venta.cliente_nombre,
    'Vendedor': venta.vendedor_nombre,
    'Fecha': new Date(venta.fecha).toLocaleDateString(),
    'Total': venta.precio_total,
    'Estado': venta.estado ? 'Activo' : 'Inactivo'
  }));

  // Crear hoja de trabajo
  const worksheet = XLSX.utils.json_to_sheet(data);
  
  // Crear libro de trabajo
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Ventas');
  
  // Añadir metadatos
  if (filtro || fechaInicio || fechaFin) {
    const metadata = [
      ['Reporte de Ventas'],
      [''],
      ['Filtros aplicados:'],
      [`Texto: ${filtro || 'Ninguno'}`],
      [`Fecha inicio: ${fechaInicio ? fechaInicio.toLocaleDateString() : 'No especificada'}`],
      [`Fecha fin: ${fechaFin ? fechaFin.toLocaleDateString() : 'No especificada'}`],
      [''],
      ['Generado el:', new Date().toLocaleString()]
    ];
    
    const metadataSheet = XLSX.utils.aoa_to_sheet(metadata);
    XLSX.utils.book_append_sheet(workbook, metadataSheet, 'Metadatos');
  }

  // Generar el archivo Excel
  XLSX.writeFile(workbook, fileName);
};