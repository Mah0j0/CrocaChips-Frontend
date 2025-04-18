import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import ComponentCard from "../../components/common/ComponentCard.tsx";
import BasicTableOne from "../../components/tables/BasicTables/BasicTableOne.tsx";
import { TableCell } from "../../components/ui/table";
import Badge from "../../components/ui/badge/Badge.tsx";
import Alert from "../../components/ui/alert/Alert.tsx";
import Input from "../../components/form/input/InputField.tsx";
import {ChevronLeftIcon, GroupIcon, MoreDotIcon, SearchIcon} from "../../icons";
import Button from "../../components/ui/button/Button.tsx";
import { useModalContext } from "../../context/ModalContext.tsx";
import Label from "../../components/form/Label.tsx";
import Select from "../../components/form/Select.tsx";
import { estados } from "../../data";
import {useState} from "react";
import {LoadData} from "../OtherPage/LoadData.tsx";
import {useClientes} from "../../hooks/useCliente.ts";
import CreateClienteModal from "../../components/clientes/CreateClienteModal.tsx";
import EditClienteModal from "../../components/clientes/EditClienteModal.tsx";


export default function ClientesPage() {
    const { openModal } = useModalContext();
    const { data, isLoading, error } = useClientes();
    const [filtro, setFiltro] = useState("");
    const [estadoSeleccionado, setEstadoSeleccionado] = useState<string>("true");
    const [paginaActual, setPaginaActual] = useState(1);
    const elementosPorPagina = 10;

    const headers = ["Nombre", "Dirección", "Telefono", "Estado", "Registro", ""];

    const handleSelectChange = (value: string, type: "estado") => {
        if (type === "estado") {
            setEstadoSeleccionado(value);
        }
    };

    if (isLoading) {
        return (<LoadData message={"Clientes"}/>)
    }

    if (error) {
        return (
            <ComponentCard title="Error Alert">
                <Alert
                    variant="error"
                    title="Mensaje de Error"
                    message="Ocurrió un error al cargar los Clientes."
                    showLink={false}
                />
            </ComponentCard>
        );
    }

    // Filtrar empleados
    const clientesFiltrados = (data ?? [])
        .filter((cliente) =>
            `${cliente.nombre}`
                .toLowerCase()
                .includes(filtro.toLowerCase())
        )
        .filter((cliente) =>
            estadoSeleccionado ? cliente.habilitado.toString() === estadoSeleccionado : true
        )

    // Calcular datos de la página actual
    const indiceInicio = (paginaActual - 1) * elementosPorPagina;
    const indiceFin = indiceInicio + elementosPorPagina;
    const empleadosPaginados = clientesFiltrados.slice(indiceInicio, indiceFin);

    // Calcular el número total de páginas
    const totalPaginas = Math.ceil(clientesFiltrados.length / elementosPorPagina);


    return (
        <div>
            <PageMeta
                title="React.js Blank Dashboard | TailAdmin"
                description="Lista de Clientes"
            />
            <PageBreadcrumb pageTitle="Lista de Clientes" />

            <div className="space-y-6">
                <ComponentCard title="">
                    <div className="flex flex-row gap-10 items-center justify-between mb-5">
                        <div className="relative">
                            <Input
                                placeholder="Buscar por nombre ..."
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

                        <Button
                            size="md"
                            variant="primary"
                            onClick={() => openModal("createCliente")}
                            endIcon={<GroupIcon className="size-5" />}
                        >
                            Nuevo Cliente
                        </Button>
                        <CreateClienteModal />
                    </div>
                    {/* Tabla */}
                    {clientesFiltrados.length === 0 ? (
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
                            getKey={(cliente) => cliente.id_cliente}
                            renderRow={(cliente) => (
                                <>
                                    <TableCell className="px-5 py-4 sm:px-6 text-start">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 overflow-hidden rounded-full">
                                                <img
                                                    width={40}
                                                    height={40}
                                                    src={
                                                        cliente.imagen
                                                            ? cliente.imagen
                                                            : "/images/user/user-01.jpg"
                                                    }
                                                    alt={cliente.nombre}
                                                />
                                            </div>
                                            <div>
                                                <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                                                    {cliente.nombre}
                                                </span>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                                        {cliente.direccion}
                                    </TableCell>
                                    <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                                        {cliente.telefono}
                                    </TableCell>
                                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                        <Badge
                                            size="sm"
                                            color={
                                                cliente.habilitado
                                                    ? "success"
                                                    : !cliente.habilitado
                                                        ? "warning"
                                                        : "error"
                                            }
                                        >
                                            {cliente.habilitado ? "Habilitado" : "Deshabilitado"}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                                        {new Date(cliente.created_at).toLocaleDateString("es-ES", {
                                            day: "2-digit",
                                            month: "2-digit",
                                            year: "numeric",
                                        })}
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            endIcon={<MoreDotIcon className="size-5" />}
                                            size="md"
                                            variant="outline"
                                            onClick={() => openModal("editCliente", cliente)} // Pasar datos del cliente
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
            <EditClienteModal />
        </div>
    );
}