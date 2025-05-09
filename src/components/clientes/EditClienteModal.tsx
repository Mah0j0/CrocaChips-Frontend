import { Modal } from "../../shared/ui/modal";
import ClienteForm from "./ClienteForm.tsx";
import { useModalContext } from "../../shared/context/ModalContext.tsx";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import {editCliente} from "../../entities/clientes/api/ClienteApi.ts";
import { Cliente } from "../../entities/clientes/model/type.ts";
import { toast } from "react-toastify";
import React from "react";

function EditClienteModal() {
    const { modals, closeModal, selectedData } = useModalContext();
    const isOpen = modals["editCliente"];
    const queryClient = useQueryClient();
    const data = selectedData;

    const { mutate, isPending } = useMutation({
        mutationFn: editCliente,
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["clientes"] });
            toast.success("Cliente actualizado correctamente");
            closeModal("editCliente");
        },
        onError: (error: Error) => {
            toast.error(error.message || "Error al actualizar el cliente");
        },
    });

    const handleClienteEdit = (formData: Cliente) => {
        mutate(formData);
    };

    if (!data) {
        return null;
    }

    return (
        <Modal isOpen={isOpen} onClose={() => closeModal("editCliente")} className="max-w-[700px] m-4">
            <div className="no-scrollbar w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
                <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
                    Editar Información del Cliente
                </h4>
                <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
                    Actualiza los datos del cliente según sea necesario.
                </p>

                <ClienteForm
                    onSubmit={handleClienteEdit}
                    defaultValues={data}
                    isSubmitting={isPending}
                    onCancel={() => closeModal("editCliente")}
                    disabledFields={["id_cliente", "created_at"]}
                />
            </div>
        </Modal>
    );
}

export default React.memo(EditClienteModal);