import {Detalle} from "../model/type.ts";

type Props = { detalles: Detalle[] };

export default function TablaDetallesVenta({ detalles }: Props) {
    return (
        <table className="w-full border mt-4 text-sm">
            <thead className="bg-gray-100 dark:bg-gray-700 text-left">
            <tr>
                <th className="p-2">Producto</th>
                <th className="p-2">Cantidad</th>
                <th className="p-2">Precio Unitario</th>
                <th className="p-2">Subtotal</th>
            </tr>
            </thead>
            <tbody>
            {detalles.map((detalle) => (
                <tr key={detalle.id_detalle}>
                    <td className="p-2">{detalle.producto_nombre}</td>
                    <td className="p-2">{detalle.cantidad}</td>
                    <td className="p-2">${detalle.precio_unitario}</td>
                    <td className="p-2">${detalle.subtotal}</td>
                </tr>
            ))}
            </tbody>
        </table>
    );
}
