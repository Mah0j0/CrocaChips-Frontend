import React from "react";
import { Empleado } from "../../../../entities/empleados";
import {useDeleteEmpleado} from "../hooks/useDeleteEmpleado";
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
        >
            {isDeleting ? "Eliminando..." : "Eliminar"}
        </Button>
    );
}

export default React.memo(DeleteEmpleadoButton);
