// Inicio de pagina
import PageBreadcrumb from "../../shared/ui/common/PageBreadCrumb.tsx";
import PageMeta from "../../shared/ui/common/PageMeta.tsx";
// Recepciones
import { useRecepciones } from "../../entities/movimientos";
//Para tablas
import { SearchIcon, PlusIcon, HorizontaLDots, ChevronLeftIcon } from "../../shared/icons/index.ts";
import { useState } from "react";
import { TableCell } from "../../shared/ui/table";
import BasicTableOne from "../../shared/ui/table/BasicTableOne.tsx";
import Alert from "../../shared/ui/alert/Alert.tsx";
import Input from "../../shared/ui/form/input/InputField.tsx";
import ComponentCard from "../../shared/ui/common/ComponentCard.tsx";
import Button from "../../shared/ui/button/Button.tsx";
// Modals
import { useModalContext } from "../../app/providers/ModalContext";
import { CreateRecepcionModal, EditRecepcionModal } from "../../features/recepciones";

export default function RecepcionesPage() {
  const { openModal } = useModalContext();
  const { data, isLoading, isError } = useRecepciones();
  const [filtro, setFiltro] = useState("");
  const [paginaActual, setPaginaActual] = useState(1);
  const elementosPorPagina = 10;

  // Cabeceras 
  const headers = [
    "Vendedor",
    "Producto",
    "Cantidad",
    "Fecha de recepción",
    "Acciones"
  ];

  // Manejo de estados de carga
  if (isLoading) {
    return (
      <ComponentCard title="Info Alert">
        <Alert
          variant="info"
          title="Cargando"
          message="Cargando Recepciones..."
          showLink={false}
        />
      </ComponentCard>
    );
  }

  if (isError || !data) {
    return (
      <ComponentCard title="Error Alert">
        <Alert
          variant="error"
          title="Mensaje de Error"
          message="Ocurrió un error al cargar las recepciones."
          showLink={false}
        />
      </ComponentCard>
    );
  }

  // Ordenar y filtrar recepciones
  const recepcionesFiltradas = (data ?? [])
    // Ordenar por id de forma descendente
    .sort((a, b) => b.id_movimiento - a.id_movimiento)
    // Filtrar según búsqueda
    .filter((recepcion) =>
      `${recepcion.vendedor_nombre} ${recepcion.producto_nombre} ${recepcion.tipo_movimiento}`
        .toLowerCase()
        .includes(filtro.toLowerCase())
    )

  // Paginación
  const indiceInicio = (paginaActual - 1) * elementosPorPagina;
  const indiceFin = indiceInicio + elementosPorPagina;
  const recepcionesPaginadas = recepcionesFiltradas.slice(indiceInicio, indiceFin);
  const totalPaginas = Math.ceil(recepcionesFiltradas.length / elementosPorPagina);

  // Renderizar la tabla
  return (
    <div>
      <PageMeta
        title="Recepciones"
        description="Lista de recepciones"
      />
      <PageBreadcrumb pageTitle="Recepciones de productos" />
      <div className="space-y-6">
        <ComponentCard title="">
          <div className="flex flex-row gap-10 items-center justify-between mb-5">
            {/* Barra de búsqueda */}
            <div className="relative">
              <Input
                placeholder="Vendedor, producto ..."
                type="text"
                value={filtro}
                onChange={(e) => setFiltro(e.target.value)}
                className="pl-[62px]"
              />
              <span className="absolute left-0 top-1/2 -translate-y-1/2 border-r border-gray-200 px-3.5 py-3 text-gray-500 dark:border-gray-800 dark:text-gray-400">
                <SearchIcon className="size-6" />
              </span>
            </div>
            <div className="flex flex-row-reer gap-3 items-center justify-end">
              {/* Botón para agregar producto */}
              <Button
                size="md"
                variant="primary"
                startIcon={<PlusIcon className="size-5" />}
                onClick={() => openModal("createRecepcion")}
              >
                Agregar Recepción
              </Button>
              {/* Modal de agregar producto */}
            </div>
          </div>
          {/* Tabla */}
          {recepcionesFiltradas.length === 0 ? (
            <ComponentCard title="">
              <Alert
                variant="warning"
                title="No se encontraron resultados"
                message={`No se encontraron recepciones con el nombre "${filtro}".`}
                showLink={false}
              />
            </ComponentCard>
          ) : (
            <BasicTableOne
              headers={headers}
              data={recepcionesPaginadas}
              getKey={(recepcion) => recepcion.id_movimiento}
              renderRow={(recepcion) => (
                <>
                  {/* Vendedor */}
                  <TableCell className="p-4 py-5 sm:px-6">
                    <p className="font-medium text-theme-sm text-gray-800 dark:text-white/90">
                      {recepcion.vendedor_nombre}
                    </p>
                  </TableCell>
                  {/* Producto */}
                  <TableCell className="p-4 py-5 sm:px-6">
                    <p className="font-medium text-theme-sm text-gray-800 dark:text-white/90">
                      {recepcion.producto_nombre}
                    </p>
                  </TableCell>
                  {/* Cantidad */}
                  <TableCell className="p-4 py-5 sm:px-6">
                    <p className="font-medium text-theme-sm text-gray-800 dark:text-white/90">
                      {recepcion.cantidad}
                    </p>
                  </TableCell>
                  {/* Fecha */}
                  <TableCell className="p-4 py-5 sm:px-6">
                    <p className="font-medium text-theme-sm text-gray-800 dark:text-white/90">
                      {recepcion.fecha}
                    </p>
                  </TableCell>
                  {/* Acciones */}
                  <TableCell className="p-4 py-5 sm:px-6">
                    <button
                      onClick={() => openModal("editRecepcion", recepcion)}
                      className="text-gray-400 hover:text-gray-600"
                      title="Editar recepción"
                    >
                      <HorizontaLDots className="w-7 h-7" />
                    </button>
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
      <CreateRecepcionModal />
      <EditRecepcionModal />
    </div>
  );
}