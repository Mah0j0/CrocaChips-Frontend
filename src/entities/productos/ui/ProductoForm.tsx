import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Label from "../../../shared/ui/form/Label.tsx";
import Select from "../../../shared/ui/form/Select.tsx";
import Button from "../../../shared/ui/button/Button.tsx";
import { useEffect } from "react";
import { Producto } from "../model/type.ts";
import { FormField } from "../../../shared/ui/form/FormField.tsx";

type Props = {
    onSubmit: (data: Producto) => void;
    defaultValues?: Partial<Producto>;
    isSubmitting?: boolean;
    onCancel?: () => void;
    disabledFields?: (keyof Producto)[];
    schema: z.ZodSchema;
    children?: React.ReactNode;
};

export default function ProductoForm({
     onSubmit,
     defaultValues = {},
     isSubmitting = false,
     onCancel,
     disabledFields = [],
     schema,
     children,
}: Props) {
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm<Producto>({
        resolver: zodResolver(schema),
        defaultValues,
    });

    useEffect(() => {
        if (defaultValues) {
            reset(defaultValues);
        }
    }, [defaultValues, reset]);

    const isDisabled = (field: keyof Producto) => disabledFields.includes(field);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
                    <Select
                        disabled={isDisabled("tiempo_vida")}
                        options={[
                            { value: "1", label: "1 Mes" },
                            { value: "3", label: "3 Meses" },
                            { value: "6", label: "6 Meses" },
                            { value: "12", label: "1 Año" },
                        ]}
                        defaultValue={String(defaultValues?.tiempo_vida || "1")}
                        onChange={(value) => setValue("tiempo_vida", Number(value))}
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
                    step={0.01}
                />
            </div>
            <div className="flex items-center gap-3 justify-end">
                {children && (
                    <>
                        {children}
                    </>
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