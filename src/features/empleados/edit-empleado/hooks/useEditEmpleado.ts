import { useMutation } from '@tanstack/react-query'
import { editEmpleado } from '../api/editEmpleado'
import {toast} from "react-toastify";

export const useEditEmpleado = () => {
    return useMutation({
        mutationFn: editEmpleado,        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["empleado"] });
            toast.success("Perfil actualizado correctamente");
            closeModal("editEmpleado");
        },
        onError: (error: Error) => {
            toast.error(error.message);
        },
    })
}
