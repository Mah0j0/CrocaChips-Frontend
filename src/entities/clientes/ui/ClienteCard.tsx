import { Cliente } from '../model/type'

type Props = {
    cliente: Cliente
}

export const ClienteCard = ({ cliente }: Props) => (
    <div className="p-4 border rounded shadow">
        <h2>{cliente.nombre}</h2>
        <p>{cliente.carnet}</p>
        <span>{cliente.telefono}</span>
    </div>
)
