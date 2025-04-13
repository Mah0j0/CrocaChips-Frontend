import { useQuery } from "@tanstack/react-query";
import { getProductos } from "../../api/CrocaChipsApi";
import { Producto } from "../../types/productos";

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
      <div className="col-span-12 space-y-6 xl:col-span-7">
        <h1 className="text-xl font-semibold">Productos</h1>
        <p className="text-gray-500">Lista de productos disponibles.</p>

        <ul className="space-y-4">
          {data.map((producto) => (
            <li
              key={producto._id}
              className="bg-white p-4 rounded-xl shadow border border-gray-200"
            >
              <h2 className="text-lg font-semibold">{producto.nombre}</h2>
              <p className="text-sm text-gray-600">{producto.descripcion}</p>
              <div className="mt-2 flex justify-between text-sm">
                <span className="text-green-600 font-medium">Bs. {producto.precio_unitario}</span>
                <span className="text-gray-500">Stock: {producto.stock}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
