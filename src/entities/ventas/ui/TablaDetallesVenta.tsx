import { Detalle } from "../model/type.ts";
import BasicTableOne from "../../../shared/ui/table/BasicTableOne.tsx";
import { TableCell } from "../../../shared/ui/table";

type Props = { detalles: Detalle[] };

export default function TablaDetallesVenta({ detalles }: Props) {
    const headers = ["Producto", "Cantidad", "Precio Unitario", "Subtotal"];

    return (
        <BasicTableOne
            isHover={false}
            isHederBold={true}
            headers={headers}
            data={detalles}
            getKey={(detalle) => detalle.id_detalle}
            renderRow={(detalle) => (
                <>
                    <TableCell className="px-4 py-4 text-gray-500 text-theme-sm dark:text-gray-400">
                        {detalle.producto_nombre}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                        {detalle.cantidad}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                        Bs. {detalle.precio_unitario}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                        Bs. {detalle.subtotal}
                    </TableCell>
                </>
            )}
        />
    );
}