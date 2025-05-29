import { Modal } from "../../../shared/ui/modal";
import { useModalContext } from "../../../app/providers/ModalContext.tsx";
import VentaResumen from "./VentaResumen";
import TablaDetallesVenta from "./TablaDetallesVenta";
import { Venta } from "../model/type";
import {useDetallesVenta} from "../hooks/useDetalleVenta.ts";
import Button from "../../../shared/ui/button/Button.tsx";
import {CheckCircleIcon} from "../../../shared/icons";
import {useConfirmVenta} from "../../../features/ventas/create-venta/hooks/useConfirmVenta.ts";
import {useQueryClient} from '@tanstack/react-query'
import {Empleado} from "../../empleados";

type Props = {
    idVenta: number;
    venta: Venta;
};

export default function DetalleVentaModal({ idVenta, venta }: Props) {
    const { modals, closeModal } = useModalContext();
    const isOpen = modals["detalleVenta"];
    const { data: detalles, isLoading, error } = useDetallesVenta(idVenta);

    const queryClient = useQueryClient();
    const empleado = queryClient.getQueryData<Empleado>(["empleado"]);

    const { mutate: HandleConfirmarVenta } = useConfirmVenta(() => {
        closeModal("detalleVenta");
    });

    return (
        <Modal isOpen={isOpen} onClose={() => closeModal("detalleVenta")} className="max-w-4xl">
            <div className="p-6 bg-white dark:bg-gray-900 rounded-xl max-h-[90vh] overflow-y-auto">
                <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Detalle de Venta</h2>

                {isLoading && <p className="text-sm text-gray-500">Cargando detalles...</p>}
                {error && <p className="text-red-500">Error al cargar los detalles</p>}

                <VentaResumen venta={venta} />


                {detalles && <TablaDetallesVenta detalles={detalles} />}
                {!venta.estado && empleado && empleado.rol === 'Administrador' && (
                    <Button
                        size="md"
                        variant="outline"
                        className="mt-4"
                        startIcon={<CheckCircleIcon className="size-5" />}
                        onClick={() => HandleConfirmarVenta(venta)}
                    >
                        Confirmar Venta
                    </Button>
                )}
            </div>
        </Modal>
    );
}
