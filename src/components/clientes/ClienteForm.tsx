import {useForm, UseFormRegister, FieldErrors, RegisterOptions} from "react-hook-form";
import Input from "../../shared/ui/form/input/InputField";
import Label from "../../shared/ui/form/Label";
import Button from "../../shared/ui/button/Button";
import { useEffect } from "react";
import {toast} from "react-toastify";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {Cliente} from "../../entities/clientes/model/type.ts";
import {deleteCliente} from "../../entities/clientes/api/ClienteApi.ts";

type Props = {
    onSubmit: (data: Cliente) => void;
    defaultValues?: Partial<Cliente>;
    isSubmitting?: boolean;
    onCancel?: () => void;
    disabledFields?: (keyof Cliente)[];
};

export default function ClienteForm({
        onSubmit,
        defaultValues = {},
        isSubmitting = false,
        onCancel,
        disabledFields = [],
    }: Props) {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<Cliente>();

    const queryClient = useQueryClient();

    useEffect(() => {
        if (defaultValues) {
            reset(defaultValues);
        }
    }, [defaultValues, reset]);

    const { mutate: deleteEmpleado, isPending: isDeleting } = useMutation({
        mutationFn: deleteCliente,
        onSuccess: () => {
            toast.success("Cliente eliminado correctamente");
            queryClient.invalidateQueries({ queryKey: ["clientes"] });
            if (onCancel) onCancel();
        },
        onError: (error: Error) => {
            toast.error(error.message || "Error al eliminar el cliente");
        },
    });

    const handleDelete = () => {
        if (!defaultValues?.id_cliente) {
            console.error("No se puede eliminar: falta el ID del cliente.");
            return;
        }

        deleteEmpleado(defaultValues as Cliente);
    };

    const handleFormSubmit = (data: Cliente) => {
        const payload: Cliente = {
            id_cliente: defaultValues?.id_cliente || 0, // Valor predeterminado si no existe
            imagen: defaultValues?.imagen || "", // Valor predeterminado si no existe
            nombre: data.nombre,
            direccion: data.direccion,
            telefono: data.telefono,
            habilitado: true,
            created_at: new Date(),
        };
        onSubmit(payload);
    };

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <FormField
                    label="Nombre"
                    name="nombre"
                    register={register}
                    errors={errors}
                    disabled={disabledFields.includes("nombre")}
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
                    label="Dirección"
                    name="direccion"
                    register={register}
                    errors={errors}
                    disabled={disabledFields.includes("direccion")}
                    validation={{
                        required: {
                            value: true,
                            message: "La Dirección es requerida",
                        },
                        minLength: {
                            value: 3,
                            message: "La Dirección debe tener al menos 3 caracteres",
                        },
                        maxLength: {
                            value: 100,
                            message: "La Dirección no puede exceder los 100 caracteres",
                        },
                    }}
                />
                <FormField
                    label="Teléfono"
                    name="telefono"
                    register={register}
                    errors={errors}
                    disabled={disabledFields.includes("telefono")}
                    validation={{
                        required: {
                            value: true,
                            message: "El Teléfono es requerido",
                        },
                        pattern: {
                            value: /^[0-9]{8}$/,
                            message: "El Teléfono debe contener solo 8 números",
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
    name: keyof Cliente;
    register: UseFormRegister<Cliente>;
    errors: FieldErrors<Cliente>;
    disabled?: boolean;
    validation?: RegisterOptions<Cliente>;
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