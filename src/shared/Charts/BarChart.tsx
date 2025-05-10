import PageBreadcrumb from "../ui/common/PageBreadCrumb.tsx";
import ComponentCard from "../ui/common/ComponentCard.tsx";
import PageMeta from "../ui/common/PageMeta.tsx";
import BarChartOne from "../ui/charts/bar/BarChartOne.tsx";

export default function BarChart() {
  return (
    <div>
      <PageMeta
        title="React.js Chart Dashboard | TailAdmin - React.js Admin Dashboard Template"
        description="This is React.js Chart Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Bar Chart" />
      <div className="space-y-6">
        <ComponentCard title="Bar Chart 1">
          <BarChartOne />
        </ComponentCard>
      </div>
    </div>
  );
}
