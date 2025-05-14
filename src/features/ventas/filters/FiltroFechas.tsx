import Label from "../../../shared/ui/form/Label.tsx";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type Props = {
    fechaInicio: Date | null;
    fechaFin: Date | null;
    onChange: (dates: [Date | null, Date | null]) => void;
};

export default function FiltroRangoFechas({ fechaInicio, fechaFin, onChange }: Props) {
    return (
        <div className="flex flex-row gap-3 items-center justify-between">
            <div className="flex flex-col">
                <div className="flex items-center gap-2">
                    <Label>Rango de Fechas</Label>
                    <DatePicker
                        selected={fechaInicio}
                        onChange={(dates) => onChange(dates as [Date | null, Date | null])}
                        startDate={fechaInicio}
                        endDate={fechaFin}
                        selectsRange
                        dateFormat="yyyy-MM-dd"
                        placeholderText="Selecciona un rango de fechas"
                        className="px-3 py-2 border border-gray-300 rounded-md dark:bg-dark-900 dark:text-white"
                    />
                </div>
            </div>
        </div>
    );
}