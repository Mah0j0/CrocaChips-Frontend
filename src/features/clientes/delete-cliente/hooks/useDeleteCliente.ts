import {useMutation, useQueryClient} from '@tanstack/react-query'
import {toast} from "react-toastify";
import {deleteCliente} from "../api/DeleteCliente.ts";
import {Cliente} from "../../../../entities/clientes";

export const useDeleteCliente = (onSuccessCallback?: () => void) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (cliente: Cliente) => deleteCliente(cliente),
        onSuccess: () => {
            toast.success("Cliente eliminado correctamente");
            queryClient.invalidateQueries({ queryKey: ["clientes"] });
            if (onSuccessCallback) onSuccessCallback();
        },
        onError: (error: Error) => {
            toast.error(error.message || "Error al deshabilitar el empleado");
        },
    });
};