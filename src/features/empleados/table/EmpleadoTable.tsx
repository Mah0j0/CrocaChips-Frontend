import {useModalContext} from "../../../app/providers/ModalContext.tsx";
import {TableCell} from "../../../shared/ui/table";
import Badge from "../../../shared/ui/badge/Badge.tsx";
import Button from "../../../shared/ui/button/Button.tsx";
import {MoreDotIcon} from "../../../shared/icons";
import {Empleado} from "../../../entities/empleados";
import BasicTableOne from "../../../shared/ui/table/BasicTableOne.tsx";

type Props = {
    empleados: Empleado[];
};

export default function EmpleadoTable({ empleados }: Props) {
    const { openModal } = useModalContext();
    const headers = ["Nombre", "Carnet", "Rol", "Telefono", "Estado", ""];

    return (
        <BasicTableOne
            headers={headers}
            data={empleados}
            getKey={(empleado) => empleado.id}
            renderRow={(empleado) => (
                <>
                    <TableCell className="px-5 py-4 sm:px-6 text-start">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 overflow-hidden rounded-full">
                                <img
                                    width={40}
                                    height={40}
                                    src={empleado.imagen || "/images/user/owner.jpg"}
                                    alt={empleado.usuario}
                                />
                            </div>
                            <div>
                                <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                                  {empleado.nombre} {empleado.apellido}
                                </span>
                                                <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                                  {empleado.usuario}
                                </span>
                            </div>
                        </div>
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                        {empleado.carnet}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                        {empleado.rol}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                        {empleado.telefono}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        <Badge
                            size="sm"
                            color={empleado.habilitado ? "success" : "warning"}
                        >
                            {empleado.habilitado ? "Habilitado" : "Deshabilitado"}
                        </Badge>
                    </TableCell>
                    <TableCell>
                        <Button
                            endIcon={<MoreDotIcon className="size-5" />}
                            size="md"
                            variant="outline"
                            onClick={() => openModal("editEmpleado", empleado)}
                        />
                    </TableCell>
                </>
            )}
        />
    );
}
