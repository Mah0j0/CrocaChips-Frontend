import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';
import { Movimiento } from "../../../../entities/movimientos";
import logo from "../../../../../public/images/logo/auth-logo.svg";

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
    infoContainer: {
        marginBottom: 30,
    },
    infoRow: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    infoLabel: {
        width: '30%',
        fontWeight: 'bold',
    },
    infoValue: {
        width: '70%',
    },
    signatureContainer: {
        marginTop: 50,
    },
    signatureLabel: {
        marginBottom: 10,
    },
    signatureLine: {
        borderBottomWidth: 1,
        borderBottomColor: '#000',
        borderBottomStyle: 'solid',
        width: '50%',
    },
});

interface DespachoPDFDocumentProps {
    despacho: Movimiento;
}

export const DespachoPDFDocument = ({ despacho }: DespachoPDFDocumentProps) => {
    // Formatear fecha para mostrar en el PDF
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString();
    };

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.header}>
                    <Image src={logo} style={styles.logo} />
                    <Text style={styles.title}>Detalle de Despacho</Text>
                    <Text style={styles.subtitle}>
                        Información del despacho con ID: {despacho.id_movimiento}
                    </Text>
                </View>

                <View style={styles.infoContainer}>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>ID del Despacho:</Text>
                        <Text style={styles.infoValue}>{despacho.id_movimiento}</Text>
                    </View>

                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Nombre del Vendedor:</Text>
                        <Text style={styles.infoValue}>{despacho.vendedor_nombre}</Text>
                    </View>

                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Nombre del Producto:</Text>
                        <Text style={styles.infoValue}>{despacho.producto_nombre}</Text>
                    </View>

                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Cantidad Despachada:</Text>
                        <Text style={styles.infoValue}>{despacho.cantidad}</Text>
                    </View>

                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Fecha del Despacho:</Text>
                        <Text style={styles.infoValue}>{formatDate(despacho.fecha)}</Text>
                    </View>
                </View>

                <View style={styles.signatureContainer}>
                    <Text style={styles.signatureLabel}>Firma del responsable:</Text>
                    <View style={styles.signatureLine}></View>
                </View>
            </Page>
        </Document>
    );
};