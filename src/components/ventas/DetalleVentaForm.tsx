// React
import { useEffect, useState, useCallback } from "react";
// Componentes UI 
import Button from "../ui/button/Button";
import Input from "../form/input/InputField";
import Label from "../form/Label";
// Iconos y React Query
import { TrashBinIcon, PlusIcon } from "../../icons";
// Tipos
import { Producto } from "../../types/productos";
import { DetalleVenta, Venta } from "../../types/ventas";
import { useForm } from "react-hook-form";
// Importar los hooks 
import { useProductosVendedor } from "../../hooks/useDespacho.ts";
import { useClientes } from "../../hooks/useCliente.ts";
import { useDetallesVenta } from "../../hooks/useVentas.ts";
import Select from "../form/Select";

// Definición de props del componente
type VentaFormProps = {
    onSubmit: (data: Venta) => void;
    defaultValues?: Partial<Venta>;
    isSubmitting?: boolean;
    onCancel?: () => void;
};
//Funcion que recibe las propiedades y devuelve el formulario
export default function DetalleVentaForm({
    onSubmit,
    defaultValues = {},
    isSubmitting = false,
    onCancel,
}: VentaFormProps) {
    const {
        handleSubmit,
        reset,
        setValue,
    } = useForm<Venta>();

    // Resetear el formulario cuando se reciben nuevos valores
    useEffect(() => {
        if (defaultValues) {
            reset(defaultValues);
        }
    }, [defaultValues, reset]);

    // Estados del componente
    const [clienteSeleccionado, setClienteSeleccionado] = useState<string>("");
    const [detalles, setDetalles] = useState<DetalleVenta[]>([]);
    const [, setError] = useState<string | null>(null);

    // Estados para producto y cantidad
    const [productoSeleccionado, setProductoSeleccionado] = useState<string>("0");
    const [cantidadSeleccionada, setCantidadSeleccionada] = useState<string>("0");


    // Hooks
    const { data: productos, isLoading: isLoadingProductos } = useProductosVendedor();
    const { data: clientes, isLoading } = useClientes();
    const { data: detallesVenta } = useDetallesVenta(
        defaultValues?.id_venta || 0
    );


    // Cargar detalles de venta existente cuando estén disponibles
    useEffect(() => {
        if (detallesVenta && detallesVenta.length > 0 && defaultValues?.id_venta) {
            setDetalles(detallesVenta);
        }
    }, [detallesVenta, defaultValues?.id_venta]);

    // Establecer cliente seleccionado cuando se cargan los valores por defecto
    useEffect(() => {
        if (defaultValues?.cliente) {
            setClienteSeleccionado(String(defaultValues.cliente));
        }
    }, [defaultValues?.cliente]);

    // Formulario para detalles
    const {
        reset: resetDetalle,
    } = useForm<{ producto: string, cantidad: string }>();

    // Agregar un nuevo estado para controlar la validación
    const [mostrarValidacion, setMostrarValidacion] = useState<boolean>(false);

    const handleAgregarDetalle = useCallback((data: any) => {
        // Activar la validación
        setMostrarValidacion(true);

        const productoId = Number(data.producto);
        const cantidadProducto = Number(data.cantidad);

        // Buscar el producto seleccionado
        const productoEncontrado = productos?.find(
            (producto) => (producto as unknown as Producto).id_producto === productoId
        ) as unknown as Producto;

        if (!productoEncontrado) {
            setError("Producto no encontrado");
            return;
        }

        // Verificar que la cantidad no exceda el stock disponible
        if (cantidadProducto > productoEncontrado.stock) {
            setError(`No hay suficiente stock disponible. Stock actual: ${productoEncontrado.stock}`);
            return;
        }

        // Verificar si el producto ya está en la lista
        const productoExistente = detalles.find(
            (detalle) => detalle.producto === productoId
        );

        if (productoExistente) {
            // Verificar que la cantidad total no exceda el stock
            const nuevaCantidadTotal = productoExistente.cantidad + cantidadProducto;

            if (nuevaCantidadTotal > productoEncontrado.stock) {
                setError(`La cantidad total (${nuevaCantidadTotal}) excede el stock disponible (${productoEncontrado.stock})`);
                return;
            }

            // Si existe, actualizar la cantidad
            const nuevosDetalles = detalles.map((detalle) => {
                if (detalle.producto === productoId) {
                    return {
                        ...detalle,
                        cantidad: nuevaCantidadTotal,
                        subtotal: productoEncontrado.precio_unitario * nuevaCantidadTotal
                    };
                }
                return detalle;
            });
            setDetalles(nuevosDetalles);
        } else {
            // Si no existe, crear nuevo detalle
            const nuevoDetalle: DetalleVenta = {
                id_detalle: 0, // Temporal
                id_venta: 0, // Temporal
                producto: productoId,
                producto_nombre: productoEncontrado.nombre,
                cantidad: cantidadProducto,
                precio_unitario: productoEncontrado.precio_unitario,
                subtotal: productoEncontrado.precio_unitario * cantidadProducto
            };
            setDetalles([...detalles, nuevoDetalle]);
        }

        // Resetear valores y validación después de agregar exitosamente
        resetDetalle({ producto: "0", cantidad: "0" });
        setProductoSeleccionado("0");
        setCantidadSeleccionada("0");
        setError(null);
        setMostrarValidacion(false);
    }, [productos, detalles]);

    // Función para eliminar un detalle
    const handleEliminarDetalle = useCallback((index: number) => {
        const nuevosDetalles = [...detalles];
        nuevosDetalles.splice(index, 1);
        setDetalles(nuevosDetalles);
    }, [detalles]);

    // Función para enviar el formulario completo
    const handleFormSubmit = useCallback(() => {


        // Calcular el precio total
        const precioTotal = detalles.reduce((total, detalle) => total + detalle.subtotal, 0);

        // Preparar los datos
        const ventaData: Venta = {
            id_venta: defaultValues?.id_venta || 0,
            cliente: Number(clienteSeleccionado), // Convert string to number
            cliente_nombre: clientes?.find(c => c.id_cliente === Number(clienteSeleccionado))?.nombre || "",
            vendedor: typeof window !== 'undefined' ? Number(localStorage.getItem("USER_ID")) || 0 : 0, // Convert string to number
            vendedor_nombre: typeof window !== 'undefined' ? localStorage.getItem("USER_NAME") || "" : "",
            estado: Boolean(0), // Convert number to boolean (will be false)
            fecha: new Date().toISOString().split('T')[0],
            precio_total: precioTotal,
            detalles: detalles
        };

        onSubmit(ventaData);
    }, [clienteSeleccionado, detalles, clientes, defaultValues?.id_venta, onSubmit]);

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <div>
                    <Label>Cliente</Label>
                    <Select
                        disabled={isLoading}
                        options={clientes?.map((cliente) => ({
                            value: String(cliente.id_cliente),
                            label: cliente.nombre,
                        })) || []}
                        defaultValue={clienteSeleccionado}
                        onChange={(value) => {
                            setClienteSeleccionado(value);
                            setValue("cliente", Number(value));
                        }}
                        className="dark:bg-dark-900"
                    />
                    {mostrarValidacion && !clienteSeleccionado && (
                        <p className="mt-1 text-sm text-red-600">Debes seleccionar un cliente</p>
                    )}
                </div>

            </div>

            {/* Formulario para agregar productos */}
            <div className="space-y-4">
                <h4 className="text-lg font-medium text-gray-800 dark:text-white/90">
                    Detalles de la Venta
                </h4>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    <div>
                        <Label>Producto</Label>
                        <Select
                            disabled={isLoadingProductos}
                            options={productos?.map((producto) => ({
                                value: String(producto),
                                label: `${producto.producto_nombre} - ${producto.cantidad_volatil} disponibles`,
                            })) || []}
                            defaultValue={productoSeleccionado}
                            onChange={(value) => setProductoSeleccionado(value)}
                            className="dark:bg-dark-900"
                        />
                        {mostrarValidacion && productoSeleccionado === "0" && (
                            <p className="mt-1 text-sm text-red-600">Debes seleccionar un producto</p>
                        )}
                    </div>

                    <div>
                        <Label>Cantidad</Label>
                        <Input
                            type="number"
                            value={cantidadSeleccionada}
                            onChange={(e) => setCantidadSeleccionada(e.target.value)}
                            min="0"
                            placeholder="0"
                            error={mostrarValidacion && Number(cantidadSeleccionada) <= 0}
                            hint={mostrarValidacion && Number(cantidadSeleccionada) <= 0 ? "La cantidad debe ser mayor a 0" : ""}
                        />
                    </div>

                    <div className="lg:col-span-2 flex justify-end">
                        <Button
                            type="button"
                            variant="primary"
                            onClick={() => handleAgregarDetalle({
                                producto: productoSeleccionado,
                                cantidad: cantidadSeleccionada
                            })}
                            startIcon={<PlusIcon className="size-5" />}
                        >
                            Agregar
                        </Button>
                    </div>
                </div>
            </div>

            {/* Lista de detalles agregados */}
            {detalles.length > 0 && (
                <div className="mt-4">
                    <h4 className="font-semibold mb-2">Productos agregados:</h4>
                    <ul className="list-disc pl-6">
                        {detalles.map((detalle, index) => (
                            <li key={index} className="flex justify-between items-center mb-2">
                                <span>
                                    {detalle.producto_nombre}: {detalle.cantidad} unidades - ${detalle.subtotal}
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
                    <div className="mt-4 text-right">
                        <p className="font-bold">Total: ${detalles.reduce((total, detalle) => total + detalle.subtotal, 0)}</p>
                    </div>
                </div>
            )}

            {/* Botones de acción */}
            <div className="flex items-center gap-3 justify-end mt-6">
                {onCancel && (
                    <Button type="button" variant="outline" size="sm" onClick={onCancel}>
                        Cancelar
                    </Button>
                )}
                <Button
                    type="submit"
                    size="sm"
                    disabled={isSubmitting || detalles.length === 0 || !clienteSeleccionado}
                >
                    {isSubmitting ? (
                        <span className="flex items-center">
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Procesando...
                        </span>
                    ) : (
                        "Registrar venta"
                    )}
                </Button>
            </div>
        </form>
    );
}
