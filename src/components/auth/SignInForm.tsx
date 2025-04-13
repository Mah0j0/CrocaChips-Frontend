import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../../api/EmpleadoApi.ts";
import { LoginForm, LoginResponse } from "../../types/empleados.ts";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContext";
import { EyeCloseIcon, EyeIcon } from "../../icons";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Button from "../ui/button/Button";

export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    defaultValues: {
      usuario: "",
      clave: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: loginUser,
    onSuccess: ({access, refresh}: LoginResponse) => {
      login(access, refresh);
      toast.success("Bienvenido");
      navigate("/");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const handleLogin = (data: LoginForm) => {
    mutate(data);
  };

  return (
      <div className="flex flex-1 flex-col">
        <ToastContainer />
        <div className="flex flex-1 flex-col justify-center w-full max-w-md mx-auto">
          <header className="mb-5 sm:mb-8">
            <h1 className="text-title-sm sm:text-title-md font-semibold text-gray-800 dark:text-white/90 mb-2">
              Inicio de Sesión
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

            <div>
              <Label htmlFor="password">
                Contraseña <span className="text-error-500">*</span>
              </Label>
              <div className="relative">
                <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Introduce tu contraseña"
                    {...register("clave", {
                      required: "La contraseña es obligatoria",
                    })}
                    error={!!errors.clave}
                    hint={errors.clave?.message}
                />
                <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-30 cursor-pointer"
                    aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                >
                  {showPassword ? (
                      <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                  ) : (
                      <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                  )}
                </button>
              </div>
            </div>

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
