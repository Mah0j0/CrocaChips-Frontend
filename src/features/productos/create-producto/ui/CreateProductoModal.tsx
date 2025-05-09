import React from "react";
import { Modal } from "../../../../shared/ui/modal";
import { useModalContext } from "../../../../shared/context/ModalContext.tsx";
import { useCreateProducto } from "../hooks/useCreateProducto.ts";
import { Producto } from "../../../../entities/productos";
import ProductoForm from "../../../../entities/productos/ui/ProductoForm.tsx";
import { productoCreateSchema } from "../model/schema.ts";

function CreateProductoModal() {
    const { modals, closeModal } = useModalContext();
    const isOpen = modals["createProducto"];

    const { mutate, isPending } = useCreateProducto(() => {
        setTimeout(() => closeModal("createProducto"), 10000);
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
                    schema={productoCreateSchema}
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