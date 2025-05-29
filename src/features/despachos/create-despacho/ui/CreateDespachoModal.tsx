//Tipos
import {Movimiento} from '../../../../entities/movimientos';
//Componentes
import MovimientoForm from '../../../../entities/movimientos/ui/MovimientoForm.tsx';
import React from "react";
import {useModalContext} from "../../../../app/providers/ModalContext.tsx";
import {BoxIcon} from "../../../../shared/icons";
import { Modal } from '../../../../shared/ui/modal';
import {useCreateDespacho} from "../hooks/useCreateDespacho.ts";

//Funcion que crea el modal para crear un despacho
function CreateDespachoModal() {
    const { modals, closeModal } = useModalContext();
    const isOpen = modals["createDespacho"];

    const { mutate, isPending } = useCreateDespacho(() => {
        setTimeout(() => closeModal("createDespacho"), 100);
    });

    const handleProductoCreate = (formData: Movimiento) => {
        const despachoData = {
            ...formData, 
            habilitado: true  // Asegura que este campo se envíe
        };
        mutate(despachoData);
    };

    return (
        <Modal isOpen={isOpen} onClose={() => closeModal("createDespacho")} className="max-w-[700px] m-4">
            <div className="no-scrollbar w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
                <div className="mb-2 flex items-center">
                    <h4 className="text-2xl font-semibold text-gray-800 dark:text-white/90">
                        Crear Nuevo Despacho
                    </h4>
                    <BoxIcon className="size-7 text-gray-800 dark:text-white/90 ml-2" />
                </div>
                <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
                    Completa la información para registrar un nuevo despacho
                </p>

                <MovimientoForm
                    onSubmit={handleProductoCreate}
                    defaultValues={{}}
                    isSubmitting={isPending}
                    onCancel={() => closeModal("createDespacho")}
                />
            </div>
        </Modal>
    );
}

export default React.memo(CreateDespachoModal);
