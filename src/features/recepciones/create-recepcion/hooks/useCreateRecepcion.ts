import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from "react-toastify";
import { createRecepcion } from "../api/createRecepcion.ts";

export const useCreateRecepcion = (
    onSuccessCallback: () => void
) => {
    const queryClient = useQueryClient();
    return useMutation({
        // POST - Crear recepción
        mutationFn: createRecepcion,
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["recepciones"] });
            toast.success("Recepción creada correctamente");
            onSuccessCallback();
        },
        // Manejo de errores
        onError: (error: Error) => {
            toast.error(error.message || "Error al registrar la recepción");
        },
    });
};