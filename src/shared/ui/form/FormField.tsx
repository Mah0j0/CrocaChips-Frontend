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
import React from "react";

type Option = { value: string | number; label: string };

type PropsFormField<T extends FieldValues> = {
    type?: "text" | "number" | "email" | "password" | "date" | "time" | "textarea" | "select" | "multiselect",
    label: string,
    name: Path<T>,
    register: UseFormRegister<T>,
    errors: FieldErrors<T>,
    disabled?: boolean,
    validation?: RegisterOptions<T>,
    options?: Option[],
    placeholder?: string,
    value?: string | number,
    step?: number,
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
    onChangeTextarea?: (value: string) => void,
    onChangeSelect?: (value: string) => void,
    onChangeMultiSelect?: (value: string[]) => void,
    defaultValue?: string | number,
    inputRef?: React.RefObject<HTMLInputElement | null>
};

// Función para asignar el ref de react-hook-form y también uno externo (opcional)
const assignRef = (
    el: HTMLInputElement | null,
    reactHookFormRef: any,
    externalRef?: React.RefObject<HTMLInputElement | null>
) => {
    if (typeof reactHookFormRef === "function") {
        reactHookFormRef(el);
    } else if (reactHookFormRef && 'current' in reactHookFormRef) {
        (reactHookFormRef as React.MutableRefObject<HTMLInputElement | null>).current = el;
    }

    if (externalRef) {
        externalRef.current = el;
    }
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
                                                     onChangeTextarea,
                                                     onChangeMultiSelect,
                                                     onChangeSelect,
                                                     defaultValue,
                                                     value,
                                                     step,
                                                     inputRef
                                                 }: PropsFormField<T>) {
    const { ref: rhfRef, ...field } = register(name, validation);
    const error = errors[name];
    const errorMessage = error?.message?.toString();

    const renderField = () => {
        switch (type) {
            case "select":
                return (
                    <Select
                        {...field}
                        options={options}
                        defaultValue={defaultValue}
                        placeholder={placeholder}
                        disabled={disabled}
                        onChange={onChangeSelect}
                    />
                );

            case "multiselect":
                return (
                    <MultiSelect
                        {...field}
                        options={options}
                        defaultSelected={defaultValue ? [defaultValue.toString()] : []}
                        onChange={onChangeMultiSelect}
                        disabled={disabled}
                        label={label}
                    />
                );

            case "textarea":
                return (
                    <TextArea
                        {...field}
                        rows={6}
                        value={value?.toString() ?? ""}
                        onChange={onChangeTextarea}
                        disabled={disabled}
                        error={!!error}
                        hint={errorMessage}
                    />
                );

            default:
                return (
                    <Input
                        id={name}
                        type={type}
                        {...field}
                        ref={(el) => assignRef(el, rhfRef, inputRef)}
                        disabled={disabled}
                        error={!!error}
                        hint={errorMessage}
                        onChange={onChange}
                        step={step}
                    />
                );
        }
    };

    return (
        <div>
            <Label htmlFor={name}>{label}</Label>
            {renderField()}
        </div>
    );
}
