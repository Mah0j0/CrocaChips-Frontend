import PageBreadcrumb from "../shared/ui/common/PageBreadCrumb";
import UserMetaCard from "../entities/empleados/ui/UserMetaCard.tsx";
import UserInfoCard from "../entities/empleados/ui/UserInfoCard.tsx";
{/*import UserAddressCard from "../components/UserProfile/UserAddressCard";*/}
import PageMeta from "../shared/ui/common/PageMeta";

export default function UserProfiles() {

    return (
        <>
            <PageMeta
                title="Perfil"
                description="This is React.js Profile Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
            />
            <PageBreadcrumb pageTitle="Mi Perfil" />
            <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">

                <div className="space-y-6">
                    <UserMetaCard />
                    <UserInfoCard />
                    {/*<UserAddressCard/>*/}
                </div>
            </div>
        </>
    );
}