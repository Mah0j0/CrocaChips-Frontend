import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from "react-toastify";
import {createCliente} from "../api/createCliente";

export const useCreateCliente = (
    onSuccessCallback: () => void
) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createCliente,
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["clientes"] });
            toast.success("Cliente creado correctamente");
            onSuccessCallback();
        },
        onError: (error: Error) => {
            toast.error(error.message || "Error al crear el Cliente");
        },
    });
};
