import { Producto } from "../../entities/productos/model/type.ts";
import { editProducto } from "../../entities/productos/api/ProductosApi.ts";
import ProductoForm from "./ProductoForm.tsx";
import { Modal } from "../../shared/ui/modal";
import { BoxIcon } from "../../shared/icons/index.ts";
import { useModalContext } from "../../shared/context/ModalContext.tsx";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import React from "react";

function EditProductoModal() {
    const { modals, closeModal, selectedData } = useModalContext();
    const isOpen = modals["editProducto"];
    const queryClient = useQueryClient(); 
    const data = selectedData; //para datos de la tabla

    const { mutate, isPending } = useMutation({
        mutationFn: editProducto,
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["productos"] });
            toast.success("Producto actualizado correctamente");
            setTimeout(() => {
                closeModal("editProducto");
            }, 1000);
        },
        onError: (error: Error) => {
            toast.error(error.message);
        },
    });

    const handleProductoEdit = (formData: Producto) => {
        const productoData = {
            ...formData, 
            habilitado: true  // Asegura que este campo se envíe
        };
        mutate(productoData);
    };
    if (!data) {
        return null;
    }
    return (
        <Modal isOpen={isOpen} onClose={() => closeModal("editProducto")} className="max-w-[700px] m-4">
            <div className="no-scrollbar w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
                <div className="mb-2 flex items-center">
                    <h4 className="text-2xl font-semibold text-gray-800 dark:text-white/90">
                        Editar Producto
                    </h4>
                    <BoxIcon className="size-7 text-gray-800 dark:text-white/90 ml-2" />
                </div>
                <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
                    Actualiza la información del producto según sea necesario.
                </p>

                <ProductoForm
                    onSubmit={handleProductoEdit}
                    defaultValues={data}
                    isSubmitting={isPending}
                    onCancel={() => closeModal("editProducto")}
                    disabledFields={["id_producto"]} // Campos que no se pueden editar
                />
            </div>
        </Modal>
    );
}

export default React.memo(EditProductoModal);
