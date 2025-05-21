import { useMutation, useQueryClient } from '@tanstack/react-query';
import { editEmpleado } from '../api/editEmpleado';
import { toast } from "react-toastify";

export const useEditEmpleado = (
    onSuccessCallback: () => void
) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: editEmpleado,
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["empleado"] });
            toast.success("Perfil actualizado correctamente");
            onSuccessCallback();
        },
        onError: (error: Error) => {
            toast.error(error.message || "Error al actualizar el empleado");
        },
    });
};