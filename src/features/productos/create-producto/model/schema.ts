import { z } from "zod";

export const productoCreateSchema = z.object({
    nombre: z
        .string()
        .min(1, "El nombre es obligatorio")
        .max(100, "El nombre no debe superar los 100 caracteres"),

    descripcion: z
        .string()
        .min(1, "La descripción es obligatoria")
        .max(500, "La descripción no debe superar los 500 caracteres"),

    tiempo_vida: z
        .string({
            required_error: "El tiempo de vida es obligatorio",
            invalid_type_error: "El tiempo de vida debe ser un número",
        })
        .min(1, "Debe ser al menos 1 mes")
        .max(120, "No puede ser mayor a 120 meses"),

    precio_unitario: z
        .string({
            required_error: "El precio unitario es obligatorio",
            invalid_type_error: "El precio unitario debe ser un número",
        })
        .min(0.01, "Debe ser mayor a 0")
        .max(100_000, "No puede exceder 100,000 Bs."),

    stock: z
        .string({
            required_error: "El stock es obligatorio",
            invalid_type_error: "El stock debe ser un número",
        })
        .min(0, "No puede ser negativo")
        .max(100_000, "No puede exceder 100,000 unidades"),
});

export type ProductoFormValues = z.infer<typeof productoCreateSchema>;
