
import { Empleado } from '../model/types'

export const formatNombreEmpleado = (empleado: Empleado): string => {
    return `${empleado.nombre} (${empleado.rol.toUpperCase()})`
}