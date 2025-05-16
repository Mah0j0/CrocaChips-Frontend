import { Venta } from "../../../../entities/ventas";
import * as XLSX from 'xlsx-js-style';


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
  
  //Definir ancho de columnas 


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
  //Definir ancho de columnas
  const columnWidths = [
    { wch: 10 }, // ID
    { wch: 20 }, // Cliente
    { wch: 20 }, // Vendedor
    { wch: 15 }, // Fecha
    { wch: 10 }, // Total
    { wch: 10 }  // Estado
  ];
  // Añadir estilos a los encabezados
  const headerStyle = {
    font: { bold: true, color: { rgb: 'FFFFFF' } },
    fill: { fgColor: { rgb: '4472C4' } },
    alignment: { horizontal: 'center' }
  };

  const range = XLSX.utils.decode_range(worksheet['!ref']!);
  // Aplicar estilos a los encabezados
  for (let C = range.s.c; C <= range.e.c; ++C) {
    const cellAddress = XLSX.utils.encode_cell({ r: 0, c: C });
    worksheet[cellAddress].s = headerStyle;
  }

  // Aplicar anchos de columna
  worksheet['!cols'] = columnWidths;
  // Generar el archivo Excel
  XLSX.writeFile(workbook, fileName);
};