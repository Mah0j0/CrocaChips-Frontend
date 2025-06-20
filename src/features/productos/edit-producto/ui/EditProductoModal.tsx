import React from "react";
import {useModalContext} from "../../../../app/providers/ModalContext.tsx";
import {Producto, ProductoForm} from "../../../../entities/productos";
import {Modal} from "../../../../shared/ui/modal";
import { productoCreateSchema } from "../model/schema.ts";
import { default as DeleteButton} from "../../delete-producto";
import {useEditProducto} from "../hooks/useEditProducto.ts";


function EditProductoModal() {
    const { modals, closeModal, selectedData } = useModalContext();
    const isOpen = modals["editProducto"];
    const data:Producto = selectedData;

    const { mutate, isPending } = useEditProducto(() => {
        closeModal("editProducto");
    });

    const handleProductoEdit = (formData: Producto) => {
        formData.id_producto = data.id_producto; // Asegura que el ID del producto se mantenga
        formData.precio_unitario = Number(formData.precio_unitario);
        formData.stock = Number(formData.stock);
        formData.tiempo_vida = Number(formData.tiempo_vida);
        console.log(formData);
        mutate(formData);
    };

    if (!data) return null;

    return (
        <Modal isOpen={isOpen} onClose={() => closeModal("editProducto")} className="max-w-[700px] m-4">
            <div className="no-scrollbar w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
                <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
                    Editar Información del Producto
                </h4>
                <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
                    Actualiza los datos del producto según sea necesario.
                </p>

                <ProductoForm
                    schema={productoCreateSchema}
                    onSubmit={handleProductoEdit}
                    defaultValues={data}
                    isSubmitting={isPending}
                    onCancel={() => closeModal("editProducto")}
                    children={
                        <DeleteButton
                            producto={data}
                            onSuccess={() => {
                                closeModal("editProducto");
                            }}
                        />
                    }
                />
            </div>
        </Modal>
    );
}

export default React.memo(EditProductoModal);