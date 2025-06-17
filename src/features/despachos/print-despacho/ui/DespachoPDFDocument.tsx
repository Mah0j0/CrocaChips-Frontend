import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';
import { Movimiento } from "../../../../entities/movimientos";
import logo from "../../../../../public/images/logo/logo_nombre.jpg";

// Colores corporativos
const COLORS = {
    primary: '#2c3e50',
    secondary: '#3498db',
    lightGray: '#f5f7fa',
    border: '#e0e6ed'
};

const styles = StyleSheet.create({
    page: {
        padding: 40,
        fontSize: 10,
        fontFamily: 'Helvetica',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100%'
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 2,
        borderBottomColor: COLORS.primary,
        paddingBottom: 15,
        marginBottom: 25
    },
    logo: {
        width: 135,
        height: 55,
        objectFit: 'contain'
    },
    companyInfo: {
        textAlign: 'right',
        color: '#555'
    },
    titleSection: {
        textAlign: 'center',
        marginBottom: 25
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: COLORS.primary,
        marginBottom: 5
    },
    subtitle: {
        fontSize: 12,
        color: '#ef561e',
        fontWeight: 'bold'
    },
    documentInfo: {
        backgroundColor: COLORS.lightGray,
        padding: 15,
        borderRadius: 5,
        marginBottom: 25,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    infoLabel: {
        fontWeight: 'bold',
        color: COLORS.primary,
        marginBottom: 3
    },
    infoValue: {
        color: '#555'
    },
    gridContainer: {
        flexDirection: 'row',
        marginBottom: 25,
        gap: 15
    },
    gridColumn: {
        flex: 1
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: COLORS.primary,
        marginBottom: 10,
        paddingBottom: 5,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
        paddingBottom: 8,
        borderBottomWidth: 0.5,
        borderBottomColor: COLORS.border
    },
    table: {
        marginTop: 10
    },
    tableRow: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
        paddingVertical: 8
    },
    tableHeader: {
        backgroundColor: COLORS.primary,
        color: 'white',
        fontWeight: 'bold'
    },
    tableCell: {
        flex: 1,
        paddingHorizontal: 5
    },
    signatureContainer: {
        marginTop: 50,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    signatureBox: {
        width: '45%',
        textAlign: 'center'
    },
    signatureLine: {
        borderBottomWidth: 1,
        borderBottomColor: '#000',
        marginTop: 50,
        width: '100%',
        height: 40
    },
    footer: {
        position: 'absolute',
        bottom: 30,
        left: 40,
        right: 40,
        textAlign: 'center',
        color: '#888',
        fontSize: 9,
        borderTopWidth: 1,
        borderTopColor: COLORS.border,
        paddingTop: 10
    },
    pageNumber: {
        position: 'absolute',
        bottom: 10,
        left: 0,
        right: 0,
        textAlign: 'center',
        fontSize: 10,
        color: '#666'
    }
});

interface DespachoPDFDocumentProps {
    despacho: Movimiento;
}

export const DespachoPDFDocument = ({ despacho }: DespachoPDFDocumentProps) => {
    // Función de formateo consistente para todas las fechas
    const formatDate = (dateInput: string | Date) => {
        const date = typeof dateInput === 'string'
            ? new Date(dateInput)
            : dateInput;

        return date.toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const currentDate = formatDate(new Date());
    const fechaDespacho = formatDate(despacho.fecha);

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                {/* Encabezado */}
                <View style={styles.header}>
                    <Image src={logo} style={styles.logo} />
                    <View style={styles.companyInfo}>
                        <Text>Croca Chips | Empresa de snacks</Text>
                        <Text>Rio Seco, Zona Brasil, C. Puerto Alonso N°21123</Text>
                        <Text>crocachips@gmail.com | crocachips.com</Text>
                    </View>
                </View>

                {/* Título */}
                <View style={styles.titleSection}>
                    <Text style={styles.title}>COMPROBANTE DE DESPACHO</Text>
                    <Text style={styles.subtitle}>Documento N°: {despacho.id_movimiento}</Text>
                </View>

                {/* Información del documento */}
                <View style={styles.documentInfo}>
                    <View>
                        <Text style={styles.infoLabel}>FECHA DE EMISIÓN</Text>
                        <Text style={styles.infoValue}>{currentDate}</Text>
                    </View>
                    <View>
                        <Text style={styles.infoLabel}>FECHA DE DESPACHO</Text>
                        <Text style={styles.infoValue}>{fechaDespacho}</Text>
                    </View>
                    <View>
                        <Text style={styles.infoLabel}>ESTADO</Text>
                        <Text style={styles.infoValue}>Completado</Text>
                    </View>
                </View>

                {/* Grid de información */}
                <View style={styles.gridContainer}>
                    {/* Columna 1 - Información general */}
                    <View style={styles.gridColumn}>
                        <Text style={styles.sectionTitle}>INFORMACIÓN GENERAL</Text>
                        <View style={styles.infoRow}>
                            <Text>ID Despacho:</Text>
                            <Text>{despacho.id_movimiento}</Text>
                        </View>
                        <View style={styles.infoRow}>
                            <Text>Vendedor:</Text>
                            <Text>{despacho.vendedor_nombre}</Text>
                        </View>
                    </View>

                    {/* Columna 2 - Información del producto */}
                    <View style={styles.gridColumn}>
                        <Text style={styles.sectionTitle}>DETALLE DEL PRODUCTO</Text>
                        <View style={styles.infoRow}>
                            <Text>Producto:</Text>
                            <Text>{despacho.producto_nombre}</Text>
                        </View>
                        <View style={styles.infoRow}>
                            <Text>Cantidad:</Text>
                            <Text>{despacho.cantidad} unidades</Text>
                        </View>
                    </View>
                </View>

                {/* Tabla de resumen */}
                <Text style={styles.sectionTitle}>RESUMEN DE DESPACHO</Text>
                <View style={styles.table}>
                    <View style={[styles.tableRow, styles.tableHeader]}>
                        <Text style={styles.tableCell}>Vendedor</Text>
                        <Text style={styles.tableCell}>Producto</Text>
                        <Text style={styles.tableCell}>Cantidad</Text>
                    </View>
                    <View style={styles.tableRow}>
                        <Text style={styles.tableCell}>{despacho.vendedor_nombre}</Text>
                        <Text style={styles.tableCell}>{despacho.producto_nombre}</Text>
                        <Text style={styles.tableCell}>{despacho.cantidad}</Text>
                    </View>
                </View>

                {/* Firma */}
                <View style={styles.signatureContainer}>
                    <View style={styles.signatureBox}>
                        <Text>Vendedor Responsable:</Text>
                        <View style={styles.signatureLine} />
                        <Text style={{ marginTop: 10, fontSize: 9 }}>Nombre y Firma</Text>
                    </View>
                </View>

                {/* Pie de página */}
                <View style={styles.footer}>
                    <Text>Este documento es válido como comprobante de despacho oficial</Text>
                    <Text>Proceso generado automáticamente el {currentDate}</Text>
                </View>

                {/* Número de página */}
                <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
                    `Página ${pageNumber} de ${totalPages}`
                )} fixed />
            </Page>
        </Document>
    );
};