import {useMutation, useQueryClient} from '@tanstack/react-query'
import {toast} from "react-toastify";
import {deleteDespacho} from "../api/DeleteDespacho.ts";
import {Movimiento} from "../../../../entities/movimientos";

export const useDeleteDespacho = (onSuccessCallback?: () => void) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (cliente: Movimiento) => deleteDespacho(cliente),
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