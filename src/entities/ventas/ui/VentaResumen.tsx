import { Venta } from "../model/type.ts";
import { FaUser, FaUserTie, FaCalendarAlt, FaDollarSign } from "react-icons/fa";

type Props = { venta: Venta };

export default function VentaResumen({ venta }: Props) {
    return (
        <div className="mb-6 bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-lg text-gray-900 dark:text-gray-300">
            <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Resumen de Venta</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                    <FaUser className="text-gray-500 dark:text-gray-400" />
                    <p><strong>Cliente:</strong> {venta.cliente_nombre}</p>
                </div>
                <div className="flex items-center space-x-3">
                    <FaUserTie className="text-gray-500 dark:text-gray-400" />
                    <p><strong>Vendedor:</strong> {venta.vendedor_nombre}</p>
                </div>
                <div className="flex items-center space-x-3">
                    <FaCalendarAlt className="text-gray-500 dark:text-gray-400" />
                    <p><strong>Fecha:</strong> {new Date(venta.fecha).toLocaleDateString()}</p>
                </div>
                <div className="flex items-center space-x-3">
                    <FaDollarSign className="text-gray-500 dark:text-gray-400" />
                    <p><strong>Total:</strong> Bs. {venta.precio_total}</p>
                </div>
            </div>
        </div>
    );
}