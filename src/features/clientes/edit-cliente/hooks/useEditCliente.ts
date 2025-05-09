import { useMutation, useQueryClient } from '@tanstack/react-query';
import { editCliente } from '../api/editCliente.ts';
import { toast } from "react-toastify";

export const useEditCliente = (
    onSuccessCallback: () => void
) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: editCliente,
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["clientes"] });
            toast.success("Cliente actualizado correctamente");
            onSuccessCallback();
        },
        onError: (error: Error) => {
            toast.error(error.message || "Error al actualizar el cliente");
        },
    });
};