import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';
import { Venta } from "../../../../entities/ventas";
import logo from "/images/logo/auth-logo.svg";
// Estilos para el PDF
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 10,
  },
  header: {
    marginBottom: 20,
    textAlign: 'center',
  },
  logo: {
    width: 100,
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 10,
    marginBottom: 20,
    color: '#555',
  },
  table: {
    display: 'flex',
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableColHeader: {
    width: '100%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    backgroundColor: '#f0f0f0',
    padding: 5,
  },
  tableCol: {
    width: '100%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 5,
  },
  headerText: {
    fontWeight: 'bold',
  },
});


interface VentasPDFDocumentProps {
  ventas: Venta[];
  filtro: string;
  fechaInicio: Date | null;
  fechaFin: Date | null;
}

export const VentasPDFDocument = ({ 
  ventas, 
  filtro, 
  fechaInicio, 
  fechaFin 
}: VentasPDFDocumentProps) => {
  // Formatear fechas para mostrar en el PDF
  const formatDate = (date: Date | null) => 
    date ? date.toLocaleDateString() : 'No especificada';

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Image src={logo} style={styles.logo}/>
          <Text style={styles.title}>Reporte de Ventas</Text>
          <Text style={styles.subtitle}>
            Filtros aplicados: {filtro || 'Ninguno'} | 
            Fecha inicio: {formatDate(fechaInicio)} | 
            Fecha fin: {formatDate(fechaFin)}
          </Text>
        </View>

        <View style={styles.table}>
          {/* Encabezados */}
          <View style={styles.tableRow}>
            <View style={styles.tableColHeader}>
              <Text style={styles.headerText}>ID</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={styles.headerText}>Cliente</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={styles.headerText}>Vendedor</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={styles.headerText}>Fecha</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={styles.headerText}>Total</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={styles.headerText}>Estado</Text>
            </View>
          </View>

          {/* Datos */}
          {ventas.map((venta) => (
            <View style={styles.tableRow} key={venta.id_venta}>
              <View style={styles.tableCol}>
                <Text>{venta.id_venta}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text>{venta.cliente_nombre}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text>{venta.vendedor_nombre}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text>{new Date(venta.fecha).toLocaleDateString()}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text>{venta.precio_total}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text>{venta.estado ? 'Activo' : 'Inactivo'}</Text>
              </View>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};