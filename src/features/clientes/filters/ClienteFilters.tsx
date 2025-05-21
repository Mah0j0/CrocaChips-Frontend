import FiltroBusqueda from "./FiltroBusqueda.tsx";
import FiltroEstado from "./FiltroEstado.tsx";

type Props = {
    filtro: string;
    setFiltro: (value: string) => void;
    estado?: string;
    onEstadoChange?: (value: string) => void;
    child?: React.ReactNode; // Nueva prop para el child
};

export default function ClienteFilters(
    {
        filtro,
        setFiltro,
        estado,
        onEstadoChange,
        child
    }: Props) {
    return (
        <div className="flex flex-row gap-10 items-center justify-between mb-5">
            <FiltroBusqueda filtro={filtro} onChange={setFiltro} />
            {estado && onEstadoChange && (
                <FiltroEstado estado={estado} onChange={onEstadoChange} />
            )}
            {child}
        </div>
    );
}