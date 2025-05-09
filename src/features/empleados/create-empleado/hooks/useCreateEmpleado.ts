// hooks/useCreateEmpleado.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from "react-toastify";
import { createEmplado } from "../api/createEmpleado";
import { EmpleadoPasUser } from "../../../../entities/empleados";

export const useCreateEmpleado = (
    onSuccessCallback: (credenciales: EmpleadoPasUser) => void
) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createEmplado,
        onSuccess: async (data: EmpleadoPasUser) => {
            await queryClient.invalidateQueries({ queryKey: ["empleados"] });
            toast.success("Empleado creado correctamente");
            onSuccessCallback(data);
        },
        onError: (error: Error) => {
            toast.error(error.message || "Error al crear el empleado");
        },
    });
};
