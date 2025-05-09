import { Producto } from '../model/type'

type Props = {
    producto: Producto
}

export const ProductoCard = ({ producto }: Props) => (
    <div className="p-4 border rounded shadow">
        <h2>{producto.nombre}</h2>
        <p>{producto.stock}</p>
        <span>{producto.precio_unitario}</span>
    </div>
)
