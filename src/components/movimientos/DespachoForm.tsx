import {Movimiento} from "../../types/movimientos.ts";
import {useForm, UseFormRegister, FieldErrors, RegisterOptions} from "react-hook-form";
import Input from "../form/input/InputField.tsx";
import Label from "../form/Label.tsx";
import Select from "../form/Select.tsx";
import Button from "../ui/button/Button.tsx";
import { useEffect } from "react";
import { deleteDespacho } from "../../api/DespachosApi.ts";
import {toast} from "react-toastify";
import {useMutation, useQueryClient} from "@tanstack/react-query";

//Propiedades que recibe el componente
type Props = {
    onSubmit: (data: Movimiento) => void; 
    defaultValues?: Partial<Movimiento>;  
    isSubmitting?: boolean;
    onCancel?: () => void;
    disabledFields?: (keyof Movimiento)[]; // Campos que estarán deshabilitados en el formulario
};
//Funcion que recibe las propiedades y devuelve el formulario
export default function ProductoForm({
    onSubmit,
    defaultValues = {},
    isSubmitting = false,
    onCancel,
    disabledFields = [],
}: Props) {
const {
   register,
   handleSubmit,
   setValue,
   reset,
   formState: { errors },
} = useForm<Movimiento>();

const queryClient = useQueryClient();

//Sincroniza el formulario con defaultValues cuando cambia.
useEffect(() => {
   if (defaultValues) {
       reset(defaultValues);
   }
}, [defaultValues, reset]);

//Permite deshabilitar ciertos campos
const isDisabled = (field: keyof Movimiento) => disabledFields.includes(field);

//Función para manejar la eliminación de un producto
const { 
    mutate: desactivarDespacho, 
    isPending: isDeleting 
} = useMutation({
   mutationFn: deleteDespacho,
   onSuccess: () => {
       toast.success("Despacho eliminado correctamente");
       queryClient.invalidateQueries({ queryKey: ["despachos"] });
       if (onCancel) onCancel();
   },
   onError: (error: Error) => {
       toast.error(error.message || "Error al eliminar despacho");
   },
});

const handleDelete = () => {
   if (!defaultValues?.id_producto) {
       console.error("No se puede eliminar: falta el ID del despacho.");
       return;
   }
   desactivarDespacho(defaultValues as Movimiento);
};
//FORMULARIO DE PRODUCTO
const handleFormSubmit = (data: Movimiento) => {
    const payload: Movimiento = {
        id_movimiento: defaultValues?.id_movimiento || 0,
        vendedor: defaultValues?.vendedor || 0,
        id_producto: defaultValues?.id_producto || 0,
        vendedor_nombre: defaultValues?.vendedor_nombre || "",
        producto_nombre: defaultValues?.producto_nombre || "",
        tipo_movimiento: defaultValues?.tipo_movimiento || "",
        cantidad: data.cantidad || 0,
        cantidad_volatil: data.cantidad_volatil || 0,
        fecha: defaultValues?.fecha || new Date().toISOString(),       
    };
    onSubmit(payload);
};
return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
        <div>
        <Label>Producto</Label>
        <Select
            key={selectKey}
            disabled={isLoadingProductos}
            options={productos?.map((producto) => ({
                value: String(producto.id_producto),
                label: `${producto.producto_nombre} - ${producto.cantidad_volatil} disponibles`,
            })) || []}
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
            placeholder="Introduzca la cantidad"
            error={mostrarValidacion && Number(cantidadSeleccionada) < 1}
        />
        {mostrarValidacion && Number(cantidadSeleccionada) < 1 && (
            <p className="mt-1 text-sm text-red-600">Debes introducir una cantidad válida</p>
        )}
    </div>
    </form>
);
}

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

        <div className="space-y-4">
            <h4 className="text-lg font-medium text-gray-800 dark:text-white/90">
                Detalles de la Venta
            </h4>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <div>
                    <Label>Producto</Label>
                    <Select
                        key={selectKey}
                        disabled={isLoadingProductos}
                        options={productos?.map((producto) => ({
                            value: String(producto.id_producto),
                            label: `${producto.producto_nombre} - ${producto.cantidad_volatil} disponibles`,
                        })) || []}
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
                        placeholder="Introduzca la cantidad"
                        error={mostrarValidacion && Number(cantidadSeleccionada) < 1}
                    />
                    {mostrarValidacion && Number(cantidadSeleccionada) < 1 && (
                        <p className="mt-1 text-sm text-red-600">Debes introducir una cantidad válida</p>
                    )}
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
                {error && (
                    <div className="lg:col-span-2 text-red-600 font-medium">
                        {error}
                    </div>
                )}
            </div>
        </div>

        {detalles.length > 0 && (
            <div className="mt-4">
                <h4 className="font-semibold mb-2">Productos agregados:</h4>
                <ul className="list-disc pl-6">
                    {detalles.map((detalle, index) => (
                        <li key={index} className="flex justify-between items-center mb-2">
                            <span>
                                {detalle.producto_nombre}: {detalle.cantidad} unidades - ${detalle.precio_unitario} c/u - Subtotal: ${detalle.subtotal}
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



