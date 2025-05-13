//Tipos
import {Movimiento} from '../../types/movimientos.ts';
//API
import {editDespacho} from '../../api/DespachosApi.ts';
//Componentes
import MovimientoForm from './MovimientoForm.tsx';
import { Modal } from "../ui/modal";
import { BoxIcon } from "../../icons/index.ts";
import { useModalContext } from "../../context/ModalContext.tsx";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import React from "react";

//Funcion que crea el modal para editar un despacho
function EditDespachoModal() {
    const { modals, closeModal, selectedData } = useModalContext();
    const isOpen = modals["editDespacho"];
    const queryClient = useQueryClient(); 
    const data = selectedData; //para datos de la tabla

    const { mutate, isPending } = useMutation({
        mutationFn: editDespacho,
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["despachos"] });
            toast.success("Despacho actualizado correctamente");
            setTimeout(() => {
                closeModal("editDespacho");
            }, 1000);
        },
        onError: (error: Error) => {
            toast.error(error.message);
        },
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
