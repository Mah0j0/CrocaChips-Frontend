import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import ComponentCard from "../../components/common/ComponentCard.tsx";
import BasicTableOne from "../../components/tables/BasicTables/BasicTableOne.tsx";
import {useEmpleados} from "../../hooks/useEmpleado.ts";

export default function Usuarios() {
    const { data, isLoading, error } = useEmpleados();

    const headers = ["Nombre", "Correo", "Departamento"];

    if (isLoading) {
        return <p className="text-sm text-gray-500">Cargando empleados...</p>;
    }

    if (error) {
        return (
            <p className="text-sm text-red-500">
                Ocurrió un error al cargar los empleados.
            </p>
        );
    }
    return (
        <div>
            <PageMeta
                title="React.js Blank Dashboard | TailAdmin - Next.js Admin Dashboard Template"
                description="This is React.js Blank Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
            />
            <PageBreadcrumb pageTitle="Lista de Usuarios" />
            <div className="space-y-6">
                {/*<ComponentCard title="Basic Table 1">
                    <BasicTableOne
                        headers={headers}
                        data={data ?? []}
                        getKey={(empleado) => empleado.id}
                        renderRow={(empleado) => (
                            <>
                                <TableCell className="px-5 py-3 text-start">{empleado.nombre}</TableCell>
                                <TableCell className="px-5 py-3 text-start">{empleado.correo}</TableCell>
                                <TableCell className="px-5 py-3 text-start">{empleado.departamento}</TableCell>
                            </>
                        )}
                    />
                </ComponentCard>*/}
            </div>
        </div>
    );
}
