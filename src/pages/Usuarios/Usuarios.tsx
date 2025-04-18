import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import ComponentCard from "../../components/common/ComponentCard.tsx";
import BasicTableOne from "../../components/tables/BasicTables/BasicTableOne.tsx";
import { useEmpleados } from "../../hooks/useEmpleado.ts";
import { TableCell } from "../../components/ui/table";
import Badge from "../../components/ui/badge/Badge.tsx";
import Alert from "../../components/ui/alert/Alert.tsx";
import Input from "../../components/form/input/InputField.tsx";
import {ChevronLeftIcon, GroupIcon, MoreDotIcon, SearchIcon} from "../../icons";
import Button from "../../components/ui/button/Button.tsx";
import CreateEmpleadoModal from "../../components/empleados/CreateEmpleadoModal.tsx";
import { useModalContext } from "../../context/ModalContext.tsx";
import EditEmpleadoModal from "../../components/empleados/EditEmpleadoModal.tsx";
import Label from "../../components/form/Label.tsx";
import Select from "../../components/form/Select.tsx";
import { estados, roles } from "../../data";
import {useState} from "react";
import {LoadData} from "../OtherPage/LoadData.tsx";

export default function Usuarios() {
    const { openModal } = useModalContext();
    const { data, isLoading, error } = useEmpleados();
    const [filtro, setFiltro] = useState("");
    const [estadoSeleccionado, setEstadoSeleccionado] = useState<string>("true");
    const [rolSeleccionado, setRolSeleccionado] = useState<string>("Almacen");
    const [paginaActual, setPaginaActual] = useState(1);
    const elementosPorPagina = 10;

    const headers = ["Nombre", "Carnet", "Rol", "Telefono", "Estado", ""];

    const handleSelectChange = (value: string, type: "estado" | "rol") => {
        if (type === "estado") {
            setEstadoSeleccionado(value);
        } else {
            setRolSeleccionado(value);
        }
    };

    if (isLoading) {
        return (<LoadData message={"empleado"}/>)
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

    // Filtrar empleados
    const empleadosFiltrados = (data ?? [])
        .filter((empleado) =>
            `${empleado.nombre} ${empleado.apellido} ${empleado.usuario}`
                .toLowerCase()
                .includes(filtro.toLowerCase())
        )
        .filter((empleado) =>
            estadoSeleccionado ? empleado.habilitado.toString() === estadoSeleccionado : true
        )
        .filter((empleado) =>
            rolSeleccionado ? empleado.rol === rolSeleccionado : true
        );

    // Calcular datos de la página actual
    const indiceInicio = (paginaActual - 1) * elementosPorPagina;
    const indiceFin = indiceInicio + elementosPorPagina;
    const empleadosPaginados = empleadosFiltrados.slice(indiceInicio, indiceFin);

    // Calcular el número total de páginas
    const totalPaginas = Math.ceil(empleadosFiltrados.length / elementosPorPagina);


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

                        <div className="flex flex-row gap-3 items-center justify-between">
                            <Label>Estado</Label>
                            <Select
                                options={estados.map((estado) => ({
                                    value: estado.value.toString(),
                                    label: estado.label,
                                }))}
                                defaultValue={estados[0].value.toString()}
                                placeholder="Seleccionar Estado"
                                onChange={(value) => handleSelectChange(value, "estado")}
                                className="dark:bg-dark-900"
                            />
                        </div>
                        <div className="flex flex-row gap-3 items-center justify-between">
                            <Label>Rol</Label>
                            <Select
                                options={roles.map((rol) => ({
                                    value: rol.value.toString(),
                                    label: rol.label,
                                }))}
                                defaultValue={roles[0].value.toString()}
                                placeholder="Seleccionar Rol"
                                onChange={(value) => handleSelectChange(value, "rol")}
                                className="dark:bg-dark-900"
                            />
                        </div>

                        <Button
                            size="md"
                            variant="primary"
                            onClick={() => openModal("createEmpleado")}
                            endIcon={<GroupIcon className="size-5" />}
                        >
                            Nuevo Usuario
                        </Button>
                        <CreateEmpleadoModal />
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
                            data={empleadosPaginados}
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
                                        <Button
                                            endIcon={<MoreDotIcon className="size-5" />}
                                            size="md"
                                            variant="outline"
                                            onClick={() => openModal("editEmpleado", empleado)} // Pasar datos del empleado
                                        />
                                    </TableCell>
                                </>
                            )}
                        />
                    )}
                    {/* Controles de paginación */}
                    <div className="flex justify-between items-center mt-4">
                        <Button
                            size="sm"
                            variant="outline"
                            startIcon={<ChevronLeftIcon className="size-6"/>}
                            disabled={paginaActual === 1}
                            onClick={() => setPaginaActual(paginaActual - 1)}
                        >
                            Anterior
                        </Button>
                        <span className="text-gray-400 dark:text-gray-500">
                            Página {paginaActual} de {totalPaginas}
                        </span>
                        <Button
                            size="sm"
                            variant="outline"
                            endIcon={<ChevronLeftIcon className="rotate-180 size-6"/>}
                            disabled={paginaActual === totalPaginas}
                            onClick={() => setPaginaActual(paginaActual + 1)}
                        >
                            Siguiente
                        </Button>
                    </div>
                </ComponentCard>
            </div>
            <EditEmpleadoModal />
        </div>
    );
}