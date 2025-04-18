//Inicio de pagina
import PageBreadcrumb from "../../components/common/PageBreadCrumb.tsx";
import PageMeta from "../../components/common/PageMeta.tsx";
//Producto
import { useProducts } from "../../hooks/useProducto.ts";
//Modals
import { useModalContext } from "../../context/ModalContext.tsx";
import CreateProductoModal from "../../components/productos/CreateProductoModal.tsx";
import EditProductoModal from "../../components/productos/EditProductoModal.tsx";
//Para tablas
import { SearchIcon, PlusIcon, HorizontaLDots} from "../../icons/index.ts";
import { useState } from "react";
import {TableCell} from "../../components/ui/table/index.tsx";
import BasicTableOne from "../../components/tables/BasicTables/BasicTableOne.tsx";
import Badge from "../../components/ui/badge/Badge.tsx";
import Alert from "../../components/ui/alert/Alert.tsx";
import Input from "../../components/form/input/InputField.tsx";
import ComponentCard from "../../components/common/ComponentCard.tsx";
import Button from "../../components/ui/button/Button.tsx";


export default function Productos() {
  const { openModal } = useModalContext(); //abrir el modal
  const { data, isLoading, isError } = useProducts(); //Traer los productos de la API 
  const [filtro, setFiltro] = useState(""); //filtrar los productos,
  
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

  if (isError || !data) {
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

  //Productos
  const productosFiltrados = (data ?? []).filter((producto) =>
    `${producto.nombre} ${producto.descripcion}`
      .toLowerCase()
      .includes(filtro.toLowerCase())
  );
  
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
                      placeholder="Nombre, descripcion..."
                      type="text"
                      value={filtro}
                      onChange={(e) => setFiltro(e.target.value)}
                      className="pl-[62px]"
                  />
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 border-r border-gray-200 px-3.5 py-3 text-gray-500 dark:border-gray-800 dark:text-gray-400">
                  <SearchIcon className="size-6" />
                  </span>
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
                  data={productosFiltrados}
                  getKey={(producto) => producto.id_producto}
                  renderRow={(producto) => (
                    <>
                      <TableCell className="p-4 py-5 sm:px-6 text-start">
                        <p className="font-medium text-theme-sm text-gray-800 dark:text-white/90">
                        {producto.nombre}
                        </p>
                      </TableCell>
                      <TableCell className="px-6 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                        {producto.tiempo_vida === 1 ? "1 Mes" : `${producto.tiempo_vida} Meses`}
                        </TableCell>
                      <TableCell className="px-6 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                        Bs. {producto.precio_unitario}
                      </TableCell>
                      <TableCell className="px-6 py-3 text-green-500 text-theme-sm">
                        <p className={` ${
                          producto.stock < 5 ? "text-red-700 dark:text-red-600" :
                          producto.stock < 50 ? "text-orange-700 dark:text-orange-600" :
                          "text-green-700 dark:text-green-600"
                        }`}>
                          {producto.stock}
                        </p>
                      </TableCell>
                      <TableCell className="px-5 py-3 text-gray-500 text-theme-sm dark:text-gray-400"> 
                          {producto.descripcion}
                      </TableCell>
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
                ) }
        </ComponentCard>            
      </div>
      <EditProductoModal/>
    </div>
  );

}
