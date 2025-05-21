import { z } from "zod";

export const nuevoDetalleSchema = z.object({
    producto: z.number().min(1, "El ID del producto debe ser un número positivo"),
    cantidad: z.number().min(1, "La cantidad debe ser al menos 1"),
});

export const nuevaVentaSchema = z.object({
    cliente: z.number().min(1, "El ID del cliente debe ser un número positivo"),
    detalles: z.array(nuevoDetalleSchema).min(1, "Debe haber al menos un detalle en la venta"),
});

export type NuevaVenta = z.infer<typeof nuevaVentaSchema>;
export type NuevoDetalle = z.infer<typeof nuevoDetalleSchema>;