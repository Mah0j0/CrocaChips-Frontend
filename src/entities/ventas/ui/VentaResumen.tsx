import {Venta} from "../model/type.ts";

type Props = { venta: Venta };

export default function VentaResumen({ venta }: Props) {
    return (
        <div className="mb-6">
            <p><strong>Cliente:</strong> {venta.cliente_nombre}</p>
            <p><strong>Vendedor:</strong> {venta.vendedor_nombre}</p>
            <p><strong>Fecha:</strong> {new Date(venta.fecha).toLocaleDateString()}</p>
            <p><strong>Total:</strong> ${venta.precio_total}</p>
        </div>
    );
}
