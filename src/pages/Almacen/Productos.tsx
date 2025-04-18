import PageBreadcrumb from "../../components/common/PageBreadCrumb";
//PageBreadcrumb es un componente que se utiliza para mostrar la ruta de navegación en la parte superior de la página.
import PageMeta from "../../components/common/PageMeta";
// PageMeta es un componente que se utiliza para establecer los metadatos de la página, como el título y la descripción.
import { useProducts } from "../../hooks/useProducto.ts";
import BasicTableOne from "../../components/tables/BasicTables/BasicTableOne.tsx";
import Badge from "../../components/ui/badge/Badge.tsx";
import Alert from "../../components/ui/alert/Alert.tsx";
import { useState } from "react";
import {TableCell} from "../../components/ui/table";
import Input from "../../components/form/input/InputField.tsx";
import { SearchIcon, PlusIcon, MoreDotIcon} from "../../icons";
import ComponentCard from "../../components/common/ComponentCard.tsx";
import Button from "../../components/ui/button/Button.tsx";

//Traer los productos de la API
export default function Productos() {
  const { data, isLoading, isError } = useProducts();
  //para filtrar los productos, 
  const [filtro, setFiltro] = useState(""); 
  //para abrir el modal de agregar producto
  const [isModalOpen, setIsModalOpen] = useState(false);
  //para el formulario
  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
    tiempo_vida: "",
    precio_unitario: "",
    stock: "",
  });   
  //handle submit
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Evita el refresco de la página
  
    // Validación básica
    const { nombre, descripcion, tiempo_vida, precio_unitario, stock } = form;
    if (!nombre || !descripcion || !tiempo_vida || !precio_unitario || !stock) {
      alert("Por favor, completa todos los campos.");
      return;
    }
  
    // Aquí podrías hacer una petición POST al backend
    console.log("Producto creado:", form);
  
    // Limpiar el formulario (opcional)
    setForm({
      nombre: "",
      descripcion: "",
      tiempo_vida: "",
      precio_unitario: "",
      stock: "",
    });
  
    // Cerrar el modal
    setIsModalOpen(false);
  };
  
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
    "Descripción",
    "Tiempo de vida",
    "Precio (Bs.)",
    "Stock",
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
                  onClick={() => setIsModalOpen(true)} 
                > 
                  Agregar Producto
                </Button>
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
                  getKey={(producto) => producto._id}
                  renderRow={(producto) => (
                    <>
                      <TableCell className="p-4 py-5 sm:px-6 text-start">
                        <p className="font-medium text-theme-sm text-gray-800 dark:text-white/90">
                        {producto.nombre}
                        </p>
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400"> 
                          {producto.descripcion}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                        {producto.tiempo_vida} Meses
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                        Bs. {producto.precio_unitario}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-green-500 text-theme-sm">
                      <div className="flex space-x-2 align-middle">
                      <Button
                            size="xs"
                            variant="outline"
                            className="text-gray-800 dark:text-gray-400"
                            startIcon={<PlusIcon className="size-5"/>}
                            onClick={() => alert("Reducir stock")}
                            children={undefined}
                        />
                        <p className={` ${
                          producto.stock < 5 ? "text-red-700 dark:text-red-600" :
                          producto.stock < 50 ? "text-orange-700 dark:text-orange-600" :
                          "text-green-700 dark:text-green-600"
                        }`}>
                          {producto.stock}
                        </p>
                        <Button
                            size="xs"
                            variant="outline"
                            className="text-gray-400"
                            startIcon={<PlusIcon className="size-5"/>}
                            onClick={() => alert("Aumentar stock")}
                            children={undefined}
                        />
                        </div>
                      </TableCell>
                      <TableCell className="px-4 py-3 text-start">
                        <Badge
                          size="sm"
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
                          size="sm"
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
                      <TableCell className="p-4 py-5 text-start">
                          <button
                          onClick={() => alert("Más opciones")}
                          className="text-gray-400"
                          title="Más opciones"
                          >
                          <MoreDotIcon className="w-7 h-7" />
                          </button>
                      </TableCell>
                    </>
                  )}
                  />
                ) }
        </ComponentCard>
          {/* Modal para crear producto */}
{isModalOpen && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-lg">
      <h2 className="text-2xl font-semibold mb-4">Añadir nuevo producto</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Nombre del producto</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded px-3 py-2"
            value={form.nombre}
            onChange={(e) => setForm({ ...form, nombre: e.target.value })}
            required
          />
        </div>
        <div className="flex justify-end gap-2">
          <button
            type="button"
            className="px-4 py-2 text-gray-600 hover:text-black"
            onClick={() => setIsModalOpen(false)}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Guardar
          </button>
        </div>
      </form>
    </div>
  </div>
)}
      </div>
    </div>
  );

}
