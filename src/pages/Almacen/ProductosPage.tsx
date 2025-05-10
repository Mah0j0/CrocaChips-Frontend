//Inicio de pagina
import PageBreadcrumb from "../../shared/ui/common/PageBreadCrumb.tsx";
import PageMeta from "../../shared/ui/common/PageMeta.tsx";
//Producto
import { useProducts } from "../../entities/productos";
//Modals
import { useModalContext } from "../../shared/context/ModalContext.tsx";

import {
    CreateProductoModal,
    EditProductoModal,
    IncreaseStockModal,
    DecreaseStockModal,
} from "../../features/productos";

//import DecreaseSrockModal from "../../features/productos/decrease-stock/ui/DecreaseStockModal.tsx";
//Para filtros
import { estados } from "../../shared/data";
import Select from "../../shared/ui/form/Select.tsx";
//Para tablas
import { SearchIcon, PlusIcon, MinusIcon, HorizontaLDots, ChevronLeftIcon, FilterIcon} from "../../shared/icons/index.ts";
import { useState } from "react";
import {TableCell} from "../../shared/ui/table";
import BasicTableOne from "../../shared/ui/table/BasicTableOne.tsx";
import Badge from "../../shared/ui/badge/Badge.tsx";
import Alert from "../../shared/ui/alert/Alert.tsx";
import Input from "../../shared/ui/form/input/InputField.tsx";
import ComponentCard from "../../shared/ui/common/ComponentCard.tsx";
import Button from "../../shared/ui/button/Button.tsx";


export default function ProductosPage() {
  const { openModal } = useModalContext(); //abrir el modal
  const { data, isLoading, isError } = useProducts(); //Traer los productos de la API
  const [filtro, setFiltro] = useState(""); //filtrar los productos,
  const [estadoSeleccionado, setEstadoSeleccionado] = useState<string>("true");
  const [paginaActual, setPaginaActual] = useState(1);
  const elementosPorPagina = 10;

  //Cabeceras de tablas
  const headers = [
    "Nombre del producto",
    "Tiempo de vida",
    "Precio (Bs.)",
    "Stock",
    "Descripción",
    "Disponibilidad",
    "Estado",
    "Acciones",
  ];

  const handleSelectChange = (value: string, type: "estado") => {
    if (type === "estado") {
        setEstadoSeleccionado(value);
    }
  };

  if (isLoading) {
    return (
      <ComponentCard title="Info Alert">
      <Alert
          variant="info"
          title="Cargando"
          message="Cargando Productos..."
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
            message="Ocurrió un error al cargar los productos."
            showLink={false}
        />
      </ComponentCard>
    );
  }

  //Filtro de barra de búsqueda
  const productosFiltrados = (data ?? [])
  .filter((producto) =>
      `${producto.nombre}`
          .toLowerCase()
          .includes(filtro.toLowerCase())
  )
  //Filtro de estado
  .filter((producto) =>
      estadoSeleccionado ? producto.habilitado?.toString() === estadoSeleccionado : true
  )
  //Paginación
  const indiceInicio = (paginaActual - 1) * elementosPorPagina;
  const indiceFin = indiceInicio + elementosPorPagina;
  const productosPaginados = productosFiltrados.slice(indiceInicio, indiceFin);
  const totalPaginas = Math.ceil(productosFiltrados.length / elementosPorPagina);

  //Renderizar la tabla
  return(
    <div>
      <PageMeta
        title="React.js Blank Dashboard | TailAdmin"
        description="Lista de productos"
        />
      <PageBreadcrumb pageTitle="Productos en almacén" />
      <div className="space-y-6">
        <ComponentCard title="">
          <div className="flex flex-row gap-10 items-center justify-between mb-5">
              {/* Barra de búsqueda */}
              <div className="relative">
                  <Input
                      placeholder="Nombre, descripcion ..."
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
                {/* Filtros */}
                <div className="flex flex-row-reer gap-3 items-center justify-end">
                  <FilterIcon className="size-8 text-gray-500 dark:border-gray-800 dark:text-gray-400" />
                  <Select
                    options={estados.map((estado) => ({
                      value: estado.value.toString(),
                      label: estado.label,
                    }))}
                    defaultValue={estados[0].value.toString()}
                    onChange={(value) => handleSelectChange(value, "estado")}
                    className="dark:bg-dark-900"
                    placeholder="Estado"
                  />
                </div>
                {/* Botón para agregar producto */}
                  <Button
                    size="md"
                    variant="primary"
                    startIcon={<PlusIcon className="size-5"/>}
                    onClick={() => openModal("createProducto")}
                  >
                    Agregar Producto
                  </Button>
                  <CreateProductoModal />
              </div>
          </div>
          {/* Tabla */}
          {productosFiltrados.length === 0 ? (
              <ComponentCard title="">
                  <Alert
                      variant="warning"
                      title="No se encontraron resultados"
                      message={`No se encontraron productos con el nombre "${filtro}".`}
                      showLink={false}
                  />
              </ComponentCard>
          ) : (
              <BasicTableOne
                  headers={headers}
                  data={productosPaginados}
                  getKey={(producto) => producto.id_producto}
                  renderRow={(producto) => (
                    <>
                      {/* Nombre */}
                      <TableCell className="p-4 py-5 sm:px-6 text-start">
                        <p className="font-medium text-theme-sm text-gray-800 dark:text-white/90">
                        {producto.nombre}
                        </p>
                      </TableCell>
                      {/* Tiempo de vida */}
                      <TableCell className="px-6 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                        {producto.tiempo_vida === 1 ? "1 Mes" : `${producto.tiempo_vida} Meses`}
                        </TableCell>
                      {/* Precio */}
                      <TableCell className="px-6 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                        Bs. {producto.precio_unitario}
                      </TableCell>
                      {/* Stock */}
                      <TableCell className="px-4 py-3 text-theme-sm ">
                        <div className="flex space-x-2 align-middle">
                        <Button
                          size="xs"
                          variant="outline"
                          startIcon={<MinusIcon className="size-5"/>}
                          onClick={() => openModal("decreaseStock", producto)}
                          disabled={producto.stock === 0}
                          children={undefined}
                        />
                        <p className={` ${
                          producto.stock < 5 ? "text-red-700 py-1" :
                          producto.stock < 50 ? "text-orange-600 dark:text-orange-300 py-1" :
                          "text-green-700 dark:text-green-600 py-1"
                        }`}>
                          {producto.stock}
                        </p>
                        <Button
                          size="xs"
                          variant="outline"
                          startIcon={<PlusIcon className="size-5"/>}
                          onClick={() => openModal("increaseStock", producto)}
                          children={undefined}
                        />
                        </div>

                      </TableCell>
                      {/* Descripcion */}
                      <TableCell className="px-5 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                          {producto.descripcion}
                      </TableCell>
                      {/* Disponibilidad */}
                      <TableCell className="px-4 py-3 text-start">
                        <Badge
                          size="md"
                          color={
                            producto.stock
                                  ? "success"
                                  : !producto.stock
                                      ? "warning"
                                      : "error"
                          }
                        >
                          {producto.stock === 0 ? "Agotado" : "Disponible"}
                        </Badge>
                      </TableCell>
                      {/* Estado */}
                      <TableCell className="p-4 py-5 text-start">
                      <Badge
                          size="md"
                          color={
                            producto.habilitado
                                  ? "success"
                                  : !producto.habilitado
                                      ? "warning"
                                      : "error"
                          }
                        >
                          {producto.habilitado ? "Activo" : "Inactivo"}
                        </Badge>
                      </TableCell>
                      {/* Acciones */}
                      <TableCell className="p-4 py-5 text-center">
                          <button
                          onClick={() => openModal("editProducto", producto)}
                          className="text-gray-400"
                          title="Más opciones"
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
      <EditProductoModal/>
      <IncreaseStockModal/>
      <DecreaseStockModal/>
    </div>
  );

}
