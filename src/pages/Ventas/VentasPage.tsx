import PageBreadcrumb from "../../shared/ui/common/PageBreadCrumb.tsx";
import PageMeta from "../../shared/ui/common/PageMeta.tsx";
import { useState } from "react"; // Hook de estado de React
import {useVentas, Venta} from "../../entities/ventas"; // Hook para datos de ventas
import Alert from "../../shared/ui/alert/Alert.tsx"; // Componente de alerta
import ComponentCard from "../../shared/ui/common/ComponentCard.tsx"; // Contenedor de componentes
import { LoadData } from "../Plantilla/OtherPage/LoadData.tsx"; // Carga de datos
import {Pagination} from "../../shared/ui/table/Pagination.tsx";
import VentaTable from "../../features/ventas/table/VentaTable.tsx";
import Button from "../../shared/ui/button/Button.tsx";
import {PlusIcon} from "../../shared/icons";
import { PrintIcon } from "../../shared/icons";
import { useModalContext } from "../../app/providers/ModalContext.tsx";//Modales
import {DetalleVentaModal} from "../../entities/ventas";
import {CreateVentaModal, VentaFilters} from "../../features/ventas"
import PrintVentaModal from "../../features/ventas/print-venta/ui/PrintVentaModal.tsx"; // Modal para imprimir ventas

// Componente principal de ventas
export default function VentasPage() {
    const { data, isLoading, error } = useVentas(); // Datos
    const { openModal } = useModalContext(); // Abrir modales
    const [ventaSeleccionada, setVentaSeleccionada] = useState<Venta|null>(null);
    const [filtro, setFiltro] = useState(""); // Filtrar ventas
    const [estadoSeleccionado, setEstadoSeleccionado] = useState<string>("true");
    const [fechaInicio, setFechaInicio] = useState<Date | null>(null); // Fecha de inicio
    const [fechaFin, setFechaFin] = useState<Date | null>(null); // Fecha de fin
    const [paginaActual, setPaginaActual] = useState(1); //Paginación
    const elementosPorPagina = 10; // Items por página

    const handleVerDetalles = (venta: Venta) => {
        setVentaSeleccionada(venta); // Guarda la venta seleccionada
        openModal("detalleVenta"); // Abre el modal
    };


    if (isLoading) return (<LoadData message={"Ventas"} />);

    if (error) {
        return (
            <ComponentCard title="Error Alert">
                <Alert
                    variant="error"
                    title="Mensaje de Error"
                    message="Ocurrió un error al cargar las ventas."
                    showLink={false}
                />
            </ComponentCard>
        );
    }

    // Filtro de barra de búsqueda y estado
    const ventasFiltradas = (data ?? [])
        .filter((venta) =>
            `${venta.cliente_nombre || ''} ${venta.vendedor_nombre || ''}`
                .toLowerCase()
                .includes(filtro.toLowerCase())
        )
        .filter((venta) =>
            estadoSeleccionado === ""
                ? true
                : venta.estado?.toString() === estadoSeleccionado
        )
        .filter((venta) =>
            (fechaInicio && fechaFin) ? new Date(venta.fecha) >= fechaInicio && new Date(venta.fecha) <= fechaFin : true
        );

    // Paginación
    const indiceInicio = (paginaActual - 1) * elementosPorPagina;
    const indiceFin = indiceInicio + elementosPorPagina;
    const ventasPaginadas = ventasFiltradas.slice(indiceInicio, indiceFin);
    const totalPaginas = Math.ceil(ventasFiltradas.length / elementosPorPagina);

    // Renderizado principal
    return (
        <div>
            {/* Metadatos y ruta de navegación */}
            <PageMeta
                title="Ventas"
                description="Lista de ventas"
            />

            {/* Contenedor principal */}
            <PageBreadcrumb pageTitle="Lista de ventas" />
            <div className="space-y-1">
                <ComponentCard title="">

                    {/* Filtros */}
                    <VentaFilters
                        filtro={filtro}
                        setFiltro={setFiltro}
                        estado={estadoSeleccionado}
                        fechaInicio={fechaInicio}
                        fechaFin={fechaFin}
                        setFechaInicio={setFechaInicio}
                        setFechaFin={setFechaFin}
                        onEstadoChange={setEstadoSeleccionado}
                        print={
                            <Button
                                size="sm"
                                variant="primary"
                                startIcon={<PrintIcon className="size-5" />}
                                onClick={() => openModal("printVenta")} // Abre modal de impresión
                            >                       
                            </Button>
                        }
                        child={                         
                            <Button
                                size="sm"
                                variant="primary"
                                startIcon={<PlusIcon className="size-5" />}
                                onClick={() => openModal("createVenta")} // Abre modal de creación
                            >
                                Agregar Venta
                            </Button>
                        }
                    />

                    {/* Tabla de ventas*/}
                    {ventasFiltradas.length === 0 ? (
                        <ComponentCard title="">
                            <Alert
                                variant="warning"
                                title="No se encontraron resultados"
                                message={`No se encontraron ventas con el término "${filtro}".`}
                                showLink={false}
                            />
                        </ComponentCard>
                    ) : (
                        <VentaTable
                            ventas={ventasPaginadas}
                            onVerDetalles={handleVerDetalles}
                        />
                    )}

                    {/* Paginación */}
                    <Pagination
                        paginaActual={paginaActual}
                        totalPaginas={totalPaginas}
                        onPrev={() => setPaginaActual((prev) => prev - 1)}
                        onNext={() => setPaginaActual((prev) => prev + 1)}
                    />
                </ComponentCard>
            </div>
            {/* Modales */}
            <CreateVentaModal />
            {ventaSeleccionada && (
                <DetalleVentaModal
                    idVenta={ventaSeleccionada.id_venta}
                    venta={ventaSeleccionada}
                />
            )}
            <PrintVentaModal
                ventasFiltradas={ventasFiltradas}
                filtro={filtro}
                fechaInicio={fechaInicio}
                fechaFin={fechaFin}
            />
        </div>
    );
}