import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { useVentasMensuales } from "../hooks/useVentasMensuales";
import { useVentasSemanales } from "../hooks/useVentasSemanales";
import ComponentCard from "../../../shared/ui/common/ComponentCard";
import Alert from "../../../shared/ui/alert/Alert";
import Button from "../../../shared/ui/button/Button";
import { useMemo, useState, useCallback } from "react";

export default function GraficoVentas() {
    const [tipoVentas, setTipoVentas] = useState<'mensuales' | 'semanales'>('mensuales');
    const isMensuales = tipoVentas === 'mensuales';

    const ventasMensuales = useVentasMensuales();
    const ventasSemanales = useVentasSemanales();

    const activeData = tipoVentas === 'mensuales' ? ventasMensuales : ventasSemanales;
    const { data, isLoading, isError } = activeData;

    const toggleVentas = useCallback(() => {
        setTipoVentas(prev => (prev === 'mensuales' ? 'semanales' : 'mensuales'));
    }, []);

    // useMemo para chartOptions con dependencia más precisa
    const chartOptions = useMemo<ApexOptions>(() => ({
        colors: ["#e27410"],
        chart: {
            fontFamily: "Outfit, sans-serif",
            type: "bar",
            height: 180,
            animations: { enabled: true, easing: 'easeinout' },
            toolbar: {
                show: true,
                tools: {
                    download: true, selection: true, zoom: true,
                    zoomin: true, zoomout: true, pan: true
                },
                export: {
                    csv: {
                        filename: `Ventas_${tipoVentas}`,
                        columnDelimiter: ',',
                        headerCategory: 'Periodo',
                        headerValue: 'Ventas',
                    }
                },
            },
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: "39%",
                borderRadius: 5,
                borderRadiusApplication: "end",
                dataLabels: { position: 'top' },
            },
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
            categories: data?.categorias ?? [],
            axisBorder: { show: false },
            axisTicks: { show: false },
            labels: {
                show: true,
                rotate: -45,
                rotateAlways: false,
                hideOverlappingLabels: true,
                showDuplicates: false,
                trim: false,
                minHeight: undefined,
                maxHeight: 120,
            }
        },
        yaxis: {
            labels: {
                formatter: (val) => `Bs ${val.toLocaleString()}`
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
        tooltip: {
            x: { show: false },
            y: {
                formatter: (val: number) => `Bs ${val.toLocaleString()}`,
                title: { formatter: () => 'Ventas:' }
            },
            theme: 'dark'
        },
        responsive: [{
            breakpoint: 768,
            options: {
                plotOptions: { bar: { columnWidth: '55%' } },
                chart: { height: 250 },
                xaxis: { labels: { rotate: -45 } },
            }
        }]
    }), [data?.categorias, tipoVentas]);

// useMemo para series
    const chartSeries = useMemo(() => {
        return data?.series?.map((serie) => ({
            name: serie.nombre,
            data: [...serie.datos], // Clonamos para asegurar cambio de referencia
        })) ?? [];
    }, [data?.series?.map(s => s.datos.join(",")).join("|")]); // ← Detectar cambio profundo

    if (isLoading) {
        return (
            <ComponentCard title="Cargando ventas">
                <Alert
                    variant="info"
                    title="Cargando datos"
                    message={`Obteniendo información de ventas ${tipoVentas}...`}
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
                    message={`No se pudieron cargar los datos de ventas ${tipoVentas}`}
                    showLink={false}
                />
            </ComponentCard>
        );
    }

    return (
        <ComponentCard
            title={`Ventas ${isMensuales ? 'Mensuales' : 'Semanales'}`}
            className="overflow-hidden h-full"
        >
            <div className="flex justify-between items-center mb-4">
                <span className="text-sm text-muted-foreground dark:text-white">
                    Comparativo de ventas {isMensuales ? 'mensuales' : 'semanales'}
                </span>
                <Button
                    size="sm"
                    variant="outline"
                    onClick={toggleVentas}
                    aria-label="Alternar entre ventas mensuales y semanales"
                >
                    {isMensuales ? 'Ver Semanales' : 'Ver Mensuales'}
                </Button>
            </div>

            {chartSeries.length === 0 ? (
                <Alert
                    variant="warning"
                    title="Datos insuficientes"
                    message={`No hay registros de ventas ${tipoVentas} disponibles`}
                />
            ) : (
                <Chart
                    key={`${tipoVentas}-${data?.categorias?.length}-${data?.series?.[0]?.datos.length}`} // único por cambio de tipo o datos
                    options={chartOptions}
                    series={chartSeries}
                    type="bar"
                    height={180}
                    width="100%"
                />
            )}
        </ComponentCard>
    );
}
