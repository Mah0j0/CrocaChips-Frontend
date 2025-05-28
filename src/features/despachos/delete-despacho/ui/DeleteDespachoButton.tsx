import React from "react";
import { Movimiento } from "../../../../entities/movimientos";
import { useDeleteDespacho } from "../hooks/useDeleteDespacho.ts";
import Button from "../../../../shared/ui/button/Button";

type Props = {
    movimiento: Movimiento;
    onSuccess?: () => void;
};

function DeleteDespachoButton({ movimiento, onSuccess }: Props) {
    const { mutate: deleteDespacho, isPending: isDeleting } = useDeleteDespacho(onSuccess);

    const handleDelete = () => {
        if (!movimiento?.id_movimiento) {
            console.error("No se puede eliminar: falta el ID del movimiento.");
            return;
        }

        deleteDespacho(movimiento);
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

export default React.memo(DeleteDespachoButton);