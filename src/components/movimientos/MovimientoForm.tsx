// React
import { useEffect} from "react";
import {useForm} from "react-hook-form";
// Componentes UI 
import Button from "../ui/button/Button.tsx";
import Input from "../form/input/InputField.tsx";
import Label from "../form/Label.tsx";
import Select from "../form/Select.tsx";

// Tipos
import { Movimiento } from "../../types/movimientos.ts";

// Importar los hooks 
import { useProducts } from "../../hooks/useProducto.ts";
import { useEmpleados } from "../../hooks/useEmpleado.ts";

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
                    options={productos?.map(producto => ({
                    value: producto.id_producto.toString(),
                    label: producto.nombre
                    })) || []}
                    placeholder="Seleccione un producto"
                    onChange={(value) => setValue("producto", Number(value))}
                    className={errors.producto ? "border-red-500" : ""}
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