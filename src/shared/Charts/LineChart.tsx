import PageBreadcrumb from "../ui/common/PageBreadCrumb.tsx";
import ComponentCard from "../ui/common/ComponentCard.tsx";
import LineChartOne from "../ui/charts/line/LineChartOne.tsx";
import PageMeta from "../ui/common/PageMeta.tsx";

export default function LineChart() {
  return (
    <>
      <PageMeta
        title="React.js Chart Dashboard | TailAdmin - React.js Admin Dashboard Template"
        description="This is React.js Chart Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Line Chart" />
      <div className="space-y-6">
        <ComponentCard title="Line Chart 1">
          <LineChartOne />
        </ComponentCard>
      </div>
    </>
  );
}
