import { Empleado } from "../../types/empleados";
import {useForm, UseFormRegister, FieldErrors, RegisterOptions} from "react-hook-form";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import Select from "../form/Select";
import Button from "../ui/button/Button";
import { roles } from "../../data";
import { useEffect } from "react";

type Props = {
    onSubmit: (data: Empleado) => void;
    defaultValues?: Partial<Empleado>;
    isSubmitting?: boolean;
    onCancel?: () => void;
    disabledFields?: (keyof Empleado)[];
};

export default function EmpleadoForm({
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
    } = useForm<Empleado>();

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
                    validation={{
                        minLength: {
                            value: 3,
                            message: "El Nombre debe tener al menos 3 caracteres",
                        },
                        maxLength: {
                            value: 50,
                            message: "El Nombre no puede exceder los 50 caracteres",
                        },
                    }}
                />
                <FormField
                    label="Apellidos"
                    name="apellido"
                    register={register}
                    errors={errors}
                    disabled={isDisabled("apellido")}
                    validation={{
                        minLength: {
                            value: 3,
                            message: "El Apellido debe tener al menos 3 caracteres",
                        },
                        maxLength: {
                            value: 50,
                            message: "El Apellido no puede exceder los 50 caracteres",
                        },
                    }}
                />
                <FormField
                    label="Usuario"
                    name="usuario"
                    register={register}
                    errors={errors}
                    disabled={isDisabled("usuario")}
                />
                <FormField
                    label="Carnet"
                    name="carnet"
                    register={register}
                    errors={errors}
                    disabled={isDisabled("carnet")}
                    validation={{
                        pattern: {
                            value: /^[0-9]{8}$/,
                            message: "El Carnet debe contener exactamente 8 dígitos",
                        },
                    }}
                />
                <div>
                    <Label>Rol</Label>
                    <Select
                        disabled={isDisabled("rol")}
                        options={roles}
                        defaultValue={defaultValues.rol}
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
                    validation={{
                        pattern: {
                            value: /^[0-9]{8}$/,
                            message: "El Teléfono debe contener solo números",
                        },
                    }}
                />
            </div>

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
                required: `El ${label} es obligatorio`,
                ...validation,
            })}
            disabled={disabled}
            error={!!errors[name]}
            hint={errors[name]?.message}
        />
    </div>
);