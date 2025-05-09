import { z } from "zod";

export const empleadoSchema = z.object({
    nombre: z.string().min(1, "El nombre es obligatorio"),
    apellido: z.string().min(1, "El apellido es obligatorio"),
    //rol: z.string().min(1, "El rol es obligatorio"),
    //id: z.number().int("El ID debe ser un número entero"),
    //usuario: z.string().min(1, "El usuario es obligatorio"),
    telefono: z.number().int("El teléfono debe ser un número entero"),
    carnet: z.string().min(1, "El carnet es obligatorio"),
    //imagen: z.string().url("La imagen debe ser una URL válida"),
    //habilitado: z.boolean(),
});

export type Empleado = z.infer<typeof empleadoSchema>;