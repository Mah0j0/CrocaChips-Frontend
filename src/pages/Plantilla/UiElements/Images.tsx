import PageBreadcrumb from "../../../shared/ui/common/PageBreadCrumb.tsx";
import ResponsiveImage from "../../../shared/ui/images/ResponsiveImage.tsx";
import TwoColumnImageGrid from "../../../shared/ui/images/TwoColumnImageGrid.tsx";
import ThreeColumnImageGrid from "../../../shared/ui/images/ThreeColumnImageGrid.tsx";
import ComponentCard from "../../../shared/ui/common/ComponentCard.tsx";
import PageMeta from "../../../shared/ui/common/PageMeta.tsx";

export default function Images() {
  return (
    <>
      <PageMeta
        title="React.js Images Dashboard | TailAdmin - React.js Admin Dashboard Template"
        description="This is React.js Images page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Images" />
      <div className="space-y-5 sm:space-y-6">
        <ComponentCard title="Responsive image">
          <ResponsiveImage />
        </ComponentCard>
        <ComponentCard title="Image in 2 Grid">
          <TwoColumnImageGrid />
        </ComponentCard>
        <ComponentCard title="Image in 3 Grid">
          <ThreeColumnImageGrid />
        </ComponentCard>
      </div>
    </>
  );
}
