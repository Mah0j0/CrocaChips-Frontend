import StatisticsChart from "../../shared/ui/ecommerce/StatisticsChart";
import PageMeta from "../../shared/ui/common/PageMeta";
import BannerDashboard from "../../shared/ui/common/BannerDashboard";
import InfoCards from "../../entities/dashboard/ui/infoCards.tsx";
import GraficoVentasMensuales from "../../entities/dashboard/ui/GraficoVentasMensuales.tsx";

export default function Home() {
  return (
    <>
      <PageMeta
        title="Inicio"
        description="This is React.js Ecommerce Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <div className="grid grid-cols-12 gap-4 md:gap-6">
          <div className="col-span-12 space-y-6 ">
          <BannerDashboard />
          </div>
        <div className="col-span-12 space-y-6 xl:col-span-4">
          <InfoCards />
        </div>

        <div className="col-span-12 xl:col-span-8">
          <GraficoVentasMensuales/>
        </div>
      </div>
    </>
  );
}
