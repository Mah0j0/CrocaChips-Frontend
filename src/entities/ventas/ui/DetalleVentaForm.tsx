import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import Button from "../../../shared/ui/button/Button";
import ProductoSearch from "../../productos/ui/ProductoSearch";
import { NuevaVenta } from "../model/type";
import { FormField } from "../../../shared/ui/form/FormField";
import { useDetallesVenta } from "../hooks/useDetallesVenta";
import DetallesList from "./DetallesList";
import ClienteSearch from "../../clientes/ui/ClienteSearch";
import { PlusIcon } from "../../../shared/icons";

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
    const cantidadRef = useRef<HTMLInputElement>(null);

    const [clienteSeleccionado, setClienteSeleccionado] = useState(false);
    const [productoSeleccionado, setProductoSeleccionado] = useState<{
        id: number;
        nombre: string;
        precio_unitario: number;
    } | null>(null);

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
            ...defaultValues,
        },
    });

    const {
        detalles,
        agregarDetalle,
        eliminarDetalle,
        cantidad,
        setCantidad,
    } = useDetallesVenta((nuevosDetalles) =>
        setValue("detalles", nuevosDetalles, { shouldValidate: true })
    );

    useEffect(() => {
        reset({ ...defaultValues });
    }, [defaultValues, reset]);

    const isDisabled = (field: keyof NuevaVenta) =>
        disabledFields.includes(field);

    const handleFormSubmit = (data: NuevaVenta) => {
        if (detalles.length === 0) return;
        onSubmit({ ...data, detalles });
    };

    const handleProductoSelect = (producto: {
        id: number;
        nombre: string;
        precio_unitario: number;
    }) => {
        setProductoSeleccionado(producto);
        setTimeout(() => cantidadRef.current?.focus(), 0);
    };

    const handleAgregarDetalle = () => {
        if (productoSeleccionado && cantidad > 0) {
            agregarDetalle(productoSeleccionado);
            setProductoSeleccionado(null);
            setCantidad(0);
        }
    };

    const handleClienteSelect = (cliente: {
        id: number;
        nombre: string;
        carnet: string;
    }) => {
        setClienteSeleccionado(true);
        setValue("cliente", cliente.id);
    };

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
            {/* Cliente */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <ClienteSearch onSelect={handleClienteSelect} />
            </div>

            {/* Productos y Cantidad */}
            <div className="space-y-4">
                <h4 className="text-lg font-medium text-gray-800 dark:text-white/90">
                    Detalles de la Venta
                </h4>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    <ProductoSearch onSelect={handleProductoSelect} />

                    <div className="flex flex-row gap-10 items-center justify-center mb-5">
                        <FormField
                            label="Cantidad"
                            name="cantidad"
                            register={register}
                            errors={errors}
                            type="number"
                            value={cantidad}
                            onChange={(e) =>
                                setCantidad(Number(e.target.value))
                            }
                            placeholder="Cantidad"
                            disabled={isDisabled("cantidad")}
                            inputRef={cantidadRef}
                        />

                        <Button
                            size="sm"
                            variant="primary"
                            startIcon={<PlusIcon className="size-5" />}
                            type="button"
                            onClick={handleAgregarDetalle}
                            disabled={!productoSeleccionado || cantidad <= 0}
                        />
                    </div>
                </div>
            </div>

            {/* Lista de Detalles */}
            <DetallesList
                detalles={detalles}
                onEliminar={eliminarDetalle}
            />

            {/* Acciones */}
            <div className="flex justify-end gap-3 mt-6">
                {onCancel && (
                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={onCancel}
                    >
                        Cancelar
                    </Button>
                )}

                <Button
                    type="submit"
                    size="sm"
                    disabled={isSubmitting || detalles.length === 0 || !clienteSeleccionado}
                >
                    {isSubmitting ? "Procesando..." : "Registrar venta"}
                </Button>
            </div>
        </form>
    );
}
