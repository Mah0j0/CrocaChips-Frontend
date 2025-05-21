import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { deleteProducto } from "../api/DeleteProducto.ts";
import { Producto } from "../../../../entities/productos";

export const useDeleteProducto = (onSuccessCallback?: () => void) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (producto: Producto) => deleteProducto(producto),
        onSuccess: () => {
            toast.success("Producto desactivado correctamente");
            queryClient.invalidateQueries({ queryKey: ["productos"] });
            if (onSuccessCallback) onSuccessCallback();
        },
        onError: (error: Error) => {
            toast.error(error.message || "Error al desactivar el producto");
        },
    });
};