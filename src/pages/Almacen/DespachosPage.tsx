//Inicio de pagina
import PageBreadcrumb from "../../shared/ui/common/PageBreadCrumb.tsx";
import PageMeta from "../../shared/ui/common/PageMeta.tsx";
//Despachos
import { useDespachos } from "../../entities/movimientos";
import { useProducts } from "../../entities/productos/index.ts";
//Modals
import { useModalContext } from "../../app/providers/ModalContext.tsx";
import CreateDespachoModal from "../../features/despachos/create-despacho/ui/CreateDespachoModal.tsx";
import EditDespachoModal from "../../features/despachos/edit-despacho/ui/EditDespachoModal.tsx";
import { PrintDespachoButton } from "../../features/despachos/print-despacho";
//Para filtros
//import { estados } from "../../data";
//import Select from "../../components/form/Select.tsx";
//Para tablas
import { SearchIcon, PlusIcon, HorizontaLDots, ChevronLeftIcon } from "../../shared/icons/index.ts";
import { useState } from "react";
import BasicTableOne from "../../shared/ui/table/BasicTableOne.tsx";
import Alert from "../../shared/ui/alert/Alert.tsx";
import Input from "../../shared/ui/form/input/InputField.tsx";
import ComponentCard from "../../shared/ui/common/ComponentCard.tsx";
import Button from "../../shared/ui/button/Button.tsx";
import { TableCell } from "../../shared/ui/table";


export default function DespachosPage() {
  const { openModal } = useModalContext(); //abrir el modal
  const { data, isLoading, isError } = useDespachos(); //Traer los despachos de la API 
  const { data: productos } = useProducts();
  const [filtro, setFiltro] = useState(""); //filtrar los despachos,
  //const [estadoSeleccionado, setEstadoSeleccionado] = useState<string>("true"); 
  const [paginaActual, setPaginaActual] = useState(1);
  const elementosPorPagina = 10;

  //Cabeceras de tablas
  const headers = [
    "Vendedor",
    "Producto",
    "Cantidad",
    "Fecha de despacho",
    "Acciones"
  ];

  //Manejo de errores
  if (isLoading) {
    return (
      <ComponentCard title="Info Alert">
        <Alert
          variant="info"
          title="Cargando"
          message="Cargando Despachos..."
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
          message="Ocurrió un error al cargar los despachos."
          showLink={false}
        />
      </ComponentCard>
    );
  }

  //Filtro de barra de búsqueda
  const despachosFiltrados = (data ?? [])
    // Ordenar por id de forma descendente
    .sort((a, b) => b.id_movimiento - a.id_movimiento)
    // Filtrar según búsqueda
    .filter((despacho) =>
      `${despacho.vendedor_nombre} ${despacho.producto_nombre} ${despacho.tipo_movimiento}`
        .toLowerCase()
        .includes(filtro.toLowerCase())
    )

  const obtenerPrecioUnitario = (nombreProducto: string) => {
    const producto = productos?.find(p => p.nombre === nombreProducto);
    return producto ? producto.precio_unitario : 0;
  }


  //Paginación
  const indiceInicio = (paginaActual - 1) * elementosPorPagina;
  const indiceFin = indiceInicio + elementosPorPagina;
  const despachosPaginados = despachosFiltrados.slice(indiceInicio, indiceFin);
  const totalPaginas = Math.ceil(despachosFiltrados.length / elementosPorPagina);

  //Renderizar la tabla
  return (
    <div>
      <PageMeta
        title="Despachos"
        description="Lista de despachos"
      />
      <PageBreadcrumb pageTitle="Despachos de productos" />
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
                onClick={() => openModal("createDespacho")}
              >
                Agregar Despacho
              </Button>
              {/* Modal de agregar producto */}
              <CreateDespachoModal />
            </div>
          </div>
          {/* Tabla */}
          {despachosFiltrados.length === 0 ? (
            <ComponentCard title="">
              <Alert
                variant="warning"
                title="No se encontraron resultados"
                message={`No se encontraron despachos con el nombre "${filtro}".`}
                showLink={false}
              />
            </ComponentCard>
          ) : (
            <BasicTableOne
              headers={headers}
              data={despachosPaginados}
              getKey={(despacho) => despacho.id_movimiento}
              renderRow={(despacho) => (

                <>
                  {/* Vendedor */}
                  <TableCell className="p-4 py-5 sm:px-6">
                    <p className="font-medium text-theme-sm text-gray-800 dark:text-white/90">
                      {despacho.vendedor_nombre}
                    </p>
                  </TableCell>
                  {/* Producto */}
                  <TableCell className="p-4 py-5 sm:px-6">
                    <p className="font-medium text-theme-sm text-gray-800 dark:text-white/90">
                      {despacho.producto_nombre}
                    </p>
                  </TableCell>
                  {/* Cantidad */}
                  <TableCell className="p-4 py-5 sm:px-6">
                    <p className="font-medium text-theme-sm text-gray-800 dark:text-white/90 px-2">
                      {despacho.cantidad}
                    </p>
                  </TableCell>
                  {/* Fecha */}
                  <TableCell className="p-4 py-5 sm:px-6">
                    <p className="font-medium text-theme-sm text-gray-800 dark:text-white/90">
                      {despacho.fecha}
                    </p>
                  </TableCell>
                  {/* Acciones */}
                  <TableCell className="p-4 py-5 sm:px-3">
                    <div className="flex items-center">
                      <button
                        onClick={() => openModal("editDespacho", despacho)}
                        className="text-gray-400 hover:text-gray-600 mr-2"
                        title="Editar"
                      >
                        <HorizontaLDots className="w-7 h-7" />
                      </button>
                      <PrintDespachoButton
                        despacho={{
                          ...despacho,
                          valor: despacho.cantidad * obtenerPrecioUnitario(despacho.producto_nombre),
                          precio_unitario: obtenerPrecioUnitario(despacho.producto_nombre)
                        }}
                      />
                    </div>
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
      <EditDespachoModal />
    </div>
  );
}