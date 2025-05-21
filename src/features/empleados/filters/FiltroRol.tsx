import Select from "../../../shared/ui/form/Select.tsx";
import Label from "../../../shared/ui/form/Label.tsx";
import {roles} from "../../../shared/data";

type Props = {
    rol: string;
    onChange: (value: string) => void;
};

export default function FiltroRol({ rol, onChange }: Props) {
    return (
        <div className="flex flex-row gap-3 items-center">
            <Label>Rol</Label>
            <Select
                options={roles.map(r => ({ value: r.value.toString(), label: r.label }))}
                defaultValue={rol}
                onChange={onChange}
            />
        </div>
    );
}
