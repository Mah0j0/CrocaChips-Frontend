import React from "react";
import { Movimiento } from "../../../../entities/movimientos";
import Button from "../../../../shared/ui/button/Button";
import { FilePdfIcon } from "../../../../shared/icons";
import { PDFDownloadLink } from '@react-pdf/renderer';
import { DespachoPDFDocument } from './DespachoPDFDocument';

type Props = {
    despacho: Movimiento;
};

export const PrintDespachoButton: React.FC<Props> = ({ despacho }) => {
    return (
        <Button 
            size="sm" 
            variant="outline"
            startIcon={<FilePdfIcon className="h-5 w-5" />}
            className="mr-2"
        >
            <PDFDownloadLink
                document={<DespachoPDFDocument despacho={despacho} />}
                fileName={`despacho_${despacho.id_movimiento}_${new Date().toISOString().split('T')[0]}.pdf`}
            >
                {({ loading }) => (loading ? 'Preparando...' : 'PDF')}
            </PDFDownloadLink>
        </Button>
    );
};