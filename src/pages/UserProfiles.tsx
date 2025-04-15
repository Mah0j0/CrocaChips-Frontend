import PageBreadcrumb from "../components/common/PageBreadCrumb";
import UserMetaCard from "../components/UserProfile/UserMetaCard";
import UserInfoCard from "../components/UserProfile/UserInfoCard";
{/*import UserAddressCard from "../components/UserProfile/UserAddressCard";*/}
import PageMeta from "../components/common/PageMeta";
import {useQueryClient} from "@tanstack/react-query";
import {Empleado} from "../types/empleados.ts";

export default function UserProfiles() {
    const queryClient = useQueryClient();
    const data = queryClient.getQueryData<Empleado>(["empleado"]);

    return (
        <>
            <PageMeta
                title="React.js Profile Dashboard | TailAdmin - Next.js Admin Dashboard Template"
                description="This is React.js Profile Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
            />
            <PageBreadcrumb pageTitle="Profile" />
            <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">

                <div className="space-y-6">
                    <UserMetaCard data={data || { nombre: "", apellido: "", rol: "", usuario: "" }} />
                    <UserInfoCard data={data || { nombre: "", apellido: "", rol: "", usuario: "", telefono: 0, carnet: "" }} />
                    {/*<UserAddressCard/>*/}
                </div>
            </div>
        </>
    );
}