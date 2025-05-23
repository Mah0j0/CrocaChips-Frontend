import { TableCell } from "../../../shared/ui/table";
import Badge from "../../../shared/ui/badge/Badge.tsx";
import { HorizontaLDots } from "../../../shared/icons";
import BasicTableOne from "../../../shared/ui/table/BasicTableOne.tsx";
import { Venta } from "../../../entities/ventas";

type Props = {
    ventas: Venta[];
    onVerDetalles: (venta: Venta) => void;
};

export default function VentaTable({ ventas, onVerDetalles }: Props) {
    const headers = [
        "Cliente",
        "Vendedor",
        "Fecha",
        "Total",
        "Estado",
        "Acciones"
    ];

    return (
        <BasicTableOne
            headers={headers}
            data={ventas}
            getKey={(venta) => venta.id_venta}
            renderRow={(venta) => (
                <>
                    <TableCell className="px-4 py-4 text-gray-500 text-theme-sm dark:text-gray-400">
                        {venta.cliente_nombre}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                        {venta.vendedor_nombre}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                        {venta.fecha}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                        {venta.precio_total} Bs
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        <Badge
                            size="sm"
                            color={venta.estado ? "success" : "warning"}
                        >
                            {venta.estado ? "Confirmada" : "Pendiente"}
                        </Badge>
                    </TableCell>
                    <TableCell className="px-8">
                        <button
                          onClick={() => onVerDetalles(venta)}
                          className="text-gray-400"
                          title="Más opciones"
                          >
                          <HorizontaLDots className="w-7 h-7" />
                          </button>
                    </TableCell>
                </>
            )}
        />
    );
}