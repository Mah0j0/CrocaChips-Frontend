import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from "react-toastify";
import {createVenta} from "../api/createVenta.ts";
import {useModalContext} from "../../../../app/providers/ModalContext.tsx";

export const useCreateVenta = (
    onSuccessCallback: () => void
) => {
    const queryClient = useQueryClient();

    const { closeModal } = useModalContext();
    return useMutation({
        mutationFn: createVenta,
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["ventas"] });
            toast.success("Venta registrada correctamente");
            onSuccessCallback();
        },
        onError: (error: Error) => {
            closeModal("createVenta")
            toast.error(error.message || "Error al crear el Cliente");
        },
    });
};
