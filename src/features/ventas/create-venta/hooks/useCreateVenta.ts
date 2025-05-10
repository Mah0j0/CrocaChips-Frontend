import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from "react-toastify";
import {createVenta} from "../api/createVenta.ts";

export const useCreateVenta = (
    onSuccessCallback: () => void
) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createVenta,
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["ventas"] });
            toast.success("Venta registrada correctamente");
            onSuccessCallback();
        },
        onError: (error: Error) => {
            toast.error(error.message || "Error al crear el Cliente");
        },
    });
};
