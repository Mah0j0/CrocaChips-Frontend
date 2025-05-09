import { Venta } from '../model/type'

type Props = {
    venta: Venta
}

export const EmployeeCard = ({ venta }: Props) => (
    <div className="p-4 border rounded shadow">
        <h2>{venta.cliente}</h2>
        <p>{venta.fecha}</p>
        <span>{venta.vendedor_nombre}</span>
    </div>
)
