// Tipos
import { Movimiento } from "../../../../entities/movimientos";
// Componentes
import MovimientoForm from '../../../../entities/movimientos/ui/MovimientoForm.tsx';
import React from "react";
import { useModalContext } from "../../../../app/providers/ModalContext.tsx";
import { BoxIcon } from "../../../../shared/icons";
import { Modal } from '../../../../shared/ui/modal';
import { useEditRecepcion } from "../hooks/useEditRecepcion.ts";
import { useDeleteRecepcion } from "../../delete-recepcion/hooks/useDeleteRecepcion.ts";
import { useProducts } from "../../../../entities/productos";
import { useEmpleados } from "../../../../entities/empleados";

// Editar Modal
function EditRecepcionModal() {
    // Apertura/cierre del modal
    const { modals, closeModal, selectedData } = useModalContext();
    const isOpen = modals["editRecepcion"];
    const data: Movimiento = selectedData; // datos de la tabla

    // Hooks para obtener datos
    const { data: productos } = useProducts();
    const { data: empleados } = useEmpleados();

    // Hook para editar
    const { mutate, isPending } = useEditRecepcion(() => {
        setTimeout(() => closeModal("editRecepcion"), 100);
    });

    // Hook para eliminar
    const { mutate: deleteRecepcion } = useDeleteRecepcion(() => {
        closeModal("editRecepcion");
    });
    const handleDelete = () => {
        deleteRecepcion(data);
    };

    // Función que maneja el envío del formulario
    const handleRecepcionEdit = (formData: Movimiento) => {
        // Obtener los datos actualizados del vendedor y producto
        const vendedorSeleccionado = empleados?.find(e => e.id === formData.vendedor);
        const productoSeleccionado = productos?.find(p => p.id_producto === formData.producto);

        const recepcionData = {
            ...formData,
            id_movimiento: data.id_movimiento,
            tipo_movimiento: data.tipo_movimiento,
            cantidad_volatil: data.cantidad_volatil || 0,
            vendedor_nombre: vendedorSeleccionado?.nombre || '',
            producto_nombre: productoSeleccionado?.nombre || ''
        };
        mutate(recepcionData);
    };

    // Renderizado del modal
    if (!data) {
        return null;
    }
    return (
        <Modal isOpen={isOpen} onClose={() => closeModal("editRecepcion")} className="max-w-[700px] m-4">
            <div className="no-scrollbar w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
                <div className="mb-2 flex items-center">
                    <h4 className="text-2xl font-semibold text-gray-800 dark:text-white/90">
                        Editar Recepción
                    </h4>
                    <BoxIcon className="size-7 text-gray-800 dark:text-white/90 ml-2" />
                </div>
                <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
                    Actualiza la información de la recepción según sea necesario.
                </p>

                {/* Formulario de recepción */}
                <MovimientoForm
                    onSubmit={handleRecepcionEdit}
                    defaultValues={data}
                    isSubmitting={isPending}
                    onCancel={() => closeModal("editRecepcion")}
                    disabledFields={["id_movimiento"]}
                    showDeleteButton={true}
                    onDelete={handleDelete}
                />
            </div>
        </Modal>
    );
}
export default React.memo(EditRecepcionModal);