// Tipos
import { Movimiento } from "../../../../entities/movimientos";
// Componentes
import React from "react";
import Button from "../../../../shared/ui/button/Button";
import { useDeleteRecepcion } from "../hooks/useDeleteRecepcion.ts";

type Props = {
    movimiento: Movimiento; // datos del movimiento
    onSuccess?: () => void; // callback para manejar el éxito
};

function DeleteRecepcionButton({ movimiento, onSuccess }: Props) {
    // Hook para eliminar una recepción
    const { mutate: deleteRecepcion, isPending: isDeleting } = useDeleteRecepcion(onSuccess);
    // Función que maneja el envío del formulario
    const handleDelete = () => {
        if (!movimiento?.id_movimiento) {
            console.error("No se puede eliminar: falta el ID del movimiento.");
            return;
        }
        deleteRecepcion(movimiento);
    };

    // Renderizado del botón
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
export default React.memo(DeleteRecepcionButton);