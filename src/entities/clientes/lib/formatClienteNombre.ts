
import { Cliente } from '../model/type'

export const formatNombreEmpleado = (empleado: Cliente): string => {
    return `${empleado.nombre}`
}