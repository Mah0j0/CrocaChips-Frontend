import { Empleado } from "../../types/empleados";
import {useForm, UseFormRegister, FieldErrors, RegisterOptions} from "react-hook-form";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import Select from "../form/Select";
import Button from "../ui/button/Button";
import { roles } from "../../data";
import { useEffect } from "react";
import {deleteUser} from "../../api/EmpleadoApi.ts";
import {toast} from "react-toastify";
import {useMutation, useQueryClient} from "@tanstack/react-query";

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

    const queryClient = useQueryClient();

    useEffect(() => {
        if (defaultValues) {
            reset(defaultValues);
        }
    }, [defaultValues, reset]);

    const isDisabled = (field: keyof Empleado) => disabledFields.includes(field);

    const { mutate: deleteEmpleado, isPending: isDeleting } = useMutation({
        mutationFn: deleteUser,
        onSuccess: () => {
            toast.success("Empleado eliminado correctamente");
            queryClient.invalidateQueries({ queryKey: ["empleados"] });
            if (onCancel) onCancel();
        },
        onError: (error: Error) => {
            toast.error(error.message || "Error al eliminar el empleado");
        },
    });

    const handleDelete = () => {
        if (!defaultValues?.id) {
            console.error("No se puede eliminar: falta el ID del empleado.");
            return;
        }

        deleteEmpleado(defaultValues as Empleado);
    };

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
                />
                <FormField
                    label="Apellidos"
                    name="apellido"
                    register={register}
                    errors={errors}
                    disabled={isDisabled("apellido")}
                    validation={{
                        required:{
                            value: true,
                            message: "El Apellido es requerido",
                        },
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
                    disabled={true}
                />
                <FormField
                    label="Carnet"
                    name="carnet"
                    register={register}
                    errors={errors}
                    disabled={isDisabled("carnet")}
                    validation={{
                        required: {
                            value: true,
                            message: "El Carnet es requerido",
                        },
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
                    validation={{
                        required: {
                            value: true,
                            message: "El Teléfono es requerido",
                        },
                        pattern: {
                            value: /^[0-9]{8}$/,
                            message: "El Teléfono debe contener solo números",
                        },
                    }}
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
                        {isDeleting ? "Eliminando..." : "Eliminar"}
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