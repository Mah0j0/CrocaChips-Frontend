import { z } from "zod";

export const clienteCreateSchema = z.object({
    //id_cliente: z.number(),
    nombre: z.string().min(1, "El nombre es obligatorio"),
    direccion: z.string().min(1, "La dirección es obligatoria"),
    telefono: z.string().regex(/^[0-9]{8}$/, "El teléfono debe tener 8 dígitos"),
    //habilitado: z.boolean(),
    carnet: z.string().regex(/^[0-9]{8}$/, "El carnet debe tener 8 dígitos"),
    //created_at: z.date(),
    //imagen: z.string().url("La imagen debe ser una URL válida"),
});

export type EmpleadoFormValues = z.infer<typeof clienteCreateSchema>;
