
import { Venta } from '../model/type'

export const formatVenta = (venta: Venta): string => {
    return `${venta.fecha}`
}