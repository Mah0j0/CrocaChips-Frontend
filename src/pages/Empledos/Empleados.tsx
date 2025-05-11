import { useState } from "react";
import { useModalContext } from "../../app/providers/ModalContext";
import {useEmpleados} from "../../entities/empleados";
import {LoadData} from "../Plantilla/OtherPage/LoadData.tsx";
import ComponentCard from "../../shared/ui/common/ComponentCard.tsx";
import Alert from "../../shared/ui/alert/Alert.tsx";
import PageMeta from "../../shared/ui/common/PageMeta.tsx";
import PageBreadcrumb from "../../shared/ui/common/PageBreadCrumb.tsx";
import { EmpleadoFilters, EmpleadoTable, CreateEmpleadoModal,EditEmpleadoModal} from '../../features/empleados'
import Button from "../../shared/ui/button/Button.tsx";
import {ChevronLeftIcon, GroupIcon} from "../../shared/icons";

export default function EmpleadosPage() {
    const { openModal } = useModalContext();
    const { data, isLoading, error } = useEmpleados();

    const [filtro, setFiltro] = useState("");
    const [estadoSeleccionado, setEstadoSeleccionado] = useState("true");
    const [rolSeleccionado, setRolSeleccionado] = useState("Almacen");
    const [paginaActual, setPaginaActual] = useState(1);
    const elementosPorPagina = 10;

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
        .filter((empleado) => (rolSeleccionado ? empleado.rol === rolSeleccionado : true));

    // Calcular datos de la página actual
    const indiceInicio = (paginaActual - 1) * elementosPorPagina;
    const indiceFin = indiceInicio + elementosPorPagina;
    const empleadosPaginados = empleadosFiltrados.slice(indiceInicio, indiceFin);
    const totalPaginas = Math.ceil(empleadosFiltrados.length / elementosPorPagina);

    if (isLoading) return <LoadData message="empleado" />;
    if (error)
        return (
            <ComponentCard title="Error">
                <Alert
                    variant="error"
                    title="Error al cargar empleados"
                    message="Ocurrió un error al cargar los empleados."
                    showLink={false}
                />
            </ComponentCard>
        );

    return (
        <div>
            <PageMeta title="Lista de empleados" description="Página de empleados" />
            <PageBreadcrumb pageTitle="Lista de empleados" />

            <div className="space-y-6">
                <ComponentCard title="">
                    <EmpleadoFilters
                        filtro={filtro}
                        setFiltro={setFiltro}
                        estado={estadoSeleccionado}
                        rol={rolSeleccionado}
                        onEstadoChange={setEstadoSeleccionado}
                        onRolChange={setRolSeleccionado}
                        child={
                            <Button
                                size="md"
                                variant="primary"
                                onClick={() => openModal("createEmpleado")}
                                endIcon={<GroupIcon className="size-5" />}
                            >
                                Nuevo Usuario
                            </Button>
                        }
                    />

                    {empleadosFiltrados.length === 0 ? (
                        <ComponentCard title="">
                            <Alert
                                variant="warning"
                                title="No se encontraron resultados"
                                message={`No se encontraron empleados con el filtro "${filtro}".`}
                                showLink={false}
                            />
                        </ComponentCard>
                    ) : (
                        <EmpleadoTable empleados={empleadosPaginados} />
                    )}

                    {/* Paginación */}
                    <div className="flex justify-between items-center mt-4">
                        <Button
                            size="sm"
                            variant="outline"
                            startIcon={<ChevronLeftIcon className="size-6" />}
                            disabled={paginaActual === 1}
                            onClick={() => setPaginaActual((prev) => prev - 1)}
                        >
                            Anterior
                        </Button>
                        <span className="text-gray-400 dark:text-gray-500">
              Página {paginaActual} de {totalPaginas}
            </span>
                        <Button
                            size="sm"
                            variant="outline"
                            endIcon={<ChevronLeftIcon className="rotate-180 size-6" />}
                            disabled={paginaActual === totalPaginas}
                            onClick={() => setPaginaActual((prev) => prev + 1)}
                        >
                            Siguiente
                        </Button>
                    </div>
                </ComponentCard>
            </div>



            <CreateEmpleadoModal />
            <EditEmpleadoModal />
        </div>
    );
}
