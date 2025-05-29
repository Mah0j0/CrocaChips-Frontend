import {useModalContext} from "../../../../app/providers/ModalContext.tsx";
import {Cliente} from "../../../../entities/clientes";
import {Modal} from "../../../../shared/ui/modal";
import ClienteForm from "../../../../entities/clientes/ui/ClienteForm.tsx";
import {clienteEditSchema} from "../model/schema.ts";
import DeleteClienteButton from "../../delete-cliente/ui/DeleteClienteButton.tsx";
import React from "react";
import {useEditCliente} from "../hooks/useEditCliente.ts";

function EditClienteModal() {
    const { modals, closeModal, selectedData } = useModalContext();
    const isOpen = modals["editCliente"];
    const data = selectedData;

    const { mutate, isPending } = useEditCliente(() => {
        closeModal("editCliente");
    });

    const handleClienteEdit = (formData: Cliente) => {
        formData.id_cliente = data?.id_cliente; // Ensure the ID is set for the edit operation
        mutate(formData);
    };

    if (!data) return null;

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
                    schema={clienteEditSchema}
                    onSubmit={handleClienteEdit}
                    defaultValues={data}
                    isSubmitting={isPending}
                    onCancel={() => closeModal("editCliente")}
                    children={
                        <DeleteClienteButton
                            cliente={data}
                            onSuccess={()=>{
                                closeModal("editCliente");
                            }}
                        />
                    }
                />
            </div>
        </Modal>
    );
}

export default React.memo(EditClienteModal);