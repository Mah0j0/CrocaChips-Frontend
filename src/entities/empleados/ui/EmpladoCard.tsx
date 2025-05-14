import { Empleado } from '../model/types'

type Props = {
    employee: Empleado
}

export const EmpleadoCard = ({ employee }: Props) => (
    <div className="p-4 border rounded shadow">
        <h2>{employee.nombre}</h2>
        <p>{employee.carnet}</p>
        <span>{employee.rol}</span>
    </div>
)
