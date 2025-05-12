import {useEffect, useState} from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import Button from "../../../shared/ui/button/Button";
import ProductoSearch from "../../productos/ui/ProductoSearch";
import { NuevaVenta } from "../model/type";
import { FormField } from "../../../shared/ui/form/FormField";
import { useDetallesVenta } from "../hooks/useDetallesVenta";
import DetallesList from "./DetallesList";
import ClienteSearch from "../../clientes/ui/ClienteSearch.tsx";

type Props = {
    onSubmit: (data: NuevaVenta) => void;
    defaultValues?: Partial<NuevaVenta>;
    isSubmitting?: boolean;
    onCancel?: () => void;
    disabledFields?: (keyof NuevaVenta)[];
    schema: z.ZodSchema;
};

export default function DetalleVentaForm({
    onSubmit,
    defaultValues = {},
    isSubmitting = false,
    onCancel,
    disabledFields = [],
    schema,
}: Props) {

    const [clienteSeleccionado, setClienteSeleccionado] = useState(false);
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm<NuevaVenta>({
        resolver: zodResolver(schema),
        defaultValues: {
            cliente: 0,
            detalles: [],
        },
    });

    const { detalles, agregarDetalle, eliminarDetalle, cantidad, setCantidad } = useDetallesVenta((detallesActualizados) =>
        setValue("detalles", detallesActualizados, { shouldValidate: true })
    );
    useEffect(() => {
        if (defaultValues) reset(defaultValues);
    }, [defaultValues, reset]);

    const isDisabled = (field: keyof NuevaVenta) => disabledFields.includes(field);

    const handleFormSubmit = (data: NuevaVenta) => {
        if (detalles.length === 0) {
            console.error("El array de detalles está vacío");
            return;
        }
        console.log(data);
        onSubmit({ ...data, detalles });
    };

    const handleClienteSelect = (cliente: { id: number; nombre: string; carnet: string }) => {
        setClienteSeleccionado(true);
        reset({ ...defaultValues, cliente: cliente.id });
    };

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <ClienteSearch onSelect={handleClienteSelect} />
            </div>

            <div className="space-y-4">
                <h4 className="text-lg font-medium text-gray-800 dark:text-white/90">Detalles de la Venta</h4>
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    <ProductoSearch onSelect={agregarDetalle} />
                    <FormField
                        label="Cantidad"
                        name="cantidad"
                        register={register}
                        errors={errors}
                        type="number"
                        value={cantidad}
                        onChange={(e) => setCantidad(Number(e.target.value))}
                        placeholder="Cantidad"
                        disabled={isDisabled("cantidad")}
                    />
                </div>
            </div>

            <DetallesList detalles={detalles} onEliminar={eliminarDetalle} />

            <div className="flex justify-end gap-3 mt-6">
                {onCancel && (
                    <Button type="button" variant="outline" size="sm" onClick={onCancel}>
                        Cancelar
                    </Button>
                )}
                <Button type="submit" size="sm" disabled={isSubmitting || detalles.length === 0 || !clienteSeleccionado}>
                    {isSubmitting ? "Procesando..." : "Registrar venta"}
                </Button>
            </div>
        </form>
    );
}