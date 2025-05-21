
import { Movimiento } from '../model/type'

export const formatProducto = (movimiento: Movimiento): string => {
    return `${movimiento.cantidad}`
}