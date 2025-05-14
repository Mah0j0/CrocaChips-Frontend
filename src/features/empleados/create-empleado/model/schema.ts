import { z } from "zod";

export const empleadoCreateSchema = z.object({
    nombre: z.string().min(3, "Nombre muy corto").nonempty("Nombre es requerido"),
    apellido: z.string().min(3, "Apellido muy corto").nonempty("Apellido es requerido"),
    carnet: z.string().regex(/^[0-9]{8}$/, "Carnet debe tener 8 dígitos").nonempty("Carnet es requerido"),
    telefono: z.string().regex(/^[0-9]{8}$/, "Teléfono debe tener 8 dígitos").nonempty("Teléfono es requerido"),
    rol: z.string().nonempty("Rol es requerido"),
    usuario: z.string().optional(), // puede generarse automáticamente
    // otros campos si aplica
});

export type EmpleadoFormValues = z.infer<typeof empleadoCreateSchema>;