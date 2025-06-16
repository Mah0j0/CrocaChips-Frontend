import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from "react-toastify";
import { editDespacho } from "../api/editDespacho.ts";

export const useEditDespacho = (
    onSuccessCallback: () => void
) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: editDespacho,
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["despachos"] });
            toast.success("Despacho actualizado correctamente");
            onSuccessCallback();
        },
        onError: (error: Error) => {
            toast.error(error.message || "Error al editar el despacho");
        },
    });
};
