import { useReducer, useState, useCallback, } from "react";
import { NuevoDetalle } from "../model/type";

type DetallesAction =
    | { type: "ADD"; payload: NuevoDetalle }
    | { type: "REMOVE"; payload: number }
    | { type: "UPDATE"; payload: { index: number; detalle: NuevoDetalle } };

function detallesReducer(state: NuevoDetalle[], action: DetallesAction): NuevoDetalle[] {
    switch (action.type) {
        case "ADD":
            return [...state, action.payload];
        case "REMOVE":
            return state.filter((_, i) => i !== action.payload);
        case "UPDATE":
            return state.map((detalle, index) =>
                index === action.payload.index ? action.payload.detalle : detalle
            );
        default:
            return state;
    }
}
export function useDetallesVenta(setDetallesForm: (detalles: NuevoDetalle[]) => void) {
    const [detalles, dispatch] = useReducer(detallesReducer, []);
    const [cantidad, setCantidad] = useState(0);

    const agregarDetalle = useCallback(
        (producto: { id: number; nombre: string; precio_unitario: number }) => {
            if (cantidad <= 0) {
                alert("La cantidad debe ser mayor a 0.");
                return;
            }

            const productoExistenteIndex = detalles.findIndex(
                (detalle) => detalle.producto === producto.id
            );

            if (productoExistenteIndex !== -1) {
                const detalleExistente = detalles[productoExistenteIndex];
                const nuevaCantidad = detalleExistente.cantidad + cantidad;
                const detalleActualizado: NuevoDetalle = {
                    ...detalleExistente,
                    cantidad: nuevaCantidad,
                    precio_unitario: producto.precio_unitario,
                    subtotal: nuevaCantidad * producto.precio_unitario,
                    producto_nombre: producto.nombre,
                };

                const nuevosDetalles = [...detalles];
                nuevosDetalles[productoExistenteIndex] = detalleActualizado;

                dispatch({
                    type: "UPDATE",
                    payload: {
                        index: productoExistenteIndex,
                        detalle: detalleActualizado
                    }
                });
                setDetallesForm(nuevosDetalles);
            } else {
                const nuevoDetalle: NuevoDetalle = {
                    producto: producto.id,
                    cantidad,
                    precio_unitario: producto.precio_unitario,
                    subtotal: cantidad * producto.precio_unitario,
                    producto_nombre: producto.nombre,
                };
                dispatch({ type: "ADD", payload: nuevoDetalle });
                const nuevosDetalles = [...detalles, nuevoDetalle];
                setDetallesForm(nuevosDetalles);
            }

            setCantidad(0);
        },
        [cantidad, detalles, setDetallesForm]
    );

    const eliminarDetalle = (index: number) => {
        const nuevosDetalles = detalles.filter((_, i) => i !== index);
        dispatch({ type: "REMOVE", payload: index });
        setDetallesForm(nuevosDetalles);
    };

    return { detalles, agregarDetalle, eliminarDetalle, cantidad, setCantidad };
}
