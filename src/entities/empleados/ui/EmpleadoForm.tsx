import { Empleado } from "../model/types.ts";
import {useForm, UseFormRegister, FieldErrors, RegisterOptions} from "react-hook-form";
import Input from "../../../shared/ui/form/input/InputField.tsx";
import Label from "../../../shared/ui/form/Label.tsx";
import Select from "../../../shared/ui/form/Select.tsx";
import Button from "../../../shared/ui/button/Button.tsx";
import { roles } from "../../../shared/data";
import { useEffect } from "react";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";

type Props = {
    onSubmit: (data: Empleado) => void;
    defaultValues?: Partial<Empleado>;
    isSubmitting?: boolean;
    onCancel?: () => void;
    disabledFields?: (keyof Empleado)[];
    schema:  z.ZodSchema;
    children?: React.ReactNode;
};


export default function EmpleadoForm({
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
        setValue,
        reset,
        formState: { errors },
    } = useForm<Empleado>({
        resolver: zodResolver(schema),
        defaultValues
    });

    useEffect(() => {
        if (defaultValues) {
            reset(defaultValues);
        }
    }, [defaultValues, reset]);

    const isDisabled = (field: keyof Empleado) => disabledFields.includes(field);


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
                    label="Apellidos"
                    name="apellido"
                    register={register}
                    errors={errors}
                    disabled={isDisabled("apellido")}
                />
                <FormField
                    label="Usuario"
                    name="usuario"
                    register={register}
                    errors={errors}
                    disabled={true}
                />
                <FormField
                    label="Carnet"
                    name="carnet"
                    register={register}
                    errors={errors}
                    disabled={isDisabled("carnet")}
                />
                <div>
                    <Label>Rol</Label>
                    <Select
                        disabled={isDisabled("rol")}
                        options={roles.map((rol) => ({
                            value: String(rol.value), // Convertir a string
                            label: rol.label,
                        }))}
                        defaultValue={String(defaultValues.rol)} // Convertir a string
                        onChange={(value) => setValue("rol", value)}
                        className="dark:bg-dark-900"
                    />
                </div>
                <FormField
                    label="Teléfono"
                    name="telefono"
                    register={register}
                    errors={errors}
                    disabled={isDisabled("telefono")}
                />
            </div>
            <div className="flex items-center gap-3 justify-end">
                {defaultValues?.habilitado && children && (
                    <div className="mt-4 border-t pt-4">
                        {children}
                    </div>
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
    name: keyof Empleado;
    register: UseFormRegister<Empleado>;
    errors: FieldErrors<Empleado>;
    disabled?: boolean;
    validation?: RegisterOptions<Empleado>;
};

const FormField = ({ label, name, register, errors, disabled = false, validation = {} }: PropsFormField) => (
    <div>
        <Label>{label}</Label>
        <Input
            type="text"
            {...register(name, {
                ...validation,
            })}
            disabled={disabled}
            error={!!errors[name]}
            hint={errors[name]?.message}
        />
    </div>
);