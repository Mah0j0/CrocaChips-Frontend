import Button from "../../../shared/ui/button/Button";
import { TrashBinIcon } from "../../../shared/icons";
import { NuevoDetalle } from "../model/type";

type Props = {
    detalles: NuevoDetalle[];
    onEliminar: (index: number) => void;
};

export default function DetallesList({ detalles, onEliminar }: Props) {
    if (detalles.length === 0) return null;

    return (
        <div className="space-y-4">
            <h4 className="font-semibold text-lg dark:text-white">Productos agregados:</h4>
            <ul className="space-y-3">
                {detalles.map((detalle, index) => (
                    <li
                        key={index}
                        className="flex justify-between items-center p-4 border rounded-xl shadow-sm bg-white dark:bg-slate-800 dark:text-white"
                    >
                        <div className="space-y-1 text-sm">
                            <p><span className="font-medium">Producto:</span> {detalle.producto_nombre}</p>
                            <p><span className="font-medium">Cantidad:</span> {detalle.cantidad}</p>
                            <p><span className="font-medium">Precio Unitario:</span> Bs: {detalle.precio_unitario}</p>
                            <p><span className="font-medium">Subtotal:</span> Bs: {detalle.subtotal}</p>
                        </div>
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => onEliminar(index)}
                            startIcon={<TrashBinIcon className="size-4" />}
                            className="ml-4"
                        >
                            Eliminar
                        </Button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
