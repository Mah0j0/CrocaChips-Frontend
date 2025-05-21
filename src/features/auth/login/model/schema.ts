// features/auth/model/schema.ts
import { z } from "zod";

export const loginSchema = z.object({
    usuario: z.string().min(1, "El nombre de usuario es obligatorio"),
    clave: z.string().min(1, "La contraseña es obligatoria"),
});

export type LoginForm = z.infer<typeof loginSchema>;
