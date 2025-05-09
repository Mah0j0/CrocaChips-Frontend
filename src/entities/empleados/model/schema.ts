import { z } from "zod";

export const EmpleadoSchema = z.object({
    nombre: z.string(),
    apellido: z.string(),
    rol: z.string(),
    id: z.string().optional(),
    usuario: z.string(),
    telefono: z.string().optional(),
    carnet: z.string().optional(),
    imagen: z.string().optional(),
    habilitado: z.boolean().optional(),
});

export type Empleado = z.infer<typeof EmpleadoSchema>;