// React
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Movimiento } from "../model/type";
import { useProducts } from "../../productos";
import { useEmpleados } from "../../empleados";
import Label from "../../../shared/ui/form/Label.tsx";
import Select from "../../../shared/ui/form/Select.tsx";
import Input from "../../../shared/ui/form/input/InputField.tsx";
import Button from "../../../shared/ui/button/Button.tsx";

//Props del componente
type DespachoFormProps = {
    onSubmit: (data: Movimiento) => void;
    defaultValues?: Partial<Movimiento>;
    isSubmitting?: boolean;
    onCancel?: () => void;
    disabledFields?: (keyof Movimiento)[];
    showDeleteButton?: boolean;
    onDelete?: () => void;
};

//Funcion que recibe las propiedades y devuelve el formulario
export default function DespachoForm({
    onSubmit,
    defaultValues = {},
    isSubmitting = false,
    onCancel,
    disabledFields = [],
    showDeleteButton = false,
    onDelete,
}: DespachoFormProps) {
    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors },
    } = useForm<Movimiento>();

    //Sincroniza el formulario con defaultValues cuando cambia.
    useEffect(() => {
        if (defaultValues) {
            reset(defaultValues);
        }
    }, [defaultValues, reset]);

    //Permite deshabilitar ciertos campos
    const isDisabled = (field: keyof Movimiento) => disabledFields.includes(field);

    //Variables
    const { data: productos } = useProducts();
    const { data: empleados } = useEmpleados();

    //Sincroniza el formulario con defaultValues cuando cambia.
    useEffect(() => {
        if (defaultValues) {
            reset(defaultValues);
        }
    }, [defaultValues, reset]);

    //FORMULARIO DE DESPACHO
    const handleFormSubmit = (data: Movimiento) => {
        // Obtener nombres del vendedor y producto seleccionados
        const vendedorSeleccionado = empleados?.find(e => e.id === data.vendedor);
        const productoSeleccionado = productos?.find(p => p.id_producto === data.producto);

        if (!vendedorSeleccionado || !productoSeleccionado) {
            return;
        }

        const payload: Movimiento = {
            ...data,
            vendedor_nombre: vendedorSeleccionado.nombre,
            producto_nombre: productoSeleccionado.nombre,
            tipo_movimiento: defaultValues.tipo_movimiento || "Despacho",
            cantidad: data.cantidad,
            cantidad_volatil: defaultValues.cantidad_volatil || 0,
        };
        onSubmit(payload);
    };
    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                {/* Campo Vendedor (Select) */}
                <div className="space-y-3">
                    <Label className="block font-medium text-gray-700 dark:text-gray-300">Vendedor</Label>
                    <Select
                        options={empleados?.map(empleado => ({
                            value: empleado.id!.toString(),
                            label: empleado.nombre
                        })) || []}
                        placeholder="Seleccione un vendedor"
                        onChange={(value) => setValue("vendedor", Number(value), { shouldValidate: true })}
                        className={`w-full ${errors.vendedor ? "border-red-500 dark:border-red-400" : ""}`}
                        defaultValue={defaultValues.vendedor?.toString()}
                    />
                    <input
                        type="hidden"
                        {...register("vendedor", {
                            required: "Debe seleccionar un vendedor"
                        })}
                    />
                    {errors.vendedor && (
                        <p className="text-xs text-red-600 dark:text-red-400 mt-0 leading-none">{errors.vendedor.message}</p>
                    )}
                </div>

                {/* Campo Producto (Select) */}
                <div className="space-y-3">
                    <Label className="block font-medium text-gray-700 dark:text-gray-300">Producto</Label>
                    <Select
                        options={productos?.map(producto => ({
                            value: producto.id_producto.toString(),
                            label: producto.nombre
                        })) || []}
                        placeholder="Seleccione un producto"
                        onChange={(value) => setValue("producto", Number(value), { shouldValidate: true })}
                        className={`w-full ${errors.producto ? "border-red-500 dark:border-red-400" : ""}`}
                        disabled={isDisabled("producto")}
                        defaultValue={defaultValues.producto?.toString()}
                    />
                    <input
                        type="hidden"
                        {...register("producto", {
                            required: "Debe seleccionar un producto"
                        })}
                    />
                    {errors.producto && (
                        <p className="text-xs text-red-600 dark:text-red-400 mt-0 leading-none">{errors.producto.message}</p>
                    )}
                </div>

                {/* Campo Cantidad (Input Number) */}
                <div className="space-y-3">
                    <Label className="block font-medium text-gray-700 dark:text-gray-300">Cantidad</Label>
                    <div className="max-w-xs">
                        <Input
                            type="number"
                            {...register("cantidad", {
                                required: "La cantidad es requerida",
                                min: {
                                    value: 1,
                                    message: "La cantidad debe ser al menos 1"
                                },
                                max: {
                                    value: 500,
                                    message: "La cantidad no puede ser mayor a 500"
                                },
                                valueAsNumber: true,
                                validate: (value) => {
                                    if (isNaN(Number(value))) {
                                        return "Por favor ingrese un número válido";
                                    }
                                    return true;
                                }
                            })}
                            error={!!errors.cantidad}
                            hint={errors.cantidad?.message}
                            aria-invalid={errors.cantidad ? "true" : "false"}
                            placeholder="Ej. 50"
                            className="w-full"
                        />
                    </div>
                </div>
            </div>

            {/* Botones de acción */}
            <div className="flex items-center justify-end gap-4 pt-4">
                {onCancel && (
                    <Button
                        type="button"
                        variant="outline"
                        size="md"
                        onClick={onCancel}
                        className="px-5"
                    >
                        Cancelar
                    </Button>
                )}

                {/* Botón de Eliminar - Recepciones */}
                {showDeleteButton && (
                    <Button
                        type="button"
                        variant="outline"
                        size="md"
                        onClick={onDelete}
                        className="px-5 text-red-600 hover:text-red-800 border-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:text-red-300 dark:border-red-400 dark:hover:bg-red-900/20"
                    >
                        Eliminar
                    </Button>
                )}

                <Button
                    type="submit"
                    size="md"
                    disabled={isSubmitting}
                    className="px-5"
                >
                    {isSubmitting ? "Guardando..." : "Guardar Cambios"}
                </Button>
            </div>
        </form>
    );
}