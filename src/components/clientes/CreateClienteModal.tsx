import { Modal } from "../ui/modal";
import ClienteForm from "./ClienteForm.tsx";
import { useModalContext } from "../../context/ModalContext.tsx";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCliente } from "../../api/ClienteAapi.ts";
import { toast } from "react-toastify";
import { Cliente } from "../../types/clientes.ts";
import React from "react";

function CreateClienteModal() {
    const { modals, closeModal } = useModalContext();
    const isOpen = modals["createCliente"];
    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: createCliente,
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["clientes"] });
            toast.success("Cliente creado correctamente");
            closeModal("createCliente");
        },
        onError: (error: Error) => {
            toast.error(error.message);
        },
    });

    const handleEmpleadoCreate = (formData: Cliente) => {
        mutate(formData);
    };

    return (
        <Modal isOpen={isOpen} onClose={() => closeModal("createCliente")} className="max-w-[700px] m-4">
            <div className="no-scrollbar w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
                <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
                    Crear Nuevo Cliente
                </h4>
                <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
                    Completa la información para registrar un nuevo Cliente
                </p>

                <ClienteForm
                    onSubmit={handleEmpleadoCreate}
                    defaultValues={{}}
                    isSubmitting={isPending}
                    onCancel={() => closeModal("createCliente")}
                />
            </div>
        </Modal>
    );
}

export default React.memo(CreateClienteModal);