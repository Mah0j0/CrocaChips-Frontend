import Button from "../button/Button.tsx";
import {ChevronLeftIcon} from "../../icons";

type Props = {
    paginaActual: number;
    totalPaginas: number;
    onPrev: () => void;
    onNext: () => void;
};

export function Pagination({ paginaActual, totalPaginas, onPrev, onNext }: Props) {
    return (
        <div className="flex justify-between items-center mt-4">
            <Button disabled={paginaActual === 1} onClick={onPrev} startIcon={<ChevronLeftIcon className="size-6" />}>
                Anterior
            </Button>
            <span className="text-gray-400">Página {paginaActual} de {totalPaginas}</span>
            <Button disabled={paginaActual === totalPaginas} onClick={onNext} endIcon={<ChevronLeftIcon className="rotate-180 size-6" />}>
                Siguiente
            </Button>
        </div>
    );
}
