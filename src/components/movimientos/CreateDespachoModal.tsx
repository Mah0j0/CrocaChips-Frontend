//Tipos
import {Movimiento} from '../../types/movimientos.ts';
//API
import {createDespacho} from '../../api/DespachosApi.ts';
//Componentes
import MovimientoForm from './MovimientoForm.tsx';
import { Modal } from "../ui/modal";
import { BoxIcon } from "../../icons/index.ts";
import { useModalContext } from "../../context/ModalContext.tsx";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import React from "react";

//Funcion que crea el modal para crear un despacho
function CreateDespachoModal() {
    const { modals, closeModal } = useModalContext();
    const isOpen = modals["createDespacho"];
    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: createDespacho,
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["despachos"] });
            toast.success("Despacho creado correctamente");
            setTimeout(() => {
                closeModal("createDespacho");
            }, 1000);
        },
        onError: (error: Error) => {
            toast.error(error.message);
        },
    });

    const handleProductoCreate = (formData: Movimiento) => {
        const despachoData = {
            ...formData, 
            habilitado: true  // Asegura que este campo se envíe
        };
        mutate(despachoData);
    };

    return (
        <Modal isOpen={isOpen} onClose={() => closeModal("createProducto")} className="max-w-[700px] m-4">
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
