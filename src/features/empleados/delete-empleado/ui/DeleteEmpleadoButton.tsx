import React from "react";
import { Empleado } from "../../../../entities/empleados";
import { useDeleteEmpleado } from "../hooks/useDeleteEmpleado";
import Button from "../../../../shared/ui/button/Button";

type Props = {
    empleado: Empleado;
    onSuccess?: () => void;
};

function DeleteEmpleadoButton({ empleado, onSuccess }: Props) {
    const { mutate: deleteEmpleado, isPending: isDeleting } = useDeleteEmpleado(onSuccess);

    const handleDelete = () => {
        if (!empleado?.id) {
            console.error("No se puede eliminar: falta el ID del empleado.");
            return;
        }

        deleteEmpleado(empleado);
    };

    return (
        <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleDelete}
            disabled={isDeleting}
            className="px-5 text-red-600 hover:text-red-800 border-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:text-red-300 dark:border-red-400 dark:hover:bg-red-900/20"
        >
            {isDeleting ? "Eliminando..." : "Eliminar"}
        </Button>
    );
}

export default React.memo(DeleteEmpleadoButton);
