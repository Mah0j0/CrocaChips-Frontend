import { Producto } from "../../entities/productos/model/type.ts";
import { createProducto } from "../../entities/productos/api/ProductosApi.ts";
import ProductoForm from "./ProductoForm.tsx";
import { Modal } from "../../shared/ui/modal";
import { BoxIcon } from "../../shared/icons/index.ts";
import { useModalContext } from "../../shared/context/ModalContext.tsx";
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
            }, 1000);
        },
        onError: (error: Error) => {
            toast.error(error.message);
        },
    });

    const handleProductoCreate = (formData: Producto) => {
        const productoData = {
            ...formData, 
            //precio_unitario: String(formData.precio_unitario), // Convertir a string
            habilitado: true  // Asegura que este campo se envíe
        };
        mutate(productoData);
    };

    return (
        <Modal isOpen={isOpen} onClose={() => closeModal("createProducto")} className="max-w-[700px] m-4">
            <div className="no-scrollbar w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
                <div className="mb-2 flex items-center">
                    <h4 className="text-2xl font-semibold text-gray-800 dark:text-white/90">
                        Crear Nuevo Producto
                    </h4>
                    <BoxIcon className="size-7 text-gray-800 dark:text-white/90 ml-2" />
                </div>
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
