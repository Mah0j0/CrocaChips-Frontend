import { useForm } from "react-hook-form";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import Button from "../ui/button/Button";

//Propiedades que recibe el componente
type StockFormValues = {
    cantidad: number; 
  };
  
type Props = {
    onSubmit: (cantidad: number) => void;
    isSubmitting?: boolean;
    onCancel?: () => void;
    currentStock?: number; // Propiedad opcional para el stock actual
};

//Funcion que recibe las propiedades y devuelve el formulario
export default function StockForm({
    onSubmit,
    isSubmitting = false,
    onCancel,
    
}: Props) {
const {
   register,  
   handleSubmit,
   formState: { errors },
} = useForm<StockFormValues>({
});


//FORMULARIO DE STOCK
return (
    <form onSubmit={handleSubmit((data) => onSubmit(data.cantidad))} className="space-y-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <Label className="py-2">Cantidad para aumentar/reducir:</Label>
            <Input
                type="number"
                placeholder="Ej. 10"
                {...register("cantidad", {
                    required: {
                        value: true,
                        message: "Escribe la cantidad a aumentar",
                    },
                    min: {
                        value: 1,
                        message: "La cantidad debe ser mayor o igual a 1",
                    },
                    pattern: {
                        value: /^[0-9]+$/,
                        message: "La cantidad solo puede contener números",
                    },
                })}
                error={!!errors.cantidad}
                hint={errors.cantidad?.message}
            />
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
};
