import { useState, useEffect } from "react";
import { Producto } from "../model/type";
import InputField from "../../../shared/ui/form/input/InputField.tsx";
import Label from "../../../shared/ui/form/Label.tsx";
import {useMisProductos} from "../hooks/useMisProductos.ts";

type Props = {
    onSelect: (producto: {
        id: number;
        nombre: string;
        precio_unitario: number;
    }) => void;
};

export default function ProductoSearch({ onSelect }: Props) {
    const { data: productos = [] } = useMisProductos();
    const [searchTerm, setSearchTerm] = useState("");
    const [filtered, setFiltered] = useState<Producto[]>([]);
    const [highlightedIndex, setHighlightedIndex] = useState(-1);

    const [isViewing, setIsViewing] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (searchTerm.trim() === "") {
                setFiltered(productos);
                return;
            }

            const result = productos.filter((p) =>
                p.producto_nombre.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFiltered(result);
            setHighlightedIndex(-1);
        }, 300);

        return () => clearTimeout(timeout);
    }, [searchTerm, productos]);

    const handleSelect = (producto: Producto) => {
        setSearchTerm(producto.producto_nombre);
        setFiltered([]);
        setHighlightedIndex(-1);
        setIsViewing(false);
        onSelect({
            id: producto.id_producto,
            nombre: producto.producto_nombre,
            precio_unitario: producto.precio_unitario,
        });
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (filtered.length === 0) return;

        if (e.key === "ArrowDown") {
            setHighlightedIndex((prev) => (prev + 1) % filtered.length);
        } else if (e.key === "ArrowUp") {
            setHighlightedIndex((prev) => (prev - 1 + filtered.length) % filtered.length);
        } else if (e.key === "Enter" && highlightedIndex >= 0) {
            handleSelect(filtered[highlightedIndex]);
        } else if (e.key === "Escape") {
            setFiltered([]);
        }
    };

    return (
        <div className="relative w-full" role="combobox" aria-expanded={filtered.length > 0}>
            <Label htmlFor="producto-list">Productos</Label>
            <InputField
                type="text"
                onFocus={() => setIsViewing(true)}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Buscar producto..."
                className="w-full"
                aria-autocomplete="list"
                aria-controls="producto-list"
                aria-activedescendant={
                    highlightedIndex >= 0 ? `producto-${filtered[highlightedIndex].id_producto}` : undefined
                }
            />
            {filtered.length > 0 && isViewing &&(
                <ul
                    id="producto-list"
                    className="absolute z-10 bg-white border rounded w-full mt-1 max-h-48 overflow-y-auto shadow dark:border-gray-800 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 xl:w-[430px]"
                    role="listbox"
                >
                    {filtered.map((producto, index) => (
                        <li
                            key={producto.id_producto}
                            id={`producto-${producto.id_producto}`}
                            onClick={() => handleSelect(producto)}
                            role="option"
                            aria-selected={highlightedIndex === index}
                            className={`px-3 py-2 cursor-pointer flex justify-between items-center ${
                                highlightedIndex === index ? "bg-orange-100 dark:bg-orange-500" : "hover:bg-gray-100 dark:hover:bg-orange-400"
                            }`}
                        >
                            <span className="font-medium">{producto.producto_nombre}</span>
                            <span className="text-sm text-gray-600 dark:text-gray-100">
                                Bs{producto.precio_unitario  ? producto.precio_unitario : "0.00"} | Stock: {producto.cantidad_volatil}
                            </span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
