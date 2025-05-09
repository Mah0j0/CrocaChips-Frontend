import {useMutation, useQueryClient} from '@tanstack/react-query'
import {toast} from "react-toastify";
import {deleteEmpleado} from "../api/DeleteEmpleado.ts";
import {Empleado} from "../../../../entities/empleados";

export const useDeleteEmpleado = (onSuccessCallback?: () => void) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (empleado: Empleado) => deleteEmpleado(empleado),
        onSuccess: () => {
            toast.success(`Empleado deshabilitado correctamente`);
            queryClient.invalidateQueries({ queryKey: ["empleados"] });
            if (onSuccessCallback) onSuccessCallback();
        },
        onError: (error: Error) => {
            toast.error(error.message || "Error al deshabilitar el empleado");
        },
    });
};