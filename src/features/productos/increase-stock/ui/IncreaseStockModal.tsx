import React from "react";
import { useModalContext } from "../../../../shared/context/ModalContext.tsx";
import { Producto } from "../../../../entities/productos";
import { Modal } from "../../../../shared/ui/modal";
import StockForm from "../../../../entities/productos/ui/StockForm.tsx";
import { useIncreaseStock } from "../hooks/useIncreaseStock.ts";

function IncreaseStockModal() {
    const { modals, closeModal, selectedData } = useModalContext();
    const isOpen = modals["increaseStock"];
    const producto = selectedData as Producto;

    const { mutate, isPending } = useIncreaseStock(() => {
        closeModal("increaseStock");
    });

    const handleSubmit = (cantidad: number) => {
        mutate({
            id: producto.id_producto,
            cantidad: Number(cantidad),
        });
    };

    if (!producto) return null;

    return (
        <Modal isOpen={isOpen} onClose={() => closeModal("increaseStock")} className="max-w-[700px] m-4">
            <div className="no-scrollbar w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
                <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
                    Aumentar Stock
                </h4>
                <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
                    Ingresa la cantidad de stock que deseas <b>aumentar</b> para el producto seleccionado.
                </p>

                <StockForm
                    onSubmit={handleSubmit}
                    isSubmitting={isPending}
                    onCancel={() => closeModal("increaseStock")}
                    currentStock={producto.stock}
                />
            </div>
        </Modal>
    );
}

export default React.memo(IncreaseStockModal);