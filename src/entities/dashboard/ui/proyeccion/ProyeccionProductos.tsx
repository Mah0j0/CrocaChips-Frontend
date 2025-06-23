import { useProeyeccionProductos } from '../../hooks/proyeccion/useProeyeccionProductos';
import Chart from 'react-apexcharts';
import ComponentCard from '../../../../shared/ui/common/ComponentCard';
import Alert from '../../../../shared/ui/alert/Alert';
import { useMemo } from 'react';
import { ApexOptions } from 'apexcharts';

export default function ProyeccionProductos() {
    const { data, isLoading, isError } = useProeyeccionProductos();

    const colors = ["#e27410", "#ff9e45", "#f5b041", "#f39c12", "#e67e22", "#d35400", "#c0392b", "#e74c3c", "#9b59b6", "#8e44ad", "#2980b9", "#3498db", "#1abc9c", "#2ecc71", "#27ae60"]

    const chartOptions = useMemo<ApexOptions>(() => ({
        colors: colors,
        chart: {
            fontFamily: "Outfit, sans-serif",
            type: 'bar',
            height: 400,
            toolbar: {
                show: false
            },
            animations: {
                enabled: true
            }
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: "39%",
                borderRadius: 5,
                borderRadiusApplication: "end",
                dataLabels: { position: 'top' },
            }
        },
        dataLabels: {
            enabled: false,
            offsetY: -20,
            style: { fontSize: '12px', colors: ["#304758"] },
        },
        stroke: {
            show: true,
            width: 2,
            colors: ["transparent"],
        },
        xaxis: {
            categories: data?.map((item) => item.nombre_producto) ?? [],
            labels: {
                show: false,
                rotate: -45,
                rotateAlways: false,
                hideOverlappingLabels: true,
                showDuplicates: false,
                trim: false,
                minHeight: undefined,
                maxHeight: 120,
            }
        },
        grid: {
            yaxis: { lines: { show: true } },
            padding: { top: 0, right: 0, bottom: 0, left: 10 },
        },
        fill: {
            opacity: 1,
            type: "gradient",
            gradient: {
                shade: 'light',
                type: "vertical",
                shadeIntensity: 0.25,
                gradientToColors: ["#ff9e45"],
                opacityFrom: 1,
                opacityTo: 1,
                stops: [0, 100]
            }
        },
        yaxis: { title: { text: 'Unidades Proyectadas' } },
        tooltip: {
            y: { formatter: (val: number) => `${val} unidades` },
            theme: 'light'
        },
        responsive: [{
            breakpoint: 768,
            options: {
                plotOptions: { bar: { columnWidth: '55%' } },
                chart: { height: 250 },
                xaxis: { labels: { rotate: -45 } },
            }
        }]
    }), [data]);

    const chartSeries = useMemo(() => [
        {
            name: 'Proyección Julio 2025',
            data: data?.map((item) => item.prediccion) ?? []
        }
    ], [data]);

    if (isLoading) {
        return (
            <ComponentCard title="Cargando proyección">
                <Alert
                    variant="info"
                    title="Cargando datos"
                    message="Obteniendo proyección de productos..."
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
                    message="No se pudieron cargar los datos de proyección"
                    showLink={false}
                />
            </ComponentCard>
        );
    }

    return (
        <ComponentCard title="Ventas Proyectadas por Producto - Julio 2025" className="overflow-hidden h-full">
            {chartSeries[0].data.length === 0 ? (
                <Alert
                    variant="warning"
                    title="Datos insuficientes"
                    message="No hay registros de proyección disponibles"
                />
            ) : (
                <Chart options={chartOptions} series={chartSeries} type="bar" height={400} width="100%" />
            )}
        </ComponentCard>
    );
}