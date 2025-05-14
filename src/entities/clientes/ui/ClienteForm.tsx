import { useForm } from "react-hook-form";
import Button from "../../../shared/ui/button/Button.tsx";
import { useEffect } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Cliente } from "../model/type.ts";
import { FormField } from "../../../shared/ui/form/FormField.tsx";

type Props = {
    onSubmit: (data: Cliente) => void;
    defaultValues?: Partial<Cliente>;
    isSubmitting?: boolean;
    onCancel?: () => void;
    disabledFields?: (keyof Cliente)[];
    schema: z.ZodSchema;
    children?: React.ReactNode;
};

export default function ClienteForm({
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
        formState: { errors },
    } = useForm<Cliente>({
        resolver: zodResolver(schema),
        defaultValues,
    });

    useEffect(() => {
        if (defaultValues) {
            reset(defaultValues);
        }
    }, [defaultValues, reset]);

    const isDisabled = (field: keyof Cliente) => disabledFields.includes(field);

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
                    label="Dirección"
                    name="direccion"
                    register={register}
                    errors={errors}
                    disabled={isDisabled("direccion")}
                />
                <FormField
                    label="Teléfono"
                    name="telefono"
                    register={register}
                    errors={errors}
                    disabled={isDisabled("telefono")}
                />
                <FormField
                    label="Carnet"
                    name="carnet"
                    register={register}
                    errors={errors}
                    disabled={isDisabled("carnet")}
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