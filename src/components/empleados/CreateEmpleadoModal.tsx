import { Modal } from "../ui/modal";
import EmpleadoForm from "./EmpleadoForm";
import { useModalContext } from "../../context/ModalContext.tsx";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUser } from "../../api/EmpleadoApi";
import { Empleado, EmpleadoPasUser } from "../../types/empleados";
import { toast } from "react-toastify";
import React, { useState } from "react";
import CopyButton from "../ui/copy/CopyToClipboard.tsx";

function CreateEmpleadoModal() {
    const { modals, closeModal } = useModalContext();
    const isOpen = modals["createEmpleado"];
    const queryClient = useQueryClient();
    const [credenciales, setCredenciales] = useState<EmpleadoPasUser | null>(null);

    const { mutate, isPending } = useMutation({
        mutationFn: createUser,
        onSuccess: async (data) => {
            await queryClient.invalidateQueries({ queryKey: ["empleados"] });
            toast.success("Usuario creado correctamente");
            setCredenciales(data);
            setTimeout(() => {
                closeModal("createEmpleado");
            }, 10000);
        },
        onError: (error: Error) => {
            toast.error(error.message);
        },
    });

    const handleEmpleadoCreate = (formData: Empleado) => {
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