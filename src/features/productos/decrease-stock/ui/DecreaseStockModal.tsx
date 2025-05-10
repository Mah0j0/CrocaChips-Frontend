import React from "react";
import { useModalContext } from "../../../../app/providers/ModalContext.tsx";
import { Producto } from "../../../../entities/productos";
import { Modal } from "../../../../shared/ui/modal";
import StockForm from "../../../../entities/productos/ui/StockForm.tsx";
import { useDecreaseStock } from "../hooks/useDecreaseStock.ts";

function DecreaseStockModal() {
    const { modals, closeModal, selectedData } = useModalContext();
    const isOpen = modals["decreaseStock"];
    const producto = selectedData as Producto;

    const { mutate, isPending } = useDecreaseStock(() => {
        closeModal("decreaseStock");
    });

    const handleSubmit = (cantidad: number) => {
        mutate({
            id: producto.id_producto,
            cantidad: Number(cantidad),
        });
    };

    if (!producto) return null;

    return (
        <Modal isOpen={isOpen} onClose={() => closeModal("decreaseStock")} className="max-w-[700px] m-4">
            <div className="no-scrollbar w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
                <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
                    Reducir Stock
                </h4>
                <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
                    Ingresa la cantidad de stock que deseas <b>reducir</b> para el producto seleccionado.
                </p>

                <StockForm
                    onSubmit={handleSubmit}
                    isSubmitting={isPending}
                    onCancel={() => closeModal("decreaseStock")}
                    currentStock={producto.stock}
                />
            </div>
        </Modal>
    );
}

export default React.memo(DecreaseStockModal);