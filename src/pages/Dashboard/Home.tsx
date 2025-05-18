import EcommerceMetrics from "../../shared/ui/ecommerce/EcommerceMetrics";
import MonthlySalesChart from "../../shared/ui/ecommerce/MonthlySalesChart";
import StatisticsChart from "../../shared/ui/ecommerce/StatisticsChart";
import PageMeta from "../../shared/ui/common/PageMeta";
import { useAlertasRealtime } from "../../entities/notificaciones/hooks/useAlertasRealtime";
import Alert from "../../shared/ui/alert/Alert";

export default function Home() {
  const { data: alertas, isLoading, isError } = useAlertasRealtime();

  return (
    <>
      <PageMeta
        title="React.js Ecommerce Dashboard | TailAdmin - React.js Admin Dashboard Template"
        description="This is React.js Ecommerce Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12 space-y-6 xl:col-span-7">
          <EcommerceMetrics />

          <MonthlySalesChart />
        </div>

        <div className="col-span-12 xl:col-span-5">
          <StatisticsChart />
        </div>
      </div>
      <div className="space-y-4 mb-6">
        {isLoading && <Alert variant="info" title="Cargando alertas" message="Cargando notificaciones..." showLink={false} />}
        {isError && <Alert variant="error" title="Error" message="No se pudieron cargar las alertas." showLink={false} />}
        {alertas && alertas.map((alerta, idx) => (
          <Alert
            key={idx}
            variant={
              alerta.tipo === "ventas_pendientes"
                ? "warning"
                : alerta.tipo === "productos_sin_stock"
                ? "error"
                : "info"
            }
            title={alerta.mensaje}
            message={
              alerta.productos
                ? alerta.productos.join(", ")
                : `Cantidad: ${alerta.cantidad ?? ""}`
            }
            showLink={false}
          />
        ))}
      </div>
    </>
  );
}
