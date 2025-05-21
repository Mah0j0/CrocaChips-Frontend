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
        <div>
            <h4 className="font-semibold mb-2 dark:text-white/90">Productos agregados:</h4>
            <ul className="space-y-2">
                {detalles.map((detalle, index) => (
                    <li key={index} className="flex justify-between items-center dark:text-white/90">
                        <span>Producto ID: {detalle.producto}, Cantidad: {detalle.cantidad}</span>
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => onEliminar(index)}
                            startIcon={<TrashBinIcon className="size-4" />}
                        >
                            Eliminar
                        </Button>
                    </li>
                ))}
            </ul>
        </div>
    );
}