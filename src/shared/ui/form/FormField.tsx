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
                    value={String(value)}
                    onChange={onChangeTextarea}
                    disabled={disabled}
                    error={!!error}
                    hint={errorMessage}
                />
            ) : type === "number" ? (
                    <Input
                        id="number"
                        type={type}
                        value={value}
                        {...(register ? register(name, validation) : {})}
                        ref={el => {
                            if (register) {
                                const { ref } = register(name, validation);
                                if (typeof ref === "function") ref(el);
                                else if (ref) (ref as React.MutableRefObject<HTMLInputElement | null>).current = el;
                            }
                            if (inputRef && el) inputRef.current = el;
                        }}
                        disabled={disabled}
                        error={!!error}
                        hint={errorMessage}
                        onChange={onChange}
                        step={step}
                    />
                ) : (
                <Input
                    id={name}
                    type={type}
                    {...register(name, validation)}
                    ref={el => {
                        const { ref } = register(name, validation);
                        if (typeof ref === "function") ref(el);
                        else if (ref) (ref as React.MutableRefObject<HTMLInputElement | null>).current = el;
                        if (inputRef && el) inputRef.current = el;
                    }}
                    disabled={disabled}
                    error={!!error}
                    hint={errorMessage}
                    onChange={onChange}
                    step={step}
                />
            )}
        </div>
    );
}