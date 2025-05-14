import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { increaseStock } from "../api/increaseStock";

export const useIncreaseStock = (onSuccessCallback?: () => void) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: increaseStock,
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["productos"] });
            toast.success("Producto actualizado correctamente");
            if (onSuccessCallback) {
                onSuccessCallback();
            }
        },
        onError: (error: Error) => {
            toast.error(error.message || "Error al aumentar el stock.");
        },
    });
};