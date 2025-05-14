import { useForm } from "react-hook-form";
import Label from "../../../../shared/ui/form/Label.tsx";
import Input from "../../../../shared/ui/form/input/InputField.tsx";
import Button from "../../../../shared/ui/button/Button.tsx";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginForm } from "../model/schema.ts";
import {useLogin} from "../hooks/useAuth.ts";
import PasswordInput from "./PasswordInput.tsx";

export default function SignInForm() {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      usuario: "",
      clave: "",
    },
  });

  const { mutate, isPending } = useLogin();

  const handleLogin = (data: LoginForm) => {
    mutate(data);
  };

  return (
      <div className="flex flex-1 flex-col">
        <div className="flex flex-1 flex-col justify-center w-full max-w-md mx-auto">
          <header className="mb-5 sm:mb-8">
            <h1 className="text-title-sm sm:text-title-md font-semibold text-gray-800 dark:text-white/90 mb-2">
              Bienvenido de vuelta!
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Ingresa tus credenciales
            </p>
          </header>

          <form onSubmit={handleSubmit(handleLogin)} className="space-y-6">
            <div>
              <Label htmlFor="usuario">
                Usuario <span className="text-error-500">*</span>
              </Label>
              <Input
                  id="usuario"
                  placeholder="HGutierrez13"
                  type="text"
                  {...register("usuario", {
                    required: "El nombre de usuario es obligatorio",
                  })}
                  error={!!errors.usuario}
                  hint={errors.usuario?.message}
              />
            </div>

            <PasswordInput
                register={register("clave")}
                error={!!errors.clave}
                hint={errors.clave?.message}
            />

            <div>
              <Button className="w-full" size="sm" type="submit" disabled={isPending}>
                Iniciar
              </Button>
            </div>
          </form>
        </div>
      </div>
  );
}
