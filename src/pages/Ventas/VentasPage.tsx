// Componentes para el layout de la página
import PageBreadcrumb from "../../shared/ui/common/PageBreadCrumb.tsx";
import PageMeta from "../../shared/ui/common/PageMeta.tsx";
import Label from "../../shared/ui/form/Label.tsx";
import Select from "../../shared/ui/form/Select.tsx";
import { estadosVenta } from "../../shared/data";
// React y Hooks
import { useState } from "react"; // Hook de estado de React
import {useVentas, Venta} from "../../entities/ventas"; // Hook para datos de ventas
import { useModalContext } from "../../shared/context/ModalContext"; // Contexto de modales

// Modales
import {DetalleVentaModal} from "../../entities/ventas";
import {CreateVentaModal} from "../../features/ventas"

// Componentes UI 
import Alert from "../../shared/ui/alert/Alert.tsx"; // Componente de alerta
import Button from "../../shared/ui/button/Button.tsx"; // Botón personalizado
import Badge from "../../shared/ui/badge/Badge.tsx"; // Badge para estados
import Input from "../../shared/ui/form/input/InputField.tsx"; // Campo de entrada de texto
import ComponentCard from "../../shared/ui/common/ComponentCard.tsx"; // Contenedor de componentes
import { TableCell } from "../../shared/ui/table"; // Celda de tabla personalizada

// Tablas y carga
import BasicTableOne from "../../shared/ui/table/BasicTableOne.tsx"; // Componente de tabla
import { LoadData } from "../OtherPage/LoadData.tsx"; // Carga de datos

// Iconos
import { SearchIcon, PlusIcon, ChevronLeftIcon, EyeIcon } from "../../shared/icons/index.ts"; // Iconos SVG

// Librerias
import DatePicker from "react-datepicker"; // Selector de fecha
import "react-datepicker/dist/react-datepicker.css"


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

    //Cabeceras de la tabla
    const headers = [
        "Cliente",
        "Vendedor",
        "Fecha",
        "Total",
        "Estado",
        "Acciones"
    ];

    const handleVerDetalles = (venta: Venta) => {
        setVentaSeleccionada(venta); // Guarda la venta seleccionada
        openModal("detalleVenta"); // Abre el modal
    };

    const handleSelectChange = (value: string, type: "estado") => {
        if (type === "estado") {
            setEstadoSeleccionado(value);
        }
    }

    // Estados de carga
    if (isLoading) {
        return (<LoadData message={"Ventas"} />)
    }
    // Manejo de errores
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
                title="React.js Blank Dashboard | TailAdmin"
                description="Lista de ventas"
            />

            {/* Contenedor principal */}
            <PageBreadcrumb pageTitle="Lista de ventas" />
            <div className="space-y-6">
                <ComponentCard title="">

                    {/* Barra de búsqueda y botón de agregar venta */}
                    <div className="flex flex-row gap-10 items-center justify-between mb-5">

                        {/* Barra de búsqueda */}
                        <div className="relative">
                            <Input
                                placeholder="Buscar por cliente, vendedor..."
                                type="text"
                                value={filtro}
                                onChange={(e) => setFiltro(e.target.value)} // Actualiza estado al escribir
                                className="pl-[62px]"
                            />
                            <span className="absolute left-0 top-1/2 -translate-y-1/2 border-r border-gray-200 px-3.5 py-3 text-gray-500 dark:border-gray-800 dark:text-gray-400">
                                <SearchIcon className="size-6" />
                            </span>
                        </div>
                        <div className="flex flex-row gap-3 items-center justify-between">
                            <Label>Estado</Label>
                            <Select
                                options={estadosVenta.map((estado) => ({
                                    value: estado.value.toString(),
                                    label: estado.label,
                                }))}
                                defaultValue={estadosVenta[0].value.toString()}
                                placeholder="Seleccionar Estado"
                                onChange={(value) => handleSelectChange(value, "estado")}
                                className="dark:bg-dark-900"
                            />
                        </div>

                        {/* Filtros de fecha */}
                        <div className="flex flex-row gap-3 items-center justify-between">
                            <div className="flex flex-col">
                                <div className="flex items-center gap-2">
                                    <Label>Rango de Fechas</Label>
                                    <DatePicker
                                        selected={fechaInicio}
                                        onChange={(dates) => {
                                            const [start, end] = dates as [Date | null, Date | null];
                                            setFechaInicio(start);
                                            setFechaFin(end);
                                        }}
                                        startDate={fechaInicio}
                                        endDate={fechaFin}
                                        selectsRange
                                        dateFormat="yyyy-MM-dd"
                                        placeholderText="Selecciona un rango de fechas"
                                        className="px-3 py-2 border border-gray-300 rounded-md dark:bg-dark-900 dark:text-white"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Botón para agregar venta */}
                        <div className="flex flex-row-reer gap-3 items-center justify-end">
                            <Button
                                size="md"
                                variant="primary"
                                startIcon={<PlusIcon className="size-5" />}
                                onClick={() => openModal("createVenta")} // Abre modal de creación
                            >
                                Nueva Venta
                            </Button>
                        </div>
                    </div>

                    {/* Tabla de ventas*/}
                    {ventasFiltradas.length === 0 ? (
                        // Mensaje si no hay resultados
                        <ComponentCard title="">
                            <Alert
                                variant="warning"
                                title="No se encontraron resultados"
                                message={`No se encontraron ventas con el término "${filtro}".`}
                                showLink={false}
                            />
                        </ComponentCard>
                    ) : (

                        // Tabla con datos paginados
                        <BasicTableOne
                            headers={headers} // Cabeceras
                            data={ventasPaginadas} // Datos paginados
                            getKey={(venta) => venta.id_venta} // Key para cada fila
                            renderRow={(venta) => ( // Renderizado por fila
                                <>
                                    {/* Cliente */}
                                    <TableCell className="p-4 py-5 sm:px-6">
                                        <p className="font-medium text-theme-sm text-gray-800 dark:text-white/90">
                                            {venta.cliente_nombre}
                                        </p>
                                    </TableCell>
                                    {/* Vendedor */}
                                    <TableCell className="p-4 py-5 sm:px-6">
                                        <p className="font-medium text-theme-sm text-gray-800 dark:text-white/90">
                                            {venta.vendedor_nombre}
                                        </p>
                                    </TableCell>
                                    {/* Fecha */}
                                    <TableCell className="p-4 py-5 sm:px-6">
                                        <p className="font-medium text-theme-sm text-gray-800 dark:text-white/90">
                                            {venta.fecha}
                                        </p>
                                    </TableCell>
                                    {/* Total */}
                                    <TableCell className="p-4 py-5 sm:px-6">
                                        <p className="font-medium text-theme-sm text-gray-800 dark:text-white/90">
                                            {venta.precio_total}
                                        </p>
                                    </TableCell>
                                    {/* Estado */}
                                    <TableCell className="p-4 py-5 sm:px-6">
                                        <Badge
                                            size="md"
                                            color={venta.estado ? "success" : "warning"}
                                        >
                                            {venta.estado ? "Confirmada" : "Pendiente"}
                                        </Badge>
                                    </TableCell>
                                    {/* Acciones */}
                                    <TableCell>
                                        <Button
                                            size="md"
                                            variant="outline"
                                            startIcon={<EyeIcon className="size-5" />}
                                            //onClick={() => openModal("detalleVenta", { venta })}
                                            onClick={() => handleVerDetalles(venta)}
                                        >
                                            Ver detalles
                                        </Button>
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
                            startIcon={<ChevronLeftIcon className="size-6" />}
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
                            endIcon={<ChevronLeftIcon className="rotate-180 size-6" />}
                            disabled={paginaActual === totalPaginas}
                            onClick={() => setPaginaActual(paginaActual + 1)}
                        >
                            Siguiente
                        </Button>
                    </div>
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
        </div>
    );
}