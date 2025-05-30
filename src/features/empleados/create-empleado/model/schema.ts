import { z } from "zod";

export const createEmpleadoSchema = z.object({
    nombre: z.string().min(2, "El nombre es requerido"),
    apellido: z.string().min(2, "El apellido es requerido"),
    carnet: z.string().min(5, "Carnet requerido"),
    rol: z.string().min(1, "Seleccione un rol"),
    telefono: z
        .string()
        .transform((val) => val.replace(/[^0-9]/g, '')) // Remove non-digit characters
        .pipe(z.coerce.number().min(1000000, "Teléfono inválido").max(999999999999999, "Teléfono inválido")), // Example min/max for 7-15 digits
    habilitado: z.boolean().optional(),
});