import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from "react-toastify";
import {createProducto} from "../api/createProducto.ts";

export const useCreateProducto = (
    onSuccessCallback: () => void
) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createProducto,
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["productos"] });
            toast.success("Producto creado correctamente");
            onSuccessCallback();
        },
        onError: (error: Error) => {
            toast.error(error.message || "Error al crear el producto");
        },
    });
};
