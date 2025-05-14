import {SearchIcon} from "../../../shared/icons";
import Input from "../../../shared/ui/form/input/InputField.tsx";


type Props = {
    filtro: string;
    onChange: (value: string) => void;
};

export default function FiltroBusqueda({ filtro, onChange }: Props) {
    return (
        <div className="relative">
            <Input
                placeholder="Buscar por nombre, apellido o carnet..."
                type="text"
                value={filtro}
                onChange={(e) => onChange(e.target.value)}
                className="pl-[62px]"
            />
            <span className="absolute left-0 top-1/2 -translate-y-1/2 border-r border-gray-200 px-3.5 py-3 text-gray-500 dark:border-gray-800 dark:text-gray-400">
                <SearchIcon className="size-6" />
            </span>
        </div>
    );
}
