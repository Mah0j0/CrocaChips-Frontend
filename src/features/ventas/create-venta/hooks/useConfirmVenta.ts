import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from "react-toastify";
import {confirmVenta} from "../api/confirmVenta.ts";

export const useConfirmVenta = (
    onSuccessCallback: () => void
) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: confirmVenta,
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["ventas"] });
            toast.success("Venta confirmada correctamente");
            onSuccessCallback();
        },
        onError: (error: Error) => {
            toast.error(error.message || "Error al crear el Cliente");
        },
    });
};
