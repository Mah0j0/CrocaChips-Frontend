// React
import { useEffect} from "react";
import {useForm} from "react-hook-form";
import { Movimiento } from "../model/type";
import {useProducts} from "../../productos";
import {useEmpleados} from "../../empleados";
import Label from "../../../shared/ui/form/Label.tsx";
import Select from "../../../shared/ui/form/Select.tsx";
import Input from "../../../shared/ui/form/input/InputField.tsx";
import Button from "../../../shared/ui/button/Button.tsx";
// Componentes UI

// Tipos

// Importar los hooks

//Props del componente
type DespachoFormProps = {
    onSubmit: (data: Movimiento) => void;
    defaultValues?: Partial<Movimiento>;
    isSubmitting?: boolean;
    onCancel?: () => void;
    disabledFields?: (keyof Movimiento)[];
};

//Funcion que recibe las propiedades y devuelve el formulario
export default function DespachoForm({
    onSubmit,
    defaultValues = {},
    isSubmitting = false,
    onCancel,
    disabledFields = [],
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

    const payload: Movimiento = {
        id_movimiento: 0, // Asumo que se genera automáticamente en el backend
        vendedor: data.vendedor,
        producto: data.producto,
        vendedor_nombre: vendedorSeleccionado?.nombre || '',
        producto_nombre: productoSeleccionado?.nombre || '',
        tipo_movimiento: "Despacho",
        cantidad: data.cantidad,
        cantidad_volatil: 0, // Valor por defecto
        fecha: new Date().toISOString().split('T')[0], // Fecha actual
    };
    onSubmit(payload);
};
return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Campo Vendedor (Select) */}
            <div>
                <Label>Vendedor</Label>
                <Select
                    options={empleados?.map(empleado => ({
                    value: empleado.id.toString(),
                    label: empleado.nombre
                    })) || []}
                    placeholder="Seleccione un vendedor"
                    onChange={(value) => setValue("vendedor", Number(value))}
                    className={errors.vendedor ? "border-red-500" : ""}
                />
                {errors.vendedor && (
                    <p className="text-sm text-red-500">{errors.vendedor.message}</p>
                )}
            </div>
            {/* Campo Producto (Select) */}
            <div>
            <div>
                <Label>Producto</Label>
                <Select
                    options={empleados?.map(empleado => ({
                        value: empleado.id.toString(),
                        label: empleado.nombre
                    })) || []}
                    placeholder="Seleccione un vendedor"
                    onChange={(value) => setValue("vendedor", Number(value))}
                    className={errors.vendedor ? "border-red-500" : ""}
                    disabled={isDisabled("vendedor")} // Usar isDisabled aquí
                />
                {errors.producto && (
                    <p className="text-sm text-red-500">{errors.producto.message}</p>
                )}
            </div>

            {/* Campo Cantidad (Input Number) */}
            <div>
                <Label>Cantidad</Label>
                <Input
                    type="number"
                    {...register("cantidad", {
                        required: "La cantidad es requerida",
                        min: {
                            value: 1,
                            message: "La cantidad debe ser al menos 1"
                        }
                    })}
                    error={!!errors.cantidad}
                    hint={errors.cantidad?.message}
                    placeholder="Ej. 50"
                />
            </div>
        </div>
        </div>

        {/* Botones de acción */}
        <div className="flex items-center gap-3 justify-end">
            {onCancel && (
                <Button type="button" variant="outline" size="sm" onClick={onCancel}>
                    Cancelar
                </Button>
            )}
            <Button type="submit" size="sm" disabled={isSubmitting}>
                Guardar Cambios
            </Button>
        </div>
    </form>
);
}