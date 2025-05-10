import { useState, useEffect, useMemo } from "react";
import { useProducts as productos } from "../hooks/useProducto.ts";
import { Producto } from "../model/type.ts";

type Props = {
    onSelect: (producto: { id: number; nombre: string; precio_unitario:number}) => void;
};

export default function ProductoSearch({ onSelect }: Props) {
    const { data: productosData = [] } = productos(); // Accede a `data` y usa un valor por defecto vacío
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredProductos, setFilteredProductos] = useState<Producto[]>([]);

    // Función para filtrar productos
    const filterProductos = useMemo(() => {
        return (term: string) => {
            if (term.trim() === "") return [];
            return productosData.filter((producto: Producto) =>
                producto.producto_nombre.toLowerCase().includes(term.toLowerCase())
            );
        };
    }, [productosData]);

    // Debounce para evitar búsquedas innecesarias
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setFilteredProductos(filterProductos(searchTerm));
        }, 300); // 300ms de retraso
        return () => clearTimeout(timeoutId);
    }, [searchTerm, filterProductos]);

    const handleSelect = (producto: Producto) => {
        setSearchTerm(producto.producto_nombre);
        setFilteredProductos([]);
        onSelect({ id: producto.id_producto, nombre: producto.producto_nombre, precio_unitario: producto.precio_unitario });
    };

    return (
        <div className="relative">
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar producto..."
                className="w-full border rounded px-3 py-2"
                aria-label="Buscar producto"
                aria-expanded={filteredProductos.length > 0}
                aria-controls="producto-dropdown"
            />
            {filteredProductos.length > 0 && (
                <ul
                    id="producto-dropdown"
                    className="absolute z-10 bg-white border rounded w-full mt-1 max-h-40 overflow-y-auto"
                    role="listbox"
                >
                    {filteredProductos.map((producto) => (
                        <li
                            key={producto.id_producto}
                            onClick={() => handleSelect(producto)}
                            className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                            role="option"
                            aria-selected={false}
                        >
                            {producto.producto_nombre}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}