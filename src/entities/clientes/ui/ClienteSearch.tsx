import { useState, useEffect } from "react";
import InputField from "../../../shared/ui/form/input/InputField.tsx";
import Label from "../../../shared/ui/form/Label.tsx";
import { useClientes } from "../hooks/useClientes";
import { Cliente } from "../model/type";

type Props = {
    onSelect: (cliente: {
        id: number;
        nombre: string;
        carnet: string;
    }) => void;
};

export default function ClienteSearch({ onSelect }: Props) {
    const { data: clientes = [] } = useClientes();
    const [searchTerm, setSearchTerm] = useState("");
    const [filtered, setFiltered] = useState<Cliente[]>([]);
    const [highlightedIndex, setHighlightedIndex] = useState(-1);
    const [isViewList, setIsViewList] = useState(true);

    useEffect(() => {
        if (searchTerm.trim() === "") {
            setIsViewList(true);
        }
        const timeout = setTimeout(() => {
            if (searchTerm.trim() === "") {
                setFiltered([]);
                return;
            }

            const result = clientes.filter((c) =>
                c.nombre.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFiltered(result);
            setHighlightedIndex(-1);
        }, 300);

        return () => clearTimeout(timeout);
    }, [searchTerm, clientes]);

    const handleSelect = (cliente: Cliente) => {
        setIsViewList(false);
        setSearchTerm(cliente.nombre); // Actualiza el campo de texto con el nombre del cliente
        setFiltered([]); // Vacía la lista de opciones
        setHighlightedIndex(-1); // Reinicia el índice resaltado
        onSelect({
            id: cliente.id_cliente,
            nombre: cliente.nombre,
            carnet: cliente.carnet,
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
            setFiltered([]); // Vacía la lista al presionar Escape
        }
    };

    return (
        <div className="relative w-full" role="combobox" aria-expanded={filtered.length > 0}>
            <Label htmlFor="cliente-list">Clientes</Label>
            <InputField
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Buscar cliente..."
                className="w-full"
                aria-autocomplete="list"
                aria-controls="cliente-list"
                aria-activedescendant={
                    highlightedIndex >= 0 ? `cliente-${filtered[highlightedIndex].id_cliente}` : undefined
                }
            />
            {filtered.length > 0 && isViewList &&  (
                <ul
                    id="cliente-list"
                    className="absolute z-10 bg-white border rounded w-full mt-1 max-h-48 overflow-y-auto shadow dark:border-gray-800 dark:bg-gray-900  dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 xl:w-[430px]"
                    role="listbox"
                >
                    {filtered.map((cliente, index) => (
                        <li
                            key={cliente.id_cliente}
                            id={`cliente-${cliente.id_cliente}`}
                            onClick={() => handleSelect(cliente)}
                            role="option"
                            aria-selected={highlightedIndex === index}
                            className={`px-3 py-2 cursor-pointer flex justify-between items-center ${
                                highlightedIndex === index ? "bg-orange-100 dark:bg-orange-700" : "hover:bg-gray-100 dark:hover:bg-orange-400"
                            }`}
                        >
                            <span className="font-medium">{cliente.nombre}</span>
                            <span className="text-sm text-gray-600 dark:text-gray-100">
                                Ci: {cliente.carnet} | Cel: {cliente.telefono}
                            </span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}