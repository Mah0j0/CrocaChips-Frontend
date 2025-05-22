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
    const [isViewList, setIsViewList] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => {
            const term = searchTerm.trim().toLowerCase();
            if (!term) {
                setFiltered(clientes);
            } else {
                const result = clientes.filter((c) =>
                    c.nombre.toLowerCase().includes(term)
                );
                setFiltered(result);
            }
            setHighlightedIndex(-1);
        }, 250);

        return () => clearTimeout(timeout);
    }, [searchTerm, clientes]);

    const handleSelect = (cliente: Cliente) => {
        setIsViewList(false);
        setSearchTerm(cliente.nombre);
        setFiltered([]);
        setHighlightedIndex(-1);
        onSelect({
            id: cliente.id_cliente,
            nombre: cliente.nombre,
            carnet: cliente.carnet,
        });
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (filtered.length === 0) return;

        switch (e.key) {
            case "ArrowDown":
                setHighlightedIndex((prev) => (prev + 1) % filtered.length);
                break;
            case "ArrowUp":
                setHighlightedIndex((prev) => (prev - 1 + filtered.length) % filtered.length);
                break;
            case "Enter":
                if (highlightedIndex >= 0) {
                    handleSelect(filtered[highlightedIndex]);
                }
                break;
            case "Escape":
                setIsViewList(false);
                break;
        }
    };

    return (
        <div className="relative w-full" role="combobox" aria-expanded={isViewList}>
            <Label htmlFor="cliente-input">Clientes</Label>
            <InputField
                id="cliente-input"
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => setIsViewList(true)}
                onKeyDown={handleKeyDown}
                placeholder="Buscar cliente..."
                className="w-full"
                aria-autocomplete="list"
                aria-controls="cliente-list"
                aria-activedescendant={
                    highlightedIndex >= 0 ? `cliente-${filtered[highlightedIndex].id_cliente}` : undefined
                }
            />
            {filtered.length > 0 && isViewList && (
                <ul
                    id="cliente-list"
                    className="absolute z-10 mt-1 w-full max-h-48 overflow-y-auto rounded border bg-white shadow dark:border-gray-800 dark:bg-gray-900 dark:text-white"
                    role="listbox"
                >
                    {filtered.map((cliente, index) => (
                        <li
                            key={cliente.id_cliente}
                            id={`cliente-${cliente.id_cliente}`}
                            onClick={() => handleSelect(cliente)}
                            role="option"
                            aria-selected={highlightedIndex === index}
                            className={`px-3 py-2 cursor-pointer flex justify-between items-center transition-colors ${
                                highlightedIndex === index
                                    ? "bg-orange-100 dark:bg-orange-700"
                                    : "hover:bg-gray-100 dark:hover:bg-orange-400"
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
