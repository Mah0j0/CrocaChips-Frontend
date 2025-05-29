import { useEffect } from "react";
import { useForm, Controller, FieldErrors } from "react-hook-form";
import { ZodSchema } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import Label from "../../../shared/ui/form/Label.tsx";
import Select from "../../../shared/ui/form/Select.tsx";
import Button from "../../../shared/ui/button/Button.tsx";
import { FormField } from "../../../shared/ui/form/FormField.tsx";

import { Producto, ProductosCreate } from "../model/type.ts";
import { productoSchema } from "../model/productoSchema.ts";

type Props = {
    onSubmit: (data: Producto) => void;
    defaultValues?: Partial<ProductosCreate>;
    isSubmitting?: boolean;
    onCancel?: () => void;
    disabledFields?: (keyof ProductosCreate)[];
    schema?: ZodSchema;
    children?: React.ReactNode;
};

export default function ProductoForm({
                                         onSubmit,
                                         defaultValues = {},
                                         isSubmitting = false,
                                         onCancel,
                                         disabledFields = [],
                                         children,
                                         schema = productoSchema,
                                     }: Props) {
    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { errors },
    } = useForm<Producto>({
        resolver: zodResolver(schema),
        defaultValues,
    });

    useEffect(() => {
        reset(defaultValues);
    }, [defaultValues, reset]);

    const handleError = (errors: FieldErrors<Producto>) => {
        console.warn("Errores de validación:", errors);
    };

    const isDisabled = (field: keyof ProductosCreate) => disabledFields.includes(field);

    return (
        <form onSubmit={handleSubmit(onSubmit, handleError)} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <FormField
                    label="Nombre"
                    name="nombre"
                    register={register}
                    errors={errors}
                    disabled={isDisabled("nombre")}
                />

                <FormField
                    label="Descripción"
                    name="descripcion"
                    register={register}
                    errors={errors}
                    disabled={isDisabled("descripcion")}
                />

                <FormField
                    label="Stock"
                    name="stock"
                    type="number"
                    register={register}
                    errors={errors}
                    disabled={isDisabled("stock")}
                    step={1}
                />

                <div>
                    <Label>Tiempo de vida</Label>
                    <Controller
                        control={control}
                        name="tiempo_vida"
                        render={({ field }) => (
                            <Select
                                {...field}
                                disabled={isDisabled("tiempo_vida")}
                                options={[
                                    { value: "1", label: "1 Mes" },
                                    { value: "3", label: "3 Meses" },
                                    { value: "6", label: "6 Meses" },
                                    { value: "12", label: "1 Año" },
                                ]}
                                className="dark:bg-dark-900"
                            />
                        )}
                    />
                    {errors?.tiempo_vida && (
                        <p className="text-sm text-red-500 mt-1">{errors.tiempo_vida.message}</p>
                    )}
                </div>

                <FormField
                    label="Precio (Bs./Unidad)"
                    name="precio_unitario"
                    type="number"
                    register={register}
                    errors={errors}
                    disabled={isDisabled("precio_unitario")}
                    step={0.01}
                />
            </div>

            <div className="flex items-center justify-end gap-3">
                {children}
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
