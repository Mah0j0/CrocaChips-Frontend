import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from "react-toastify";
import { editRecepcion } from "../api/editRecepcion.ts";

export const useEditRecepcion = (
    onSuccessCallback: () => void
) => {
    const queryClient = useQueryClient();
    return useMutation({
        // PUT - Editar recepción
        mutationFn: editRecepcion,
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["recepciones"] });
            toast.success("Recepción actualizada correctamente");
            onSuccessCallback();
        },
        // Manejo de errores
        onError: (error: Error) => {
            toast.error(error.message || "Error al editar la recepción");
        },
    });
};