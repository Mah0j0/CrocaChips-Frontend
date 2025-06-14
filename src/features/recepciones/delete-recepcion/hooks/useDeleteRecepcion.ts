import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from "react-toastify";
import { deleteRecepcion } from "../api/DeleteRecepcion.ts";
import { Movimiento } from "../../../../entities/movimientos";

export const useDeleteRecepcion = (
    onSuccessCallback?: () => void
) => {
    const queryClient = useQueryClient();
    return useMutation({
        // DELETE - Eliminar recepción
        mutationFn: (movimiento: Movimiento) => deleteRecepcion(movimiento),
        onSuccess: () => {
            toast.success("Recepción eliminada correctamente");
            queryClient.invalidateQueries({ queryKey: ["recepciones"] });
            if (onSuccessCallback) onSuccessCallback();
        },
        // Manejo de errores
        onError: (error: Error) => {
            toast.error(error.message || "Error al eliminar la recepción");
        },
    });
};