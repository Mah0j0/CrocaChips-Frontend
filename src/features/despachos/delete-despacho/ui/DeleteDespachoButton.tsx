import React from "react";
import { Cliente } from "../../../../entities/clientes";
import { useDeleteDespacho } from "../hooks/useDeleteDespacho.ts";
import Button from "../../../../shared/ui/button/Button";

type Props = {
    cliente: Cliente;
    onSuccess?: () => void;
};

function DeleteDespachoButton({ cliente, onSuccess }: Props) {
    const { mutate: deleteCliente, isPending: isDeleting } = useDeleteDespacho(onSuccess);

    const handleDelete = () => {
        if (!cliente?.id_cliente) {
            console.error("No se puede eliminar: falta el ID del cliente.");
            return;
        }

        deleteCliente(cliente);
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