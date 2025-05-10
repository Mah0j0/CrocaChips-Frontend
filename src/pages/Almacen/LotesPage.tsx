//Inicio de pagina
import PageBreadcrumb from "../../shared/ui/common/PageBreadCrumb.tsx";
import PageMeta from "../../shared/ui/common/PageMeta.tsx";
//Lotes
import { useLotes } from "../../entities/productos";
//Para tablas
import { SearchIcon, ChevronLeftIcon} from "../../shared/icons/index.ts";
import { useState } from "react";
import {TableCell} from "../../shared/ui/table";
import BasicTableOne from "../../shared/ui/table/BasicTableOne.tsx";
import Alert from "../../shared/ui/alert/Alert.tsx";
import Input from "../../shared/ui/form/input/InputField.tsx";
import ComponentCard from "../../shared/ui/common/ComponentCard.tsx";
import Button from "../../shared/ui/button/Button.tsx";

export default function LotesPage() {
    const {data, isLoading, isError} = useLotes(); //Traer los lotes
    const [filtro, setFiltro] = useState(""); //filtrar los productos
    const [paginaActual, setPaginaActual] = useState(1); //Paginación
    const elementosPorPagina = 10;

    //Cabeceras de la tabla
    const headers = [
        "Nombre del Producto",
        "Cantidad",
        "Fecha de Elaboración",
    ];

    //Manejo de errores
    if (isLoading) {
        return (
          <ComponentCard title="Info Alert">
          <Alert
              variant="info"
              title="Cargando"
              message="Cargando Lotes..."
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
            message="Ocurrió un error al cargar los lotes de producción."
            showLink={false}
        />
        </ComponentCard>
    );
    }
    //Filtro de barra de búsqueda
    const lotesFiltrados = (data ?? [])
    .filter((lote) =>
        `${lote.producto_nombre}`
            .toLowerCase()
            .includes(filtro.toLowerCase())
    )
    //Paginación
    const indiceInicio = (paginaActual - 1) * elementosPorPagina;
    const indiceFin = indiceInicio + elementosPorPagina;
    const lotesPaginados = lotesFiltrados.slice(indiceInicio, indiceFin);
    const totalPaginas = Math.ceil(lotesFiltrados.length / elementosPorPagina);

    //Renderizar la tabla
    return(
        <div>
          <PageMeta 
            title="React.js Blank Dashboard | TailAdmin"
            description="Lista de lotes de producción"
            />
          <PageBreadcrumb pageTitle="Lotes de producción" />
          <div className="space-y-6">
            <ComponentCard title="">
              <div className="flex flex-row gap-10 items-center justify-between mb-5">
                  {/* Barra de búsqueda */} 
                  <div className="relative"> 
                      <Input
                          placeholder="Nombre del producto ..."
                          type="text"
                          value={filtro}
                          onChange={(e) => setFiltro(e.target.value)}
                          className="pl-[62px]" 
                      />
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 border-r border-gray-200 px-3.5 py-3 text-gray-500 dark:border-gray-800 dark:text-gray-400">
                      <SearchIcon className="size-6" />
                      </span>
                  </div>
              </div>
              {/* Tabla */}
              {lotesFiltrados.length === 0 ? (
                  <ComponentCard title="">
                      <Alert
                          variant="warning"
                          title="No se encontraron resultados"
                          message={`No se encontraron lotes con el producto "${filtro}".`}
                          showLink={false}
                      />
                  </ComponentCard>
                  ) : (
                  <BasicTableOne
                      headers={headers}
                      data={lotesPaginados}
                      getKey={(lote) => lote.id_lote}
                      renderRow={(lote) => (
                        <>
                          {/* Nombre */}
                          <TableCell className="p-4 py-5 sm:px-6 text-start">
                            <p className="font-medium text-theme-sm text-gray-800 dark:text-white/90">
                            {lote.producto_nombre}
                            </p>
                          </TableCell>
                          {/* Cantidad */}
                          <TableCell className="px-4 py-3 text-theme-sm ">
                            <div className="flex space-x-2 align-middle">
                            <p className="px-4">
                              {lote.cantidad}
                            </p>
                            </div>                         
                          </TableCell>
                          {/* Fecha de elaboración */}
                          <TableCell className="px-5 py-3 text-gray-500 text-theme-sm dark:text-gray-400"> 
                          <p className="px-4">
                              {lote.fecha_elaboracion}
                            </p>
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
        </div>
      );
}
  
