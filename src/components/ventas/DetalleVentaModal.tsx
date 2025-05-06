// React 
import React, { useState } from "react";
// Componentes UI
import { Modal } from "../ui/modal";
import Button from "../ui/button/Button";
import Badge from "../ui/badge/Badge";
// Contextos y React Query
import { useModalContext } from "../../context/ModalContext";
import { useQuery } from "@tanstack/react-query";
// Notificaciones
import { toast } from "react-toastify";
// Funciones del API
import { getDetallesVenta } from "../../api/VentasApi";
// Añadir importación del tipo DetalleVenta
import { DetalleVenta } from "../../types/ventas";

function DetalleVentaModal() {
    // Contexto del modal y datos seleccionados
    const { modals, closeModal, selectedData } = useModalContext(); // Acceso al contexto
    const isOpen = modals["detalleVenta"]; // Verifica si está abierto
    const [error, setError] = useState<string | null>(null);

    const venta = selectedData?.venta; // Accede a los datos de la venta seleccionada

    // Consulta para obtener detalles de venta
    // Modificar la línea 28 (useQuery)
    const { data: detalles, isLoading } = useQuery<DetalleVenta[]>({
        queryKey: ["detallesVenta", venta?.id_venta],
        queryFn: () => getDetallesVenta(venta?.id_venta),
        enabled: !!venta?.id_venta && isOpen,
        onError: (error: Error) => {
            toast.error(error.message || "Error al obtener los detalles de la venta");
            setError("Error al obtener los detalles de la venta");
        },
    });

    // Si no hay datos de venta, no renderiza nada
    if (!venta) {
        return null;
    }

    return (
        <Modal isOpen={isOpen} onClose={() => closeModal("detalleVenta")} className="max-w-[900px] m-4">

            {/* Contenedor principal del modal */}
            <div className="no-scrollbar w-full max-w-[900px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
                {/* Encabezado del modal */}
                <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
                    Detalles de la Venta #{venta.id_venta}
                </h4>
                <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
                    Información completa de la venta
                </p>

                {/* Errores si existen */}
                {error && (
                    <div className="mb-4 rounded-md bg-red-50 p-3 dark:bg-red-900/30">
                        <p className="text-sm text-red-700 dark:text-red-400">{error}</p>
                    </div>
                )}

                {/* Sección de información general de la venta */}
                <div className="mb-4">
                    <p><strong>Venta ID:</strong> {venta.id_venta}</p>
                    <p><strong>Cliente:</strong> {venta.cliente_nombre}</p>
                    <p><strong>Vendedor:</strong> {venta.vendedor_nombre}</p>
                    <p><strong>Fecha:</strong> {venta.fecha}</p>
                    <p><strong>Total:</strong> {venta.precio_total}</p>
                    <p>
                        <strong>Estado:</strong>{" "}
                        <Badge
                            size="md"
                            color={venta.estado ? "success" : "warning"}
                        >
                            {venta.estado ? "Confirmada" : "Pendiente"}
                        </Badge>
                    </p>
                </div>

                {/* Sección de productos */}
                <h5 className="mb-3 text-lg font-medium text-gray-800 dark:text-white/90">
                    Productos
                </h5>

                {isLoading ? (
                    <p className="text-center text-gray-500 dark:text-gray-400">Cargando detalles...</p>
                ) : (
                    <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead className="bg-gray-50 dark:bg-gray-800">
                                <tr>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase dark:text-gray-400">
                                        Producto
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase dark:text-gray-400">
                                        Cantidad
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-900 dark:divide-gray-700">
                                {detalles?.map((detalle, index) => (
                                    <tr key={index}>
                                        <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-300">
                                            {detalle.producto_nombre || "Producto"}
                                        </td>
                                        <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-300">
                                            {detalle.cantidad}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                <div className="mt-8 flex justify-end gap-3">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => closeModal("detalleVenta")}
                    >
                        Cerrar
                    </Button>
                </div>
            </div>
        </Modal>
    );
}

export default React.memo(DetalleVentaModal);