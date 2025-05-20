import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../../../shared/ui/button/Button.tsx";
import { FormField } from "../../../shared/ui/form/FormField.tsx";

// Esquema de validación con Zod
const stockSchema = z.object({
    cantidad: z
        .number({ invalid_type_error: "La cantidad debe ser un número" })
        .min(1, "La cantidad debe ser mayor o igual a 1")
        .positive("La cantidad debe ser un número positivo"),
});

// Tipos derivados del esquema
type StockFormValues = z.infer<typeof stockSchema>;

type Props = {
    onSubmit: (cantidad: number) => void;
    isSubmitting?: boolean;
    onCancel?: () => void;
    currentStock?: number; // Propiedad opcional para el stock actual
};

export default function StockForm({
    onSubmit,
    isSubmitting = false,
    onCancel,
    currentStock,
}: Props) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<StockFormValues>({
        resolver: zodResolver(stockSchema),
    });

    return (
        <form onSubmit={handleSubmit((data) => onSubmit(data.cantidad))} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <FormField
                    type="number"
                    label="Cantidad para aumentar/reducir:"
                    name="cantidad"
                    register={register}
                    errors={errors}
                />
                {currentStock !== undefined && (
                    <p className="text-sm text-gray-500">
                        Stock actual: <b>{currentStock}</b>
                    </p>
                )}
            </div>
            <div className="flex items-center gap-3 justify-end">
                {onCancel && (
                    <Button type="button" variant="outline" size="sm" onClick={onCancel}>
                        Cancelar
                    </Button>
                )}
                <Button type="submit" size="sm" disabled={isSubmitting}>
                    Actualizar Stock
                </Button>
            </div>
        </form>
    );
}