import FiltroBusqueda from "./FiltroBusqueda.tsx";
import FiltroEstado from "./FiltroEstado.tsx";
import FiltroRangoFechas from "../../ventas/filters/FiltroFechas.tsx";

type Props = {
    filtro: string;
    setFiltro: (value: string) => void;
    estado?: string;
    onEstadoChange?: (value: string) => void;
    fechaInicio: Date | null;
    fechaFin: Date | null;
    setFechaInicio: (date: Date | null) => void;
    setFechaFin: (date: Date | null) => void;
    child?: React.ReactNode;
};

export default function ClienteFilters({
                                           filtro,
                                           setFiltro,
                                           estado,
                                           onEstadoChange,
                                           fechaInicio,
                                           fechaFin,
                                           setFechaInicio,
                                           setFechaFin,
                                           child,
                                       }: Props) {
    return (
        <div className="flex flex-row gap-10 items-center justify-between mb-5">
            {/* Filtro de búsqueda */}
            <FiltroBusqueda filtro={filtro} onChange={setFiltro} />

            {/* Filtro de estado (opcional) */}
            {estado && onEstadoChange && (
                <FiltroEstado estado={estado} onChange={onEstadoChange} />
            )}

            {/* Filtro de rango de fechas */}
            <FiltroRangoFechas
                fechaInicio={fechaInicio}
                fechaFin={fechaFin}
                onChange={([start, end]) => {
                    setFechaInicio(start);
                    setFechaFin(end);
                }}
            />

            {/* Contenido adicional opcional */}
            {child}
        </div>
    );
}