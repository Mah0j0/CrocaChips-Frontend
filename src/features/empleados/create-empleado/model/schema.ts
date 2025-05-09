import { z } from "zod";

export const empleadoCreateSchema = z.object({
    nombre: z.string().min(3, "Nombre muy corto"),
    apellido: z.string().min(3, "Apellido muy corto"),
    carnet: z.string().regex(/^[0-9]{8}$/, "Carnet debe tener 8 dígitos"),
    telefono: z.string().regex(/^[0-9]{8}$/, "Teléfono debe tener 8 dígitos"),
    rol: z.string(),
    usuario: z.string().optional(), // puede generarse automáticamente
    // otros campos si aplica
});

export type EmpleadoFormValues = z.infer<typeof empleadoCreateSchema>;
