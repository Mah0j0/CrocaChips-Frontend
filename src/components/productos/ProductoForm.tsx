import { Producto } from "../../types/productos";
import {useForm, UseFormRegister, FieldErrors, RegisterOptions} from "react-hook-form";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import Select from "../form/Select";
import Button from "../ui/button/Button";
import { useEffect } from "react";
import { deleteProducto } from "../../api/ProductosApi.ts";
import {toast} from "react-toastify";
import {useMutation, useQueryClient} from "@tanstack/react-query";

//Propiedades que recibe el componente
type Props = {
    onSubmit: (data: Producto) => void; 
    defaultValues?: Partial<Producto>;  
    isSubmitting?: boolean;
    onCancel?: () => void;
    disabledFields?: (keyof Producto)[]; // Campos que estarán deshabilitados en el formulario
};

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
} = useForm<Producto>();

const queryClient = useQueryClient();

//Sincroniza el formulario con defaultValues cuando cambia.
useEffect(() => {
   if (defaultValues) {
       reset(defaultValues);
   }
}, [defaultValues, reset]);

//Permite deshabilitar ciertos campos
const isDisabled = (field: keyof Producto) => disabledFields.includes(field);

//Función para manejar la eliminación de un producto
const { 
    mutate: desactivarProducto, 
    isPending: isDeleting 
} = useMutation({
   mutationFn: deleteProducto,
   onSuccess: () => {
       toast.success("Producto desactivado correctamente");
       queryClient.invalidateQueries({ queryKey: ["productos"] });
       if (onCancel) onCancel();
   },
   onError: (error: Error) => {
       toast.error(error.message || "Error al desactivar el producto");
   },
});

const handleDelete = () => {
   if (!defaultValues?._id) {
       console.error("No se puede desactivar: falta el ID del producto.");
       return;
   }
   desactivarProducto(defaultValues as Producto);
};

const onValidSubmit = (data: Producto) => {
    if (!data.tiempo_vida || data.tiempo_vida <= 0) {
        toast.error("Selecciona un tiempo de vida válido para el producto");
        return;
    }
    onSubmit(data);
};
//FORMULARIO DE PRODUCTO
return (
    <form onSubmit={handleSubmit(onValidSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <FormField
                label="Nombre"
                name="nombre"
                type="text"
                register={register}
                errors={errors}
                disabled={isDisabled("nombre")}
                validation={{
                    required: {
                        value: true,
                        message: "El Nombre es requerido",
                    },
                    minLength: {
                        value: 3,
                        message: "El Nombre debe tener al menos 3 caracteres",
                    },
                    maxLength: {
                        value: 50,
                        message: "El Nombre no puede exceder los 50 caracteres",
                    },
                }}
                placeholder="Ej. Galletas Crocantes"
            />
            <FormField
                label="Descripción"
                name="descripcion"
                type="text"
                register={register}
                errors={errors}
                disabled={isDisabled("descripcion")}
                validation={{
                    required:{
                        value: true,
                        message: "Escribe una descripción",
                    },
                    minLength: {
                        value: 10,
                        message: "Escribe una descripción de al menos 10 caracteres",
                    },
                    maxLength: {
                        value: 150,
                        message: "Escribe una descripción de menos de 150 caracteres",
                    },
                }}
                placeholder="Describe el producto..."
            />
            <FormField
                label="Stock"
                name="stock"
                type="number"
                register={register}
                errors={errors}
                disabled={isDisabled("stock")}
                validation={{
                    required: {
                        value: true,
                        message: "Escribe el stock del producto",
                    },
                    min: {
                        value: 0,
                        message: "El Stock debe ser mayor o igual a 0",
                    },
                }}
                placeholder="100"
            />
            <div>
                <Label>Tiempo de vida</Label>
                <Select
                    disabled={isDisabled("tiempo_vida")}
                    options={[
                    { value: "1", label: "1 Mes" },
                    { value: "3", label: "3 Meses" },
                    { value: "6", label: "6 Meses" },
                    { value: "12", label: "1 Año" },
                    ]}
                    defaultValue={String(defaultValues?.tiempo_vida || "")}
                    onChange={(value) => setValue("tiempo_vida", parseInt(value))}
                    className="dark:bg-dark-900"
                />
            </div>

            <FormField
                label="Precio (Bs./Unidad)" 
                name="precio_unitario"
                type="number"
                register={register}
                errors={errors}
                disabled={isDisabled("precio_unitario")}
                validation={{
                    required: {
                        value: true,
                        message: "Escribe el precio del producto",
                    },
                    min: {
                        value: 0,
                        message: "El Precio debe ser mayor o igual a 0",
                    },
                }}
                placeholder="Ej. 10.50"               
            />
        </div>
        <div className="flex items-center gap-3 justify-end">
            {defaultValues?.habilitado && (
                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleDelete}
                    disabled={isDeleting}
                >
                    {isDeleting ? "Desactivando..." : "Desactivar"}
                </Button>
            )}
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
type PropsFormField = {
label: string;
name: keyof Producto;
type: string;
register: UseFormRegister<Producto>;
errors: FieldErrors<Producto>;
disabled?: boolean;
validation?: RegisterOptions<Producto>;
placeholder?: string;
};

const FormField = ({ label, name, type, register, errors, disabled = false, validation = {}, placeholder }: PropsFormField) => (
<div>
    <Label>{label}</Label>
    <Input
        type={type}
        {...register(name, {
            ...validation,
        })}
        disabled={disabled}
        error={!!errors[name]}
        hint={errors[name]?.message}
        placeholder={placeholder}
    />
</div>
);



