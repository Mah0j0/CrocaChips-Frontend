import PageBreadcrumb from "../../shared/ui/common/PageBreadCrumb";
import PageMeta from "../../shared/ui/common/PageMeta";
import ComponentCard from "../../shared/ui/common/ComponentCard.tsx";
import Alert from "../../shared/ui/alert/Alert.tsx";
import {GroupIcon} from "../../shared/icons";
import Button from "../../shared/ui/button/Button.tsx";
import { useModalContext } from "../../app/providers/ModalContext.tsx";
import {useState} from "react";
import {LoadData} from "../Plantilla/OtherPage/LoadData.tsx";
import {useClientes} from "../../entities/clientes";
import {CreateClienteModal, EditClienteModal, ClienteTable, ClienteFilters} from "../../features/clientes";
import {Pagination} from "../../shared/ui/table/Pagination.tsx";


export default function ClientesPage() {
    const { openModal } = useModalContext();
    const { data, isLoading, error } = useClientes();

    const [filtro, setFiltro] = useState("");
    //const [estadoSeleccionado, setEstadoSeleccionado] = useState<string>("true");
    const [paginaActual, setPaginaActual] = useState(1);
    const elementosPorPagina = 10;


    if (isLoading) return (<LoadData message={"Clientes"}/>);

    if (error) {
        return (
            <ComponentCard title="Error">
                <Alert
                    variant="error"
                    title="Mensaje de Error"
                    message="Ocurrió un error al cargar los Clientes."
                    showLink={false}
                />
            </ComponentCard>
        );
    }

    const clientesFiltrados = (data ?? [])
        .filter((cliente) =>
            `${cliente.nombre} ${cliente.carnet}`
                .toLowerCase()
                .includes(filtro.toLowerCase())
        )
        // .filter((cliente) =>
        //     estadoSeleccionado ? cliente.habilitado.toString() === estadoSeleccionado : true
        // )

    const indiceInicio = (paginaActual - 1) * elementosPorPagina;
    const indiceFin = indiceInicio + elementosPorPagina;
    const clientesPaginados = clientesFiltrados.slice(indiceInicio, indiceFin);
    const totalPaginas = Math.ceil(clientesFiltrados.length / elementosPorPagina);


    return (
        <div>
            <PageMeta
                title="React.js Blank Dashboard | TailAdmin"
                description="Lista de Clientes"
            />
            <PageBreadcrumb pageTitle="Lista de Clientes" />

            <div className="space-y-6">
                <ComponentCard title="">

                    <ClienteFilters
                        filtro={filtro}
                        setFiltro={setFiltro}
                        child={
                            <Button
                                size="md"
                                variant="primary"
                                onClick={() => openModal("createCliente")}
                                endIcon={<GroupIcon className="size-5" />}
                            >
                                Nuevo Usuario
                            </Button>
                        }
                    />

                    {clientesFiltrados.length === 0 ? (
                        <ComponentCard title="">
                            <Alert
                                variant="warning"
                                title="No se encontraron resultados"
                                message={`No se encontraron usuarios con el nombre "${filtro}".`}
                                showLink={false}
                            />
                        </ComponentCard>
                    ) : (
                        <ClienteTable clientes={clientesPaginados}/>
                    )}

                    {/* Paginación */}
                    <Pagination
                        paginaActual={paginaActual}
                        totalPaginas={totalPaginas}
                        onPrev={() => setPaginaActual((prev) => prev - 1)}
                        onNext={() => setPaginaActual((prev) => prev + 1)}
                    />
                </ComponentCard>
            </div>
            <EditClienteModal />
            <CreateClienteModal/>
        </div>
    );
}