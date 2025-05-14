import {useModalContext} from "../../../app/providers/ModalContext.tsx";
import {TableCell} from "../../../shared/ui/table";
// import Badge from "../../../shared/ui/badge/Badge.tsx";
import Button from "../../../shared/ui/button/Button.tsx";
import {MoreDotIcon} from "../../../shared/icons";
import BasicTableOne from "../../../shared/ui/table/BasicTableOne.tsx";
import {Cliente} from "../../../entities/clientes";

type Props = {
    clientes: Cliente[];
};

export default function ClienteTable({ clientes }: Props) {
    const { openModal } = useModalContext();
    const headers = ["Nombre", "Carnet", "Dirección", "Telefono", ""];

    return (
        <BasicTableOne
            headers={headers}
            data={clientes}
            getKey={(cliente) => cliente.id_cliente}
            renderRow={(cliente) => (
                <>
                    <TableCell className="px-5 py-4 sm:px-6 text-start">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 overflow-hidden rounded-full">
                                <img
                                    width={40}
                                    height={40}
                                    src={cliente.imagen || "/images/user/user-01.jpg"}
                                    alt={cliente.nombre}
                                />
                            </div>
                            <div>
                                <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                                    {cliente.nombre}
                                </span>
                            </div>
                        </div>
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                        {cliente.carnet}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                        {cliente.direccion}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                        {cliente.telefono}
                    </TableCell>
                    {/*<TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">*/}
                    {/*    <Badge*/}
                    {/*        size="sm"*/}
                    {/*        color={cliente.habilitado ? "success" : "warning"}*/}
                    {/*    >*/}
                    {/*        {cliente.habilitado ? "Habilitado" : "Deshabilitado"}*/}
                    {/*    </Badge>*/}
                    {/*</TableCell>*/}
                    <TableCell>
                        <Button
                            endIcon={<MoreDotIcon className="size-5" />}
                            size="md"
                            variant="outline"
                            onClick={() => openModal("editCliente", cliente)}
                        />
                    </TableCell>
                </>
            )}
        />
    );
}
