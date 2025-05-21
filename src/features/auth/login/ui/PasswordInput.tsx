import { useState } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import { EyeCloseIcon, EyeIcon } from "../../../../shared/icons";
import Label from "../../../../shared/ui/form/Label.tsx";
import Input from "../../../../shared/ui/form/input/InputField.tsx";

type PasswordInputProps = {
    label?: string;
    register: UseFormRegisterReturn;
    error?: boolean;
    hint?: string;
    id?: string;
};

export default function PasswordInput({
                                          label = "Contraseña",
                                          register,
                                          error = false,
                                          hint,
                                          id = "password",
                                      }: PasswordInputProps) {
    const [visible, setVisible] = useState(false);

    return (
        <div>
            <Label htmlFor={id}>
                {label} <span className="text-error-500">*</span>
            </Label>
            <div className="relative">
                <Input
                    id={id}
                    type={visible ? "text" : "password"}
                    placeholder="Introduce tu contraseña"
                    autoComplete="current-password"
                    {...register}
                    error={error}
                    hint={hint}
                    aria-invalid={error}
                />
                <button
                    type="button"
                    onClick={() => setVisible((v) => !v)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-30 cursor-pointer"
                    aria-label={visible ? "Ocultar contraseña" : "Mostrar contraseña"}
                >
                    {visible ? (
                        <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                    ) : (
                        <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                    )}
                </button>
            </div>
        </div>
    );
}
