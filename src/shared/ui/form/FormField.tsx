import {
    FieldErrors,
    RegisterOptions,
    UseFormRegister,
    FieldValues,
    Path,
} from "react-hook-form";
import Input from "../../../shared/ui/form/input/InputField";
import Label from "../../../shared/ui/form/Label";
import Select from "./Select";
import TextArea from "./input/TextArea";
import MultiSelect from "./MultiSelect";

type Option = { value: string | number; label: string };

type PropsFormField<T extends FieldValues> = {
    type?: "text" | "number" | "email" | "password" | "date" | "time" | "textarea" | "select" | "multiselect";
    label: string;
    name: Path<T>;
    register: UseFormRegister<T>;
    errors: FieldErrors<T>;
    disabled?: boolean;
    validation?: RegisterOptions<T>;
    options?: Option[]; // for select/multiselect
    placeholder?: string;
    value?: string;
    onChange?: (value: string) => void;
    onChangeSelect?: (value: string) => void;
    onChangeMultiSelect?: (value: string[]) => void;
    defaultValue?: string | number;
};

export function FormField<T extends FieldValues>({
     type = "text",
     label,
     name,
     register,
     errors,
     disabled = false,
     validation = {},
     options = [],
     placeholder = "",
     onChange,
    onChangeMultiSelect,
    onChangeSelect,
    defaultValue,
    value,
}: PropsFormField<T>) {
    const error = errors[name];
    const errorMessage = error?.message?.toString();

    return (
        <div>
            <Label htmlFor={name}>{label}</Label>

            {type === "select" ? (
                <Select
                    {...register(name, validation)}
                    options={options}
                    defaultValue={defaultValue}
                    placeholder={placeholder}
                    disabled={disabled}
                    onChange={onChangeSelect}
                />
            ) : type === "multiselect" ? (
                <MultiSelect
                    {...register(name, validation)}
                    options={options}
                    defaultSelected={defaultValue ? [defaultValue.toString()] : []}
                    onChange={onChangeMultiSelect}
                    disabled={disabled}
                    label={label}
                />
            ) : type === "textarea" ? (
                <TextArea
                    {...register(name, validation)}
                    rows={6}
                    value={value}
                    onChange={onChange}
                    disabled={disabled}
                    error={!!error}
                    hint={errorMessage}
                />
            ) : (
                <Input
                    id={name}
                    type={type}
                    {...register(name, validation)}
                    disabled={disabled}
                    error={!!error}
                    hint={errorMessage}
                />
            )}

            {errorMessage && (
                <p className="text-sm text-red-500 mt-1">{errorMessage}</p>
            )}
        </div>
    );
}
