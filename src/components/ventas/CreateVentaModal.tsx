// React 
import React, { useState } from "react";
// Componentes UI
import { Modal } from "../ui/modal";
// Contextos y React Query
import { useModalContext } from "../../context/ModalContext";
import { useQueryClient, useMutation } from "@tanstack/react-query";
// Notificaciones
import { toast } from "react-toastify";
// Componentes internos 
import DetalleVentaForm from "./DetalleVentaForm";
// Funciones del API
import { createVenta } from "../../api/VentasApi";

function CreateVentaModal() {
    // Contexto del modal y estado
    const { modals, closeModal } = useModalContext(); // Acceso al contexto
    const isOpen = modals["createVenta"]; // Verifica si está abierto
    const queryClient = useQueryClient();
    const [error, setError] = useState<string | null>(null);

    // Registrar una nueva venta
    const { mutate, isPending } = useMutation({
        mutationFn: createVenta,
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["ventas"] });
            toast.success("Venta registrada correctamente");
            setTimeout(() => {
                closeModal("createVenta");
            }, 1000);
        },
        onError: (error: Error) => {
            toast.error(error.message || "Error al registrar la venta");
            setError("Error al registrar la venta"); // Establece mensaje de error
        },
    });

    const handleVentaCreate = (formData: any) => {
        mutate(formData);
    };

    return (
        <Modal isOpen={isOpen} onClose={() => closeModal("createVenta")} className="max-w-[900px] m-4">
            <div className="no-scrollbar w-full max-w-[900px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
                {/* Encabezado del modal */}
                <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
                    Registrar Nueva Venta
                </h4>
                <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
                    Completa la información para registrar una nueva venta
                </p>

                {/* Errores si existen */}
                {error && (
                    <div className="mb-4 rounded-md bg-red-50 p-3 dark:bg-red-900/30">
                        <p className="text-sm text-red-700 dark:text-red-400">{error}</p>
                    </div>
                )}

                <DetalleVentaForm
                    onSubmit={handleVentaCreate}
                    defaultValues={{}}
                    isSubmitting={isPending}
                    onCancel={() => closeModal("createVenta")}
                />
            </div>
        </Modal>
    );
}

export default React.memo(CreateVentaModal);