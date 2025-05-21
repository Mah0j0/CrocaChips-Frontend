
import { Producto } from '../model/type'

export const formatProducto = (producto: Producto): string => {
    return `${producto.nombre}`
}