import React from "react";
import { Modal } from "../../../../shared/ui/modal";
import { useModalContext } from "../../../../app/providers/ModalContext.tsx";
import { useCreateVenta } from "../hooks/useCreateVenta.ts";
import DetalleVentaForm from "../../../../entities/ventas/ui/DetalleVentaForm.tsx";
import {NuevaVenta} from "../../../../entities/ventas";
import {nuevaVentaSchema} from "../model/schema.ts";

function CreateVentaModal() {
    const { modals, closeModal } = useModalContext();
    const isOpen = modals["createVenta"];

    const onSuccessCallback = () => {
        setTimeout(() => closeModal("createVenta"), 100);
    };

    const { mutate, isPending } = useCreateVenta(onSuccessCallback);

    const handleVentaCreate = (formData: NuevaVenta) => {
        mutate(formData);
    };

    return (
        <Modal isOpen={isOpen} onClose={() => closeModal("createVenta")} className="max-w-[900px] m-4">
            <div className="no-scrollbar w-full max-w-[900px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
                <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
                    Registrar Nueva Venta
                </h4>
                <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
                    Completa la información para registrar una nueva venta
                </p>

                <DetalleVentaForm
                    onSubmit={handleVentaCreate}
                    schema={nuevaVentaSchema}
                    defaultValues={{ cliente: 0, detalles: [] }}
                    isSubmitting={isPending}
                    onCancel={() => closeModal("createVenta")}
                />
            </div>
        </Modal>
    );
}

export default React.memo(CreateVentaModal);