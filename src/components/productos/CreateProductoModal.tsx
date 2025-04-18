import { Producto } from "../../types/productos.ts";
import { createProducto } from "../../api/ProductosApi.ts";
import ProductoForm from "./ProductoForm.tsx";
import { Modal } from "../ui/modal";
import { useModalContext } from "../../context/ModalContext.tsx";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import React from "react";

function CreateProductoModal() {
    const { modals, closeModal } = useModalContext();
    const isOpen = modals["createProducto"];
    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: createProducto,
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["productos"] });
            toast.success("Producto creado correctamente");
            setTimeout(() => {
                closeModal("createProducto");
            }, 1000); // Cambié 10000 ms (10s) a 1000 ms (1s) por usabilidad
        },
        onError: (error: Error) => {
            toast.error(error.message);
        },
    });

    const handleProductoCreate = (formData: Producto) => {
        mutate(formData);
    };

    return (
        <Modal isOpen={isOpen} onClose={() => closeModal("createProducto")} className="max-w-[700px] m-4">
            <div className="no-scrollbar w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
                <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
                    Crear Nuevo Producto
                </h4>
                <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
                    Completa la información para registrar un nuevo producto
                </p>

                <ProductoForm
                    onSubmit={handleProductoCreate}
                    defaultValues={{}}
                    isSubmitting={isPending}
                    onCancel={() => closeModal("createProducto")}
                />
            </div>
        </Modal>
    );
}

export default React.memo(CreateProductoModal);
