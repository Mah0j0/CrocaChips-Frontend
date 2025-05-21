import Label from "../../../shared/ui/form/Label.tsx";
import Select from "../../../shared/ui/form/Select.tsx";
import {estados} from "../../../shared/data";

type Props = {
    estado: string;
    onChange: (value: string) => void;
};

export default function FiltroEstado({ estado, onChange }: Props) {
    return (
        <div className="flex flex-row gap-3 items-center">
            <Label>Estado</Label>
            <Select
                options={estados.map(e => ({ value: e.value.toString(), label: e.label }))}
                defaultValue={estado}
                onChange={onChange}
            />
        </div>
    );
}
