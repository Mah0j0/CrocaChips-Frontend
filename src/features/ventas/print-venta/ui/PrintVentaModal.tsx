import React from "react";
import { Modal } from "../../../../shared/ui/modal";
import { useModalContext } from "../../../../app/providers/ModalContext.tsx";
import Button from "../../../../shared/ui/button/Button.tsx"; // Componente de botón
import { FilePdfIcon } from "../../../../shared/icons/index.ts";
import { FileExcelIcon } from "../../../../shared/icons/index.ts";
//Venta
import { Venta } from "../../../../entities/ventas";  
//Para PDF y Excel
import { PDFDownloadLink } from '@react-pdf/renderer';
import { VentasPDFDocument } from './VentasPDFDocument.tsx';    
import { exportVentasToExcel }  from './VentasXlsxDocument.tsx'; // Para exportar a Excel   
                     
function PrintVentaModal(
    { ventasFiltradas, filtro, fechaInicio, fechaFin }: {
        ventasFiltradas: Venta[];
        filtro: string;
        fechaInicio: Date | null;
        fechaFin: Date | null;
    }
){
    const { modals, closeModal } = useModalContext();
    const isOpen = modals["printVenta"];
    // const onSuccessCallback = () => {
    //     setTimeout(() => closeModal("printVenta"), 1000);
    // };
    return (
        <Modal isOpen={isOpen} onClose={() => closeModal("printVenta")} className="max-w-[900px] m-4">
            <div className="no-scrollbar w-full max-w-[900px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
                <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
                    Exportar Reporte de Ventas
                </h4>
                <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
                    Escoge el tipo de archivo que deseas guardar.
                </p>
                <div className="flex flex-row items-center gap-4">
                    <Button size="sm" variant="outline"
                        startIcon={<FilePdfIcon className="h-8 w-8" />}
                    >
                        <PDFDownloadLink
                            document={
                                <VentasPDFDocument 
                                    ventas={ventasFiltradas}
                                    filtro={filtro}
                                    fechaInicio={fechaInicio}
                                    fechaFin={fechaFin}
                                />
                            }
                            fileName={`ventas_${new Date().toISOString().split('T')[0]}.pdf`}
                        >
                            {({ loading }) => (loading ? 'Preparando...' : 'Archivo PDF')}
                        </PDFDownloadLink>
                    </Button>
                    <Button size="sm" variant="outline"
                        startIcon={<FileExcelIcon className="h-8 w-7" />}
                        onClick={() => exportVentasToExcel({
                            ventas: ventasFiltradas,
                            filtro,
                            fechaInicio,
                            fechaFin
                        })}
                    >
                        Archivo Excel
                    </Button>
                </div>
            </div>
        </Modal>
    );
}
        
export default React.memo(PrintVentaModal);