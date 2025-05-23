import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import Button from "../../../shared/ui/button/Button";
import ProductoSearch from "../../productos/ui/ProductoSearch";
import ClienteSearch from "../../clientes/ui/ClienteSearch";
import DetallesList from "./DetallesList";
import { FormField } from "../../../shared/ui/form/FormField";
import { PlusIcon } from "../../../shared/icons";
import { useDetallesVenta } from "../hooks/useDetallesVenta";
import { NuevaVenta } from "../model/type";

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
    const productoSearchRef = useRef<{ reset: () => void }>(null);

    const [clienteSeleccionado, setClienteSeleccionado] = useState(false);
    const [productoSeleccionado, setProductoSeleccionado] = useState<{
        id: number;
        nombre: string;
        precio_unitario: number;
        cantidad_volatil?: number;
    } | null>(null);

    const [errorCantidad, setErrorCantidad] = useState<string | null>(null);

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

    const isFieldDisabled = (field: keyof NuevaVenta) =>
        disabledFields.includes(field);

    const handleClienteSelect = (cliente: {
        id: number;
        nombre: string;
        carnet: string;
    }) => {
        setClienteSeleccionado(true);
        setValue("cliente", cliente.id);
    };

    const handleProductoSelect = (producto: {
        id: number;
        nombre: string;
        precio_unitario: number;
        cantidad_volatil?: number;
    }) => {
        setProductoSeleccionado(producto);
        setTimeout(() => cantidadRef.current?.focus(), 0);
        setErrorCantidad(null); // limpiar error al cambiar producto
    };

    const handleAgregarDetalle = () => {
        if (!productoSeleccionado) return;

        const disponible = productoSeleccionado.cantidad_volatil ?? Infinity;

        const productoExistenteIndex = detalles.findIndex(
            (d) => d.producto === productoSeleccionado.id
        );

        const nuevaCantidad =
            productoExistenteIndex !== -1
                ? detalles[productoExistenteIndex].cantidad + cantidad
                : cantidad;

        if (nuevaCantidad > disponible) {
            setErrorCantidad(
                `La cantidad total (${nuevaCantidad}) supera la cantidad disponible (${disponible}).`
            );
            return;
        }

        setErrorCantidad(null);
        agregarDetalle(productoSeleccionado);
        setProductoSeleccionado(null);
        setCantidad(0);
        productoSearchRef.current?.reset();
    };

    const handleFormSubmit = (data: NuevaVenta) => {
        if (detalles.length === 0) return;

        onSubmit({ ...data, detalles });
    };

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
            {/* Selección de Cliente */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <ClienteSearch onSelect={handleClienteSelect} />
            </div>

            {/* Detalles de la Venta */}
            <div className="space-y-4">
                <h4 className="text-lg font-medium text-gray-800 dark:text-white/90">
                    Detalles de la Venta
                </h4>

                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-4">
                        <ProductoSearch
                            ref={productoSearchRef}
                            onSelect={handleProductoSelect}
                        />
                        <FormField
                            label="Cantidad"
                            name="cantidad"
                            register={register}
                            errors={errors}
                            type="number"
                            value={cantidad}
                            onChange={(e) => {
                                const value = Number(e.target.value);
                                const disponible = productoSeleccionado?.cantidad_volatil ?? Infinity;

                                setCantidad(value > disponible ? disponible : value);
                                setErrorCantidad(null); // limpiar error al cambiar cantidad
                            }}
                            placeholder="Cantidad"
                            disabled={isFieldDisabled("cantidad")}
                            inputRef={cantidadRef}
                        />
                        <Button
                            size="sm"
                            variant="primary"
                            startIcon={<PlusIcon className="size-5" />}
                            type="button"
                            className="mt-6"
                            onClick={handleAgregarDetalle}
                            disabled={
                                !productoSeleccionado ||
                                cantidad <= 0 ||
                                (productoSeleccionado?.cantidad_volatil !== undefined &&
                                    cantidad > productoSeleccionado.cantidad_volatil)
                            }
                        >
                            Agregar
                        </Button>
                    </div>
                    {/* Mensaje de error debajo de ProductoSearch y Cantidad */}
                    {errorCantidad && (
                        <p className="text-sm text-red-600 mt-1">{errorCantidad}</p>
                    )}
                </div>
            </div>

            {/* Lista de Productos Agregados */}
            <DetallesList detalles={detalles} onEliminar={eliminarDetalle} />

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
