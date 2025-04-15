import { useQuery } from "@tanstack/react-query";
import { getProductos } from "../../api/ProductosApi";
import { Producto } from "../../types/productos";
import Button from "../../components/ui/button/Button";
import { PlusIcon } from "../../icons";
import { MoreDotIconHor } from "../../icons";

export default function Productos() {
  const { data, isLoading, isError } = useQuery<Producto[]>({
    queryFn: getProductos,
    queryKey: ["productos"],
    retry: 3,
    retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 5000),
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return (
      <p className="font-bold text-2xl text-center text-white">Cargando productos...</p>
    );
  }

  if (isError || !data) {
    return (
      <p className="text-red-500 font-semibold text-center">Error al cargar productos.</p>
    );
  }

  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">
      <div className="col-span-12 space-y-6 xl:col-span-12">
        <div className="mt-2 flex justify-between text-sm">
          <div>
            <h1 className="xl:text-3xl font-semibold">Productos en almacén</h1> 
            <p className="text-lg text-gray-500">Lista de productos disponibles</p>
          </div>
          
          <Button
            variant="primary"
            size="sm"
            className="text-lg font-semibold"
            onClick={() => alert("Añadir producto")}
          >
            <PlusIcon className="w-7 h-7 mr-1" />
            Añadir producto
          </Button>
        </div>
        <div className="relative flex flex-col w-full h-full text-gray-700 bg-white shadow-md rounded-lg bg-clip-border">
          <table className="w-full text-left table-auto min-w-max">
            <thead>
              <tr>
                <th className="p-4 border-b border-slate-200 bg-white ">
                  <p className="text-sm font-medium leading-none text-slate-600">Nombre del producto</p>
                </th>
                <th className="p-4 border-b border-slate-200 bg-white">
                  <p className="text-sm font-medium leading-none text-slate-600">Descripción</p>
                </th>
                <th className="p-4 border-b border-slate-200 bg-white">
                  <p className="text-sm font-medium leading-none text-slate-600">Tiempo de vida (Meses)</p>
                </th>
                <th className="p-4 border-b border-slate-200 bg-white">
                  <p className="text-sm font-medium leading-none text-slate-600">Precio (Bs.)</p>
                </th>
                <th className="p-4 border-b border-slate-200 bg-white">
                  <p className="text-sm font-medium leading-none text-slate-600">Stock</p>
                </th>
                <th className="p-4 border-b border-slate-200 bg-white">
                  <p className="text-sm font-medium leading-none text-slate-600">Disponibilidad</p>
                </th>
                <th className="p-4 border-b border-slate-200 bg-white">
                  <p className="text-sm font-medium leading-none text-slate-600">Estado</p>
                </th>
                <th className="p-4 border-b border-slate-200 bg-white">
                  <p className="text-sm font-medium leading-none text-slate-600">Acciones</p>
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((producto) => (
                <tr
                  key={producto._id}
                  className="hover:bg-slate-50 border-b border-slate-200"
                >
                  <td className="p-4 py-5">
                    <p className="font-semibold text-lg text-slate-800">{producto.nombre}</p>
                  </td>
                  <td className="p-4 py-5">
                    <p className="text-base  text-slate-500">{producto.descripcion}</p>
                  </td>
                  <td className="p-4 py-5">
                    <p className="text-base  text-slate-500">{producto.tiempo_vida} Meses</p>
                  </td>
                  <td className="p-4 py-5">
                    <p className="text-base  text-slate-500">Bs. {producto.precio_unitario}</p>
                  </td>
                  <td className="p-4 py-5">
                    <p
                      className={`text-base ${
                      producto.stock < 5
                        ? "text-red-600"
                        : producto.stock < 50
                        ? "text-orange-600"
                        : "text-green-600"
                      }`}
                    >
                      {producto.stock}
                    </p>
                  </td>                
                  <td className="p-4 py-5 text-center">
                    <p
                      className={`text-sm ${
                      producto.stock === 0
                        ? "p-1.5 font-medium text-red-900 uppercase rounded-full select-none whitespace-nowrap bg-red-500/20" 
                        : "p-1.5 font-medium text-blue-light-900 uppercase rounded-full select-none whitespace-nowrap bg-blue-light-500/20"
                      }`}
                    >
                      {producto.stock === 0 ? "agotado" : "disponible"}
                    </p>
                  </td>
                  <td className="p-4 py-5 text-center">
                  <p
                      className={`text-sm ${
                      producto.stock === 0
                        ? "p-1.5 font-medium text-red-900 uppercase rounded-full select-none whitespace-nowrap bg-red-500/20" 
                        : "p-1.5 font-medium text-green-900 uppercase rounded-full select-none whitespace-nowrap bg-green-500/20"
                      }`}
                    >
                      {producto.habilitado ? "activo" : "inactivo"}
                    </p>
                  </td>
                  <td className="p-4 py-5">
                    <button
                      onClick={() => alert("Más opciones")}
                      className="text-gray-600 hover:text-black opacity-50"
                      title="Más opciones"
                    >
                      <MoreDotIconHor className="w-7 h-7" /> 
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Opcional: Paginación debajo */}
          <div className="flex items-center justify-between p-4 border-t border-blue-gray-50">
            <button className="select-none rounded-lg border border-gray-900 py-2 px-4 text-xs font-bold uppercase text-gray-900 transition-all hover:opacity-75">
              Previous
            </button>
            <div className="flex items-center gap-2">
              {[1, 2, 3, "...", 8, 9, 10].map((page, index) => (
                <button
                  key={index}
                  className="relative h-8 w-8 select-none rounded-lg text-center text-xs font-medium uppercase text-gray-900 transition-all hover:bg-gray-900/10 active:bg-gray-900/20"
                  type="button"
                >
                  <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    {page}
                  </span>
                </button>
              ))}
            </div>
            <button className="select-none rounded-lg border border-gray-900 py-2 px-4 text-xs font-bold uppercase text-gray-900 transition-all hover:opacity-75">
              Next
            </button>
          </div>
        </div>

      </div>
    </div>

  );
}
