import { Modal } from "../../../../shared/ui/modal";
import EmpleadoForm from "../../../../entities/empleados/ui/EmpleadoForm.tsx";
import { useModalContext } from "../../../../app/providers/ModalContext.tsx";
import { Empleado } from "../../../../entities/empleados";
import {useEditEmpleado} from "../hooks/useEditEmpleado.ts";
import {empleadoSchema} from "../model/schema.ts";
import {default as DeleteEmpleadoButton} from "../../delete-empleado";
import React from "react";

function EditEmpleadoModal() {
    const { modals, closeModal, selectedData} = useModalContext();
    const isOpen = modals["editEmpleado"];
    const data = selectedData;

    const { mutate, isPending } = useEditEmpleado(() => {
        closeModal("editEmpleado");
    });

    const handleEmpleadoEdit = (formData: Empleado) => {
        formData.id = selectedData.id;
        mutate(formData);
    };

    if (!data) return null;

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
                    schema={empleadoSchema}
                    onSubmit={handleEmpleadoEdit}
                    defaultValues={data}
                    isSubmitting={isPending}
                    onCancel={() => closeModal("editEmpleado")}
                    disabledFields={[
                        "usuario",
                        "carnet",
                        ...(data?.rol !== "Administrador" ? ["rol"] as (keyof Empleado)[] : []),
                    ]}
                    children={
                        <DeleteEmpleadoButton
                            empleado={data}
                            onSuccess={()=>{
                                closeModal("editEmpleado");
                            }}
                        />
                    }
                />
            </div>
        </Modal>
    );
}

export default React.memo(EditEmpleadoModal);