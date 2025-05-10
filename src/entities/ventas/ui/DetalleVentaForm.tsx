import { useEffect, useReducer, useCallback, useState } from "react";
import Button from "../../../shared/ui/button/Button";
import { TrashBinIcon } from "../../../shared/icons";
import { useForm } from "react-hook-form";
import { useClientes } from "../../clientes";
import { NuevaVenta, NuevoDetalle } from "../model/type";
import { FormField } from "../../../shared/ui/form/FormField";
import ProductoSearch from "../../productos/ui/ProductoSearch";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type Props = {
    onSubmit: (data: NuevaVenta) => void;
    defaultValues?: Partial<NuevaVenta>;
    isSubmitting?: boolean;
    onCancel?: () => void;
    disabledFields?: (keyof NuevoDetalle)[];
    schema: z.ZodSchema;
};

type DetallesAction =
    | { type: "ADD"; payload: NuevoDetalle }
    | { type: "REMOVE"; payload: number };

function detallesReducer(state: NuevoDetalle[], action: DetallesAction): NuevoDetalle[] {
    switch (action.type) {
        case "ADD":
            return [...state, action.payload];
        case "REMOVE":
            return state.filter((_, index) => index !== action.payload);
        default:
            return state;
    }
}

export default function DetalleVentaForm({
     onSubmit,
     defaultValues = {},
     isSubmitting = false,
     onCancel,
     disabledFields = [],
     schema,
}: Props) {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<NuevaVenta>({
        resolver: zodResolver(schema),
        defaultValues: {
            cliente: 0,
            detalles: [],
        },
    });

    const [cantidad, setCantidad] = useState<number>(1);
    const [detalles, dispatch] = useReducer(detallesReducer, []);
    const { data: clientes } = useClientes();

    useEffect(() => {
        if (defaultValues) {
            reset(defaultValues);
        }
    }, [defaultValues, reset]);

    const isDisabled = (field: keyof NuevoDetalle) => disabledFields.includes(field);

    const handleAgregarDetalle = useCallback(
        (producto: { id: number; nombre: string; precio: number }) => {
            if (cantidad <= 0 || isNaN(cantidad)) {
                alert("La cantidad debe ser mayor a 0.");
                return;
            }

            const subtotal = cantidad * producto.precio;
            console.log("subtotal", subtotal);

            const nuevoDetalle: NuevoDetalle = {
                producto: producto.id,
                cantidad,
            };

            dispatch({ type: "ADD", payload: nuevoDetalle });
            setCantidad(1);
        },
        [cantidad]
    );

    const handleEliminarDetalle = useCallback((index: number) => {
        dispatch({ type: "REMOVE", payload: index });
    }, []);

    const handleFormSubmit = (data: NuevaVenta) => {
        const ventaData: NuevaVenta = {
            cliente: data.cliente,
            detalles: detalles,
        };

        onSubmit(ventaData);
    };

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <FormField
                    label="Cliente"
                    name="cliente"
                    register={register}
                    errors={errors}
                    options={clientes?.map((cliente) => ({
                        value: String(cliente.id_cliente),
                        label: cliente.nombre,
                    }))}
                    type="select"
                    disabled={isDisabled("producto")}
                />
            </div>

            <div className="space-y-4">
                <h4 className="text-lg font-medium text-gray-800 dark:text-white/90">
                    Detalles de la Venta
                </h4>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    <ProductoSearch
                        onSelect={() => handleAgregarDetalle}
                    />
                    <input
                        type="number"
                        value={cantidad}
                        min={1}
                        onChange={(e) => setCantidad(Number(e.target.value))}
                        className="input"
                    />
                </div>
            </div>

            {detalles.length > 0 && (
                <div className="mt-4">
                    <h4 className="font-semibold mb-2">Productos agregados:</h4>
                    <ul className="list-disc pl-6">
                        {detalles.map((detalle, index) => (
                            <li key={index} className="flex justify-between items-center mb-2">
                                <span>
                                    Producto ID: {detalle.producto}, Cantidad: {detalle.cantidad}
                                </span>
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleEliminarDetalle(index)}
                                    startIcon={<TrashBinIcon className="size-4" />}
                                >
                                    Eliminar
                                </Button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            <div className="flex items-center gap-3 justify-end mt-6">
                {onCancel && (
                    <Button type="button" variant="outline" size="sm" onClick={onCancel}>
                        Cancelar
                    </Button>
                )}
                <Button
                    type="submit"
                    size="sm"
                    disabled={isSubmitting || detalles.length === 0}
                >
                    {isSubmitting ? "Procesando..." : "Registrar venta"}
                </Button>
            </div>
        </form>
    );
}
