import React from "react";
import { Cliente } from "../../../../entities/clientes";
import { useDeleteCliente } from "../hooks/useDeleteCliente.ts";
import Button from "../../../../shared/ui/button/Button";

type Props = {
    cliente: Cliente;
    onSuccess?: () => void;
};

function DeleteClienteButton({ cliente, onSuccess }: Props) {
    const { mutate: deleteCliente, isPending: isDeleting } = useDeleteCliente(onSuccess);

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
            className="px-5 text-red-600 hover:text-red-800 border-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:text-red-300 dark:border-red-400 dark:hover:bg-red-900/20"
        >
            {isDeleting ? "Eliminando..." : "Eliminar"}
        </Button>
    );
}

export default React.memo(DeleteClienteButton);