import {BoxIconLine, GroupIcon, PieChartIcon, UserIcon} from "../../../shared/icons";
import {InfoCard} from "./InfoCard.tsx";
import {useInfoCard} from "../hooks/useInfoCard.ts";

export default function InfoCards () {
    const { data, isLoading, error } = useInfoCard();

    if (isLoading) return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 mb-6">
            <InfoCard
                icon={<GroupIcon className="text-gray-800 size-6 dark:text-white/90" />}
                title="Clientes"
                value={''}
                isLoading={isLoading}
            />

            <InfoCard
                icon={<BoxIconLine className="text-gray-800 size-6 dark:text-white/90" />}
                title="Almacén"
                value={''}
                isLoading={isLoading}
            />

            <InfoCard
                icon={<UserIcon className="text-gray-800 size-6 dark:text-white/90" />} // Icono diferenciado
                title="Empleados"
                value={''}
                isLoading={isLoading}
            />
            <InfoCard
                icon={<PieChartIcon className="text-gray-800 size-6 dark:text-white/90" />} // Icono diferenciado
                title="Total de Ventas"
                value={''}
                isLoading={isLoading}
            />
        </div>

    )

    if (error) return <div>Error al cargar las tarjetas</div>;

    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 mb-6">
            <InfoCard
                icon={<GroupIcon className="text-gray-800 size-6 dark:text-white/90" />}
                title="Clientes"
                value={data!.cantidad_clientes? data!.cantidad_clientes : ''}
                isLoading={isLoading}
            />

            <InfoCard
                icon={<BoxIconLine className="text-gray-800 size-6 dark:text-white/90" />}
                title="Almacén"
                value={data!.cantidad_productos ? data!.cantidad_productos : ''}
                isLoading={isLoading}
            />

            <InfoCard
                icon={<UserIcon className="text-gray-800 size-6 dark:text-white/90" />} // Icono diferenciado
                title="Empleados"
                value={data!.cantidad_empleados ? data!.cantidad_empleados : ''}
                isLoading={isLoading}
            />
            <InfoCard
                icon={<PieChartIcon className="text-gray-800 size-6 dark:text-white/90" />} // Icono diferenciado
                title="Total de Ventas"
                value={data!.total_ventas ? data!.total_ventas : ''}
                isLoading={isLoading}
            />
        </div>
    )
}