import { Modal } from "../../../../shared/ui/modal";
import EmpleadoForm from "../../../../entities/empleados/ui/EmpleadoForm.tsx";
import { useModalContext } from "../../../../app/providers/ModalContext.tsx";
import { EmpleadoPasUser } from "../../../../entities/empleados";
import React, { useState } from "react";
import CopyButton from "../../../../shared/ui/copy/CopyToClipboard.tsx";
import {useCreateEmpleado} from "../hooks/useCreateEmpleado.ts";
import {createEmpleadoSchema} from "../model/schema.ts";
import {NewEmpleado} from "../model/type.ts";

function CreateEmpleadoModal() {
    const { modals, closeModal } = useModalContext();
    const isOpen = modals["createEmpleado"];
    const [credenciales, setCredenciales] = useState<EmpleadoPasUser | null>(null);

    const { mutate, isPending } = useCreateEmpleado((data) => {
        setCredenciales(data);
        setTimeout(() => closeModal("createEmpleado"), 10000);
    });

    const handleEmpleadoCreate = (formData: NewEmpleado) => {
        mutate(formData);
    };

    return (
        <Modal isOpen={isOpen} onClose={() => closeModal("createEmpleado")} className="max-w-[700px] m-4">
            <div className="no-scrollbar w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
                <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
                    Crear Nuevo Empleado
                </h4>
                <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
                    Completa la información para registrar un nuevo empleado
                </p>


                {credenciales ? (
                    <div className="mb-6 flex flex-col gap-4 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800">
                        <p className="text-sm text-gray-700 dark:text-gray-300">Credenciales generadas:</p>
                        <CopyButton textToCopy={credenciales.usuario_generado} />
                        <CopyButton textToCopy={credenciales.clave_generada} />
                    </div>
                ) : (
                    <EmpleadoForm
                        schema={createEmpleadoSchema}
                        onSubmit={handleEmpleadoCreate}
                        defaultValues={{}}
                        isSubmitting={isPending}
                        onCancel={() => closeModal("createEmpleado")}
                    />
                )}
            </div>
        </Modal>
    );
}

export default React.memo(CreateEmpleadoModal);