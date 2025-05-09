import { FieldErrors, RegisterOptions, UseFormRegister, FieldValues, Path } from "react-hook-form";
import Input from "../../../shared/ui/form/input/InputField";
import Label from "../../../shared/ui/form/Label";

type PropsFormField<T extends FieldValues> = {
     label: string;
     name: Path<T>;
     register: UseFormRegister<T>;
     errors: FieldErrors<T>;
     disabled?: boolean;
     validation?: RegisterOptions<T>;
};

export function FormField<T extends FieldValues>({
     label,
     name,
     register,
     errors,
     disabled = false,
     validation = {},
}: PropsFormField<T>) {
     return (
         <div>
             <Label htmlFor={String(name)}>{label}</Label>
             <Input
                 id={String(name)}
                 {...register(name, validation)}
                 disabled={disabled}
                 error={!!errors[name]}
                 hint={errors[name]?.message?.toString()}
             />
         </div>
     );
}