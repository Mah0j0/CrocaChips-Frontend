import { useVentasMensuales } from "../hooks/useVentasMensuales";
import Chart from "react-apexcharts";
import ComponentCard from "../../../shared/ui/common/ComponentCard";
import Alert from "../../../shared/ui/alert/Alert";
import {useMemo} from "react";
import {ApexOptions} from "apexcharts";

export default function VentasDashboard() {
    const { data, isLoading, isError } = useVentasMensuales();

    const chartOptions = useMemo<ApexOptions>(() => ({
        chart: { type: "line", height: 300 },
        xaxis: { categories: data?.categorias ?? [] },
        title: { text: "Ventas por Mes" },
        yaxis: {
            labels: {
                formatter: (val: number) => `Bs ${val.toLocaleString()}`
            }
        },
        colors: ["#e27410"],
        stroke: { width: 2 }
    }), [data]);



    const chartSeries = data?.series?.map(serie => ({
        name: serie.nombre,
        data: [...serie.datos]
    })) ?? [];

    if (isLoading) {
        return (
            <ComponentCard title="Cargando ventas">
                <Alert
                    variant="info"
                    title="Cargando datos"
                    message="Obteniendo información de ventas mensuales..."
                    showLink={false}
                />
            </ComponentCard>
        );
    }

    if (isError || !data) {
        return (
            <ComponentCard title="Error en datos">
                <Alert
                    variant="error"
                    title="Error de conexión"
                    message="No se pudieron cargar los datos de ventas mensuales"
                    showLink={false}
                />
            </ComponentCard>
        );
    }

    return (
        <ComponentCard title="Ventas Mensuales" className="overflow-hidden h-full">
            {chartSeries.length === 0 ? (
                <Alert
                    variant="warning"
                    title="Datos insuficientes"
                    message="No hay registros de ventas mensuales disponibles"
                />
            ) : (
                <Chart
                    options={chartOptions}
                    series={chartSeries}
                    type="line"
                    height={300}
                    width="100%"
                />
            )}
        </ComponentCard>
    );
}