import React from "react";
import { Producto } from "../../../../entities/productos";
import { useDeleteProducto } from "../hooks/useDeleteProducto.ts";
import Button from "../../../../shared/ui/button/Button";

type Props = {
    producto: Producto;
    onSuccess?: () => void;
};

function DeleteProductoButton({ producto, onSuccess }: Props) {
    const { mutate: deleteProducto, isPending: isDeleting } = useDeleteProducto(onSuccess);

    const handleDelete = () => {
        if (!producto?.id_producto) {
            console.error("No se puede eliminar: falta el ID del producto.");
            return;
        }

        deleteProducto(producto);
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

export default React.memo(DeleteProductoButton);