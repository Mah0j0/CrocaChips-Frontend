import React from "react";
import { Modal } from "../../../../shared/ui/modal";
import { useModalContext } from "../../../../app/providers/ModalContext.tsx";
import { useCreateProducto } from "../hooks/useCreateProducto.ts";
import ProductoForm from "../../../../entities/productos/ui/ProductoForm.tsx";
import { productoCreateSchema } from "../model/schema.ts";
import {ProductosCreate} from "../../../../entities/productos";


const CreateProductoModal = () => {
    const { modals, closeModal } = useModalContext();
    const isOpen = modals["createProducto"];

    const { mutate, isPending } = useCreateProducto(() => {
        // Cierra el modal tras 3 segundos de éxito (mejor UX que 10 segundos)
        setTimeout(() => closeModal("createProducto"), 3000);
    });

    const handleProductoCreate = (formData: ProductosCreate) => {
        mutate(formData);
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={() => closeModal("createProducto")}
            className="max-w-[700px] m-4"
        >
            <div className="no-scrollbar w-full overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
                <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
                    Crear Nuevo Producto
                </h4>
                <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
                    Completa la información para registrar un nuevo producto
                </p>

                <ProductoForm
                    schema={productoCreateSchema}
                    onSubmit={handleProductoCreate}
                    defaultValues={{}} // Puede omitirse si el formulario ya lo tiene como default
                    isSubmitting={isPending}
                    onCancel={() => closeModal("createProducto")}
                />
            </div>
        </Modal>
    );
};

export default React.memo(CreateProductoModal);
