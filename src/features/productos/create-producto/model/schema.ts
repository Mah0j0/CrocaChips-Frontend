import { z } from "zod";

export const productoCreateSchema = z.object({
    //id_producto: z.number(),
    nombre: z.string().min(1, "El nombre es obligatorio"),
    //producto_nombre: z.string().min(1, "El nombre del producto es obligatorio"),
    descripcion: z.string().min(1, "La descripción es obligatoria"),
    tiempo_vida: z.number().min(0, "El tiempo de vida debe ser un número positivo"),
    precio_unitario: z.number().min(0, "El precio unitario debe ser un número positivo"),
    //cantidad_volatil: z.number().min(0, "La cantidad volátil debe ser un número positivo"),
    stock: z.number().min(0, "El stock debe ser un número positivo"),
    //habilitado: z.boolean().optional(),
});

export type ProductoFormValues = z.infer<typeof productoCreateSchema>;