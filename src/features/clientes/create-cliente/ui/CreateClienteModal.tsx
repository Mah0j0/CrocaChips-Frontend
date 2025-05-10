import React from "react";
import { Modal } from "../../../../shared/ui/modal";
import { useModalContext } from "../../../../app/providers/ModalContext.tsx";
import {useCreateCliente} from "../hooks/useCreateCliente.ts";
import {Cliente} from "../../../../entities/clientes";
import ClienteForm from "../../../../entities/clientes/ui/ClienteForm.tsx";
import {clienteCreateSchema} from "../model/schema.ts";

function CreateClienteModal() {
    const { modals, closeModal } = useModalContext();
    const isOpen = modals["createCliente"];

    const { mutate, isPending } = useCreateCliente(() => {
        setTimeout(() => closeModal("createEmpleado"), 10000);
    });

    const handleClienteCreate = (formData: Cliente) => {
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
                    schema={clienteCreateSchema}
                    onSubmit={handleClienteCreate}
                    defaultValues={{}}
                    isSubmitting={isPending}
                    onCancel={() => closeModal("createCliente")}
                />
            </div>
        </Modal>
    );
}

export default React.memo(CreateClienteModal);