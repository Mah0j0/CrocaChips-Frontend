import {Empleado} from "../../../../entities/empleados";

export type NewEmpleado = Omit<Empleado, "id" | "usuario">
