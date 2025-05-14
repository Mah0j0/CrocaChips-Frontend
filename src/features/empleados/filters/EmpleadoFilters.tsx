import FiltroBusqueda from "./FiltroBusqueda.tsx";
import FiltroEstado from "./FiltroEstado.tsx";
import FiltroRol from "./FiltroRol.tsx";

type Props = {
    filtro: string;
    setFiltro: (value: string) => void;
    estado: string;
    rol: string;
    onEstadoChange: (value: string) => void;
    onRolChange: (value: string) => void;
    child?: React.ReactNode; // Nueva prop para el child
};

export default function EmpleadoFilters({ filtro, setFiltro, estado, rol, onEstadoChange, onRolChange, child }: Props) {
    return (
        <div className="flex flex-row gap-10 items-center justify-between mb-5">
            <FiltroBusqueda filtro={filtro} onChange={setFiltro} />
            <FiltroEstado estado={estado} onChange={onEstadoChange} />
            <FiltroRol rol={rol} onChange={onRolChange} />
            {child}
        </div>
    );
}