import React from "react";
import { Movimiento } from "../../../../entities/movimientos";
import { FilePdfIcon } from "../../../../shared/icons";
import { PDFDownloadLink } from '@react-pdf/renderer';
import { DespachoPDFDocument } from './DespachoPDFDocument';

type Props = {
    despacho: Movimiento & {
        valor?: number;
        precio_unitario?: number;
    };
};

export const PrintDespachoButton: React.FC<Props> = ({ despacho }) => {
    return (
        <PDFDownloadLink
            document={<DespachoPDFDocument despacho={despacho} valor={despacho.valor} precio_unitario={despacho.precio_unitario} />}
            fileName={`despacho_${despacho.id_movimiento}_${new Date().toISOString().split('T')[0]}.pdf`}
        >
            {({ loading }) => (
                <button
                    className="text-gray-400 hover:text-gray-600"
                    title="Descargar PDF"
                    disabled={loading}
                >
                    <FilePdfIcon className="w-6 h-6" />
                </button>
            )}
        </PDFDownloadLink>
    );
};