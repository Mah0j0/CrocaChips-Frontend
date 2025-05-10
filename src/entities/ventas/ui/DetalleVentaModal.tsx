import { Modal } from "../../../shared/ui/modal";
import { useModalContext } from "../../../shared/context/ModalContext";
import VentaResumen from "./VentaResumen";
import TablaDetallesVenta from "./TablaDetallesVenta";
import { Venta } from "../model/type";
import {useDetallesVenta} from "../hooks/useDetalleVenta.ts";

type Props = {
    idVenta: number;
    venta: Venta;
};

export default function DetalleVentaModal({ idVenta, venta }: Props) {
    const { modals, closeModal } = useModalContext();
    const isOpen = modals["detalleVenta"];
    const { data: detalles, isLoading, error } = useDetallesVenta(idVenta);

    return (
        <Modal isOpen={isOpen} onClose={() => closeModal("detalleVenta")} className="max-w-4xl">
            <div className="p-6 bg-white dark:bg-gray-900 rounded-xl max-h-[90vh] overflow-y-auto">
                <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Detalle de Venta</h2>

                {isLoading && <p className="text-sm text-gray-500">Cargando detalles...</p>}
                {error && <p className="text-red-500">Error al cargar los detalles</p>}

                <VentaResumen venta={venta} />

                {detalles && <TablaDetallesVenta detalles={detalles} />}
            </div>
        </Modal>
    );
}
