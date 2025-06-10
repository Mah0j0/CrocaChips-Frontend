import React from 'react';
import {
  BoxIconLine,
  GroupIcon,
  UserIcon // Nuevo icono para empleados
} from "../../icons";
import { useClientes } from "../../../entities/clientes";
import { useProducts } from "../../../entities/productos";
import { useEmpleados } from "../../../entities/empleados";
import {Skeleton} from "../skeleton"; // Componente para loading

// Componente de tarjeta reutuiilizable
const MetricCard = ({
                      icon,
                      title,
                      value,
                      isLoading
                    }: {
  icon: React.ReactNode;
  title: string;
  value: string | number;
  isLoading: boolean;
}) => (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 transition-all hover:shadow-md dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
      <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
        {icon}
      </div>

      <div className="mt-5">
      <span className="text-sm text-gray-500 dark:text-gray-400">
        {title}
      </span>
        <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90 min-h-[28px] flex items-center">
          {isLoading ? <Skeleton className="w-16 h-6" /> : value}
        </h4>
      </div>
    </div>
);

export default function EcommerceMetrics() {
  const {
    data: clientes,
    isLoading: isLoadingClientes,
    isError: isErrorClientes
  } = useClientes();

  const {
    data: productos,
    isLoading: isLoadingProductos,
    isError: isErrorProductos
  } = useProducts();

  const {
    data: empleados,
    isLoading: isLoadingEmpleados,
    isError: isErrorEmpleados
  } = useEmpleados();

  // Memoizar cálculo de stock
  const totalStock = React.useMemo(() => {
    return productos?.reduce((sum, producto) => sum + producto.stock, 0) || 0;
  }, [productos]);

  // Manejo de errores
  const formatValue = (value: number, error: boolean) =>
      error ? 'Error' : value;

  return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 md:gap-6">
        <MetricCard
            icon={<GroupIcon className="text-gray-800 size-6 dark:text-white/90" />}
            title="Clientes"
            value={formatValue(clientes?.length || 0, isErrorClientes)}
            isLoading={isLoadingClientes}
        />

        <MetricCard
            icon={<BoxIconLine className="text-gray-800 size-6 dark:text-white/90" />}
            title="Almacén"
            value={formatValue(totalStock, isErrorProductos)}
            isLoading={isLoadingProductos}
        />

        <MetricCard
            icon={<UserIcon className="text-gray-800 size-6 dark:text-white/90" />} // Icono diferenciado
            title="Empleados"
            value={formatValue(empleados?.length || 0, isErrorEmpleados)}
            isLoading={isLoadingEmpleados}
        />
      </div>
  );
}