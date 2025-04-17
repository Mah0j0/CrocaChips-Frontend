import { Modal } from "../ui/modal";
import EmpleadoForm from "./EmpleadoForm";
import { useModalContext } from "../../context/ModalContext.tsx";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUser } from "../../api/EmpleadoApi";
import { Empleado } from "../../types/empleados";
import { toast } from "react-toastify";
import React from "react";

function CreateEmpleadoModal() {
    const { modals, closeModal } = useModalContext();
    const isOpen = modals["createEmpleado"];
    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: createUser,
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["empleados"] });
            toast.success("Usuario creado correctamente");
            closeModal("createEmpleado");
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
                    Crear Nuevo Usuario
                </h4>
                <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
                    Completa la información para registrar un nuevo usuario
                </p>

                <EmpleadoForm
                    onSubmit={handleEmpleadoCreate}
                    defaultValues={{}}
                    isSubmitting={isPending}
                    onCancel={() => closeModal("createEmpleado")}
                />
            </div>
        </Modal>
    );
}

export default React.memo(CreateEmpleadoModal);