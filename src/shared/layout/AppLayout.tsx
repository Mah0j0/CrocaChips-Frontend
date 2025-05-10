import React from "react"; // Asegúrate de importar React
import { SidebarProvider, useSidebar } from "../context/SidebarContext.tsx";
import { Outlet, Navigate } from "react-router-dom"; // Agrupa imports de react-router-dom

// Componentes de UI
import AppHeader from "./AppHeader.tsx";
import Backdrop from "./Backdrop.tsx";
import AppSidebar from "./AppSidebar.tsx";
import LoadingSpinner from "./LoadingSpinner.tsx";
import {EmpleadoInfo, useEmpleado} from "../../entities/empleados";

// API y Tipos

// --- Componente de Contenido del Layout ---
type LayoutContentProps = {
    userData: EmpleadoInfo;
}

const LayoutContent: React.FC<LayoutContentProps> = ({ userData }) => {
    const { isExpanded, isHovered, isMobileOpen } = useSidebar();

    const sidebarMarginClass = isExpanded || isHovered ? "lg:ml-[290px]" : "lg:ml-[90px]";
    const mobileMarginClass = isMobileOpen ? "ml-0" : "";

    return (
        <div className="flex min-h-screen">
            <div>
                <AppSidebar />
                <Backdrop />
            </div>

            <div
                className={`flex-1 transition-margin duration-300 ease-in-out ${sidebarMarginClass} ${mobileMarginClass}`} // Usa `transition-margin` si eso es lo que estás transicionando
            >
                <AppHeader userData={userData} />

                <main className="p-4 mx-auto max-w-screen-2xl md:p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};


// --- Componente Principal del Layout ---

export default function AppLayout() {
    const { data: userData, isLoading, isError } = useEmpleado();

    // 1. Estado de Carga
    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-25 dark:bg-gray-800">
                <LoadingSpinner />
            </div>
        );
    }

    // 2. Estado de Error
    if (isError) {
        return  <Navigate to="/login" replace />; ;
    }

    // 3. Estado Exitoso (userData está disponible)
    if (userData) {
        return (
            <SidebarProvider>
                <LayoutContent userData={userData} />
            </SidebarProvider>
        );
    }

    // 4. Estado Inesperado (userData no está disponible)
    return <Navigate to="/login" replace />;
}