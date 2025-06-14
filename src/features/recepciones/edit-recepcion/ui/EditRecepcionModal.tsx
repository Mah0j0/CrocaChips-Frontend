// Tipos
import { Movimiento } from "../../../../entities/movimientos";
// Componentes
import MovimientoForm from '../../../../entities/movimientos/ui/MovimientoForm.tsx';
import React from "react";
import { useModalContext } from "../../../../app/providers/ModalContext.tsx";
import { BoxIcon } from "../../../../shared/icons";
import { Modal } from '../../../../shared/ui/modal';
import { useEditRecepcion } from "../hooks/useEditRecepcion.ts";

// Editar Modal
function EditRecepcionModal() {
    // Apertura/cierre del modal
    const { modals, closeModal, selectedData } = useModalContext();
    const isOpen = modals["editRecepcion"];
    const data = selectedData; // datos de la tabla

    // Mutación para editar una recepción
    const { mutate, isPending } = useEditRecepcion(() => {
        setTimeout(() => closeModal("editRecepcion"), 100);
    });

    // Función que maneja el envío del formulario
    const handleRecepcionEdit = (formData: Movimiento) => {
        const recepcionData = {
            ...formData,
            id_movimiento: data.id_movimiento, // ID
            tipo_movimiento: "Recepcion",  // tipo_movimiento
            cantidad_volatil: 0  // Establecer en 0
        };
        mutate(recepcionData);
    };

    // Renderizado del modal
    if (!data) {
        return null;
    }
    return (
        <Modal isOpen={isOpen} onClose={() => closeModal("editRecepcion")} className="max-w-[700px] m-4">
            <div className="no-scrollbar w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
                <div className="mb-2 flex items-center">
                    <h4 className="text-2xl font-semibold text-gray-800 dark:text-white/90">
                        Editar Recepción
                    </h4>
                    <BoxIcon className="size-7 text-gray-800 dark:text-white/90 ml-2" />
                </div>
                <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
                    Actualiza la información de la recepción según sea necesario.
                </p>

                {/* Formulario de recepción */}
                <MovimientoForm
                    onSubmit={handleRecepcionEdit}
                    defaultValues={data}
                    isSubmitting={isPending}
                    onCancel={() => closeModal("editRecepcion")}
                    disabledFields={["id_movimiento"]} // Campos que no se pueden editar
                />
            </div>
        </Modal>
    );
}
export default React.memo(EditRecepcionModal);