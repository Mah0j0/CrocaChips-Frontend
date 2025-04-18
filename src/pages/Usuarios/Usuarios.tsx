import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import ComponentCard from "../../components/common/ComponentCard.tsx";
import BasicTableOne from "../../components/tables/BasicTables/BasicTableOne.tsx";
import {useEmpleados} from "../../hooks/useEmpleado.ts";
import {TableCell} from "../../components/ui/table";
import Badge from "../../components/ui/badge/Badge.tsx";
import Alert from "../../components/ui/alert/Alert.tsx";
import { useState } from "react";
import Input from "../../components/form/input/InputField.tsx";
import { GroupIcon, SearchIcon} from "../../icons";
import Button from "../../components/ui/button/Button.tsx";
import CreateEmpleadoModal from "../../components/empleados/CreateEmpleadoModal.tsx";
import {useModalContext} from "../../context/ModalContext.tsx";
import {InfoIcon} from "../../icons";

export default function Usuarios() {

    const { openModal } = useModalContext();
    const { data, isLoading, error } = useEmpleados();
    const [filtro, setFiltro] = useState("");

    const headers = ["Nombre", "Carnet", "Rol", "Telefono", "Estado",""];

    if (isLoading) {
        return (
            <ComponentCard title="Info Alert">
                <Alert
                    variant="info"
                    title="Cargando"
                    message="Cargando Empleados..."
                    showLink={false}
                />
            </ComponentCard>
        );
    }

    if (error) {
        return (
            <ComponentCard title="Error Alert">
                <Alert
                    variant="error"
                    title="Mensaje de Error"
                    message="Ocurrió un error al cargar los empleados."
                    showLink={false}
                />
            </ComponentCard>
        );
    }

    const empleadosFiltrados = (data ?? []).filter((empleado) =>
        `${empleado.nombre} ${empleado.apellido} ${empleado.usuario}`
            .toLowerCase()
            .includes(filtro.toLowerCase())
    );

    return (
        <div>
            <PageMeta
                title="React.js Blank Dashboard | TailAdmin"
                description="Lista de usuarios"
            />
            <PageBreadcrumb pageTitle="Lista de Usuarios" />

            <div className="space-y-6">
                <ComponentCard title="">
                    <div className="flex flex-row gap-10 items-center justify-between mb-5">
                        <div className="relative">
                            <Input
                                placeholder="Buscar por nombre, apellido o usuario..."
                                type="text"
                                value={filtro}
                                onChange={(e) => setFiltro(e.target.value)}
                                className="pl-[62px]"
                            />
                            <span className="absolute left-0 top-1/2 -translate-y-1/2 border-r border-gray-200 px-3.5 py-3 text-gray-500 dark:border-gray-800 dark:text-gray-400">
                                <SearchIcon className="size-6" />
                            </span>
                        </div>
                        <Button
                            size="md"
                            variant="primary"
                            onClick={() => openModal("createEmpleado")}
                            endIcon={<GroupIcon className="size-5" />}
                        >
                            Nuevo Usuario
                        </Button>
                        <CreateEmpleadoModal/>
                    </div>
                    {/* Tabla */}
                    {empleadosFiltrados.length === 0 ? (
                        <ComponentCard title="">
                            <Alert
                                variant="warning"
                                title="No se encontraron resultados"
                                message={`No se encontraron usuarios con el nombre "${filtro}".`}
                                showLink={false}
                            />
                        </ComponentCard>
                    ) : (
                        <BasicTableOne
                            headers={headers}
                            data={empleadosFiltrados}
                            getKey={(empleado) => empleado.id}
                            renderRow={(empleado) => (
                                <>
                                    <TableCell className="px-5 py-4 sm:px-6 text-start">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 overflow-hidden rounded-full">
                                                <img
                                                    width={40}
                                                    height={40}
                                                    src={
                                                        empleado.imagen
                                                            ? empleado.imagen
                                                            : "/images/user/owner.jpg"
                                                    }
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
                                            color={
                                                empleado.habilitado
                                                    ? "success"
                                                    : !empleado.habilitado
                                                        ? "warning"
                                                        : "error"
                                            }
                                        >
                                            {empleado.habilitado ? "Habilitado" : "Deshabilitado"}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <Button
                                                endIcon={<InfoIcon/>}
                                                variant="primary"
                                                size="sm"
                                                onClick={() =>
                                                    openModal("editEmpleado")
                                                }
                                            >
                                                Editar
                                            </Button>
                                            <Button
                                                size="sm"
                                                onClick={() =>
                                                    openModal("deleteEmpleado")
                                                }
                                            >
                                                Eliminar
                                            </Button>
                                        </div>
                                    </TableCell>
                                </>
                            )}
                        />
                    )}
                </ComponentCard>
            </div>
        </div>
    );
}
