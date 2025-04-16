import { useEffect } from "react";
import { useModal } from "../../hooks/useModal";
import { Modal } from "../ui/modal";
import Button from "../ui/button/Button";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import { Empleado } from "../../types/empleados.ts";
import Select from "../form/Select.tsx";
import { roles } from "../../data";
import {FieldErrors, useForm, UseFormRegister} from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editUser } from "../../api/EmpleadoApi.ts";
import { toast } from "react-toastify";

export default function UserInfoCard() {
  const { isOpen, openModal, closeModal } = useModal();
  const queryClient = useQueryClient();
  const data = queryClient.getQueryData<Empleado>(["empleado"]);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<Empleado>();

  useEffect(() => {
    if (isOpen && data) {
      reset(data);
    }
  }, [isOpen, data, reset]);

  const { mutate, isPending } = useMutation({
    mutationFn: editUser,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["empleado"] });
      toast.success("Perfil actualizado correctamente");
      closeModal();
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const handleEmpleadoEdit = (formData: Empleado) => {
    mutate(formData);
  };

  return (
      <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
              Información Personal
            </h4>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
              <InfoField label="Nombre" value={data?.nombre} />
              <InfoField label="Apellidos" value={data?.apellido} />
              <InfoField label="Usuario" value={data?.usuario} />
              <InfoField label="Teléfono" value={data?.telefono} />
            </div>
          </div>

          <button
              onClick={openModal}
              className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto"
          >
            ✏️ Editar
          </button>
        </div>

        <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
          <div className="no-scrollbar w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              Editar Información Personal
            </h4>
            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
              Mantén actualizada tu información personal
            </p>

            <form className="space-y-6" onSubmit={handleSubmit(handleEmpleadoEdit)}>
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <FormField label="Nombre" name="nombre" register={register} errors={errors} />
                <FormField label="Apellidos" name="apellido" register={register} errors={errors} />
                <FormField label="Usuario" name="usuario" register={register} errors={errors} disabled />
                <FormField label="Carnet" name="carnet" register={register} errors={errors} disabled />
                <div>
                  <Label>Rol</Label>
                  <Select
                      disabled={data?.rol !== "Administrador"}
                      options={roles}
                      defaultValue={data?.rol}
                      onChange={(value) => setValue("rol", value)}
                      className="dark:bg-dark-900"
                  />
                </div>
                <FormField label="Teléfono" name="telefono" register={register} errors={errors} />
              </div>

              <div className="flex items-center gap-3 justify-end">
                <Button size="sm" variant="outline" onClick={closeModal}>
                  Cancelar
                </Button>
                <Button size="sm" type="submit" disabled={isPending}>
                  Guardar Cambios
                </Button>
              </div>
            </form>
          </div>
        </Modal>
      </div>
  );
}

const InfoField = ({ label, value }: { label: string; value?: string| number }) => (
    <div>
      <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">{label}</p>
      <p className="text-sm font-medium text-gray-800 dark:text-white/90">{value}</p>
    </div>
);

type PropsFormField = {
  label: string;
  name: keyof Empleado; // Restringimos el tipo de name a las claves de Empleado
  register: UseFormRegister<Empleado>;
  errors: FieldErrors<Empleado>;
  disabled?: boolean;
};
const FormField = ({ label, name, register, errors, disabled = false }: PropsFormField) => (
    <div>
      <Label>{label}</Label>
      <Input
          type="text"
          {...register(name,{
            required: `El ${label} de usuario es obligatorio`,
          })} // Ahora name está restringido a las claves de Empleado
          disabled={disabled}
          error={!!errors[name]}
          hint={errors[name]?.message}
      />
    </div>
);