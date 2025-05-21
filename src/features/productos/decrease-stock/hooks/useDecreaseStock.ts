import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { decreaseStock } from "../api/decreaseStock";

export const useDecreaseStock = (onSuccessCallback?: () => void) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: decreaseStock,
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["productos"] });
            toast.success("Producto actualizado correctamente");
            if (onSuccessCallback) {
                onSuccessCallback();
            }
        },
        onError: (error: Error) => {
            toast.error(error.message || "Error al reducir el stock.");
        },
    });
};