import { Producto } from "../../entities/productos/model/type.ts";
import { decreaseStock } from "../../entities/productos/api/ProductosApi.ts";
import { useModalContext } from "../../shared/context/ModalContext.tsx";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { Modal } from "../../shared/ui/modal";
import StockForm from "./StockForm.tsx";
import React from "react";

//funcion para aumentar stock
function DecreaseStockModal() {
    const { modals, closeModal, selectedData } = useModalContext();
    const isOpen = modals["decreaseStock"];
    const queryClient = useQueryClient();
    
    //Reduce stock
    const { mutate, isPending } = useMutation({
        mutationFn: decreaseStock,
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["productos"] });
            toast.success("Producto actualizado correctamente");
            closeModal("decreaseStock");
        },
        onError: (error: Error) => {
            toast.error(error.message);
        },
    });
    
    //validación
    if (!isOpen || !selectedData) {
        return null;
    }
    const producto = selectedData as Producto;

    const handleSubmit = (cantidad: number) => {
        mutate({
            id: producto.id_producto,
            cantidad: Number(cantidad)
        });
    };

    return (
        <Modal isOpen={isOpen} onClose={() => closeModal("decreaseStock")} className="max-w-[700px] m-4">
            <div className="no-scrollbar w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
                <h4 className="text-2xl font-semibold text-gray-800 dark:text-white/90">
                    Reducir Stock
                </h4>
                <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
                    Ingresa la cantidad de stock que deseas <b>reducir</b> para el producto seleccionado.
                </p>
                {/* Mostrar información del producto sólo si existe */}
                {producto && (
                    <>
                        <hr className="my-4 border-gray-300 dark:border-gray-700" />
                        <p className="mb-4 text-sm text-gray-700 dark:text-gray-300">
                            Producto: <b>{producto.nombre}</b> | Stock actual: <b>{producto.stock}</b>
                        </p>
                        <hr className="my-4 border-gray-300 dark:border-gray-700" />
                    </>
                )}

                <StockForm
                    onSubmit={handleSubmit}
                    isSubmitting={isPending}
                    onCancel={() => closeModal("decreaseStock")}
                    currentStock={producto?.stock} // Pasa el stock como prop opcional
                />
            </div>
        </Modal>
    );
}

export default React.memo(DecreaseStockModal);