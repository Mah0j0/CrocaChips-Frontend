import {useReducer, useState, useCallback, } from "react";
import { NuevoDetalle } from "../model/type";

type DetallesAction =
    | { type: "ADD"; payload: NuevoDetalle }
    | { type: "REMOVE"; payload: number };

function detallesReducer(state: NuevoDetalle[], action: DetallesAction): NuevoDetalle[] {
    switch (action.type) {
        case "ADD":
            return [...state, action.payload];
        case "REMOVE":
            return state.filter((_, i) => i !== action.payload);
        default:
            return state;
    }
}
export function useDetallesVenta(setDetallesForm: (detalles: NuevoDetalle[]) => void) {
    const [detalles, dispatch] = useReducer(detallesReducer, []);
    const [cantidad, setCantidad] = useState(1);

    const agregarDetalle = useCallback(
        (producto: { id: number; nombre: string; precio_unitario: number }) => {
            if (cantidad <= 0) {
                alert("La cantidad debe ser mayor a 0.");
                return;
            }

            const nuevoDetalle: NuevoDetalle = {
                producto: producto.id,
                cantidad,
            };

            const nuevosDetalles = [...detalles, nuevoDetalle];
            dispatch({ type: "ADD", payload: nuevoDetalle });
            setDetallesForm(nuevosDetalles); // sincroniza con react-hook-form
            setCantidad(1);
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
