import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from "react-toastify";
import {createDespacho} from "../api/createDespacho.ts";

export const useCreateDespacho = (
    onSuccessCallback: () => void
) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createDespacho,
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["despachos"] });
            toast.success("Despacho creado correctamente");
            onSuccessCallback();
        },
        onError: (error: Error) => {
            toast.error(error.message || "Error al registrar el despacho");
        },
    });
};
