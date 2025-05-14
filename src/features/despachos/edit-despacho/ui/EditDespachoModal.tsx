import MovimientoForm from '../../../../entities/movimientos/ui/MovimientoForm.tsx';
import React from "react";
import {useModalContext} from "../../../../app/providers/ModalContext.tsx";
import {BoxIcon} from "../../../../shared/icons";
import {Movimiento} from "../../../../entities/movimientos";
import { Modal } from '../../../../shared/ui/modal';
import {useEditDespacho} from "../hooks/useEditDespacho.ts";

//Funcion que crea el modal para editar un despacho
function EditDespachoModal() {
    const { modals, closeModal, selectedData } = useModalContext();
    const isOpen = modals["editDespacho"];
    const data = selectedData; //para datos de la tabla

    const { mutate, isPending } = useEditDespacho(() => {
        setTimeout(() => closeModal("createEmpleado"), 10000);
    });

    const handleDespachoEdit = (formData: Movimiento) => {
        const despachoData = {
            ...formData, 
            id_movimiento: data.id_movimiento, // Asegurar que incluimos el ID
        };
        mutate(despachoData);
    };

    if (!data) {
        return null;
    }
    return (
        <Modal isOpen={isOpen} onClose={() => closeModal("editDespacho")} className="max-w-[700px] m-4">
            <div className="no-scrollbar w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
                <div className="mb-2 flex items-center">
                    <h4 className="text-2xl font-semibold text-gray-800 dark:text-white/90">
                        Editar Despacho
                    </h4>
                    <BoxIcon className="size-7 text-gray-800 dark:text-white/90 ml-2" />
                </div>
                <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
                    Actualiza la información del despacho según sea necesario.
                </p>

                <MovimientoForm
                    onSubmit={handleDespachoEdit}
                    defaultValues={data}
                    isSubmitting={isPending}
                    onCancel={() => closeModal("editDespacho")}
                    disabledFields={["id_movimiento"]} // Campos que no se pueden editar
                />
            </div>
        </Modal>
    );
}

export default React.memo(EditDespachoModal);
