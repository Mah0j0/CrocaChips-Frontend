import EditEmpleadoModal from "../empleados/EditEmpleadoModal";
import { useQueryClient } from "@tanstack/react-query";
import { Empleado } from "../../types/empleados";
import { useModalContext } from "../../context/ModalContext.tsx";

export default function UserInfoCard() {
    const {modals, openModal } = useModalContext();
    const queryClient = useQueryClient();
    const data = queryClient.getQueryData<Empleado>(["empleado"]);
    console.log("Estado de modals:", modals);
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
                        <InfoField label="Carnet" value={data?.carnet} />
                        <InfoField label="Teléfono" value={data?.telefono} />
                    </div>
                </div>

                <button
                    onClick={() => openModal("editEmpleado")}
                    className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto"
                >
                    ✏️ Editar
                </button>
            </div>


            <EditEmpleadoModal />
        </div>
    );
}

const InfoField = ({ label, value }: { label: string; value?: string | number }) => (
    <div>
        <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">{label}</p>
        <p className="text-sm font-medium text-gray-800 dark:text-white/90">{value}</p>
    </div>
);