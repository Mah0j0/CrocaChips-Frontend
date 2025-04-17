import { Modal } from "../ui/modal";
import EmpleadoForm from "./EmpleadoForm";
import { useModalContext } from "../../context/ModalContext.tsx"; // Reemplaza useModal por el contexto global
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { editUser } from "../../api/EmpleadoApi";
import { Empleado } from "../../types/empleados";
import { toast } from "react-toastify";
import React from "react";

function EditEmpleadoModal() {
    const { modals, closeModal } = useModalContext();
    const isOpen = modals["editEmpleado"];
    const queryClient = useQueryClient();
    const data = queryClient.getQueryData<Empleado>(["empleado"]);


    const { mutate, isPending } = useMutation({
        mutationFn: editUser,
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["empleado"] });
            toast.success("Perfil actualizado correctamente");
            closeModal("editEmpleado");
        },
        onError: (error: Error) => {
            toast.error(error.message);
        },
    });

    const handleEmpleadoEdit = (formData: Empleado) => {
        mutate(formData);
    };

    if (!data) {
        return null;
    }

    return (
        <Modal isOpen={isOpen} onClose={() => closeModal("editEmpleado")} className="max-w-[700px] m-4">
            <div className="no-scrollbar w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
                <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
                    Editar Información Personal
                </h4>
                <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
                    Mantén actualizada tu información personal
                </p>

                <EmpleadoForm
                    onSubmit={handleEmpleadoEdit}
                    defaultValues={data}
                    isSubmitting={isPending}
                    onCancel={() => closeModal("editEmpleado")}
                    disabledFields={[
                        "usuario",
                        "carnet",
                        ...(data?.rol !== "Administrador" ? ["rol"] as (keyof Empleado)[] : []),
                    ]}
                />
            </div>
        </Modal>
    );
}

export default React.memo(EditEmpleadoModal);