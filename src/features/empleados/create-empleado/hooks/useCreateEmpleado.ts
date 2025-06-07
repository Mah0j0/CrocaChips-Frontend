// hooks/useCreateCliente.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from "react-toastify";
import { createEmpleado } from "../api/createEmpleado";
import { EmpleadoPasUser } from "../../../../entities/empleados";

export const useCreateEmpleado = (
    onSuccessCallback: (credenciales: EmpleadoPasUser) => void
) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createEmpleado,
        onSuccess: async (data: EmpleadoPasUser) => {
            console.log(data);
            await queryClient.invalidateQueries({ queryKey: ["empleados"] });
            toast.success("Empleado creado correctamente");
            onSuccessCallback(data);
        },
        onError: (error: Error) => {
            toast.error(error.message || "Error al crear el empleado");
        },
    });
};
