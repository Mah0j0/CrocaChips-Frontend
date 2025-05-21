import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { editProducto } from "../api/editProducto";
import { Producto } from "../../../../entities/productos";

export const useEditProducto = (onSuccessCallback?: () => void) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (producto: Producto) => editProducto(producto),
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["productos"] });
            toast.success("Producto actualizado correctamente");
            if (onSuccessCallback) {
                onSuccessCallback();
            }
        },
        onError: (error: Error) => {
            toast.error(error.message || "Error al actualizar el producto.");
        },
    });
};