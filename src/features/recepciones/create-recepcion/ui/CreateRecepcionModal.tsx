// Tipos
import { Movimiento } from '../../../../entities/movimientos';
// Componentes
import MovimientoForm from '../../../../entities/movimientos/ui/MovimientoForm.tsx';
import React from "react";
import { useModalContext } from "../../../../app/providers/ModalContext.tsx";
import { BoxIcon } from "../../../../shared/icons";
import { Modal } from '../../../../shared/ui/modal';
import { useCreateRecepcion } from "../hooks/useCreateRecepcion.ts";

// Crear Modal
function CreateRecepcionModal() {
    // Apertura/cierre del modal
    const { modals, closeModal } = useModalContext();
    const isOpen = modals["createRecepcion"];

    // Mutación para crear una recepción
    const { mutate, isPending } = useCreateRecepcion(() => {
        setTimeout(() => closeModal("createRecepcion"), 100);
    });

    // Función que maneja el envío del formulario
    const handleRecepcionCreate = (formData: Movimiento) => {
        const recepcionData = {
            ...formData,// Establecer en 0
        };
        mutate(recepcionData);
    };

    // Renderizado del modal
    return (
        <Modal isOpen={isOpen} onClose={() => closeModal("createRecepcion")} className="max-w-[700px] m-4">
            <div className="no-scrollbar w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
                <div className="mb-2 flex items-center">
                    <h4 className="text-2xl font-semibold text-gray-800 dark:text-white/90">
                        Crear Nueva Recepción
                    </h4>
                    <BoxIcon className="size-7 text-gray-800 dark:text-white/90 ml-2" />
                </div>
                <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
                    Completa la información para registrar una nueva recepción
                </p>
                {/* Formulario de recepción */}
                <MovimientoForm
                    onSubmit={handleRecepcionCreate}
                    defaultValues={{}}
                    isSubmitting={isPending}
                    onCancel={() => closeModal("createRecepcion")}
                />
            </div>
        </Modal>
    );
}
export default React.memo(CreateRecepcionModal);