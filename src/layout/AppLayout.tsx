import React from "react"; // Asegúrate de importar React
import { SidebarProvider, useSidebar } from "../context/SidebarContext";
import { Outlet, Navigate } from "react-router-dom"; // Agrupa imports de react-router-dom
import { useQuery } from "@tanstack/react-query";

// Componentes de UI
import AppHeader from "./AppHeader";
import Backdrop from "./Backdrop";
import AppSidebar from "./AppSidebar";
import LoadingSpinner from "./LoadingSpinner";

// API y Tipos
import { getUser } from "../api/EmpleadoApi";
import { EmpleadoInfo } from "../types/empleados";

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
    const { data: userData, isLoading, isError } = useQuery({
        queryKey: ["user"],
        queryFn: getUser,
        retry: 1,
        // retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 30000), // Estrategia de backoff exponencial (opcional)
        refetchOnWindowFocus: false,
        staleTime: 5 * 60 * 1000,
    });

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