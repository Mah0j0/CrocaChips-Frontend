import { z } from "zod";

export const productoSchema = z.object({
// si se usa en edición
nombre: z
    .string()
    .min(1, "El nombre es requerido")
    .regex(
        /^[A-Za-zÁÉÍÓÚáéíóúÑñÜü\s]+$/,
        "El nombre solo puede contener letras y espacios"
    )
    .max(30, "El nombre no puede exceder los 1000 caracteres"),
descripcion: z
    .string()
    .min(1, "La descripción es requerida")
    .regex(
        /^[A-Za-zÁÉÍÓÚáéíóúÑñÜü\s]+$/,
        "La descripción solo puede contener letras y espacios"
    )
    .max(255, "La descripción no puede exceder los 1000 caracteres"),
tiempo_vida: z.coerce
    .number({
        invalid_type_error: "El tiempo de vida debe ser un número",
    })
    .int("Debe ser un número entero")
    .positive("Debe ser mayor a cero"),
precio_unitario: z.coerce
    .number({
        invalid_type_error: "El precio debe ser un número",
    })
    .min(0, "El precio no puede ser negativo")
    .refine(
        (val) => Number.isFinite(val) && /^\d+(\.\d{1,2})?$/.test(val.toString()),
        { message: "El precio solo puede tener hasta dos decimales" }
    ),
stock: z.coerce
    .number({
        invalid_type_error: "El stock debe ser un número",
    })
    .min(0, "El stock no puede ser negativo"),

});

export type ProductoFormData = z.infer<typeof productoSchema>;
