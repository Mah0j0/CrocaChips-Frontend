import { SidebarProvider, useSidebar } from "../context/SidebarContext";
import { Outlet } from "react-router";
import AppHeader from "./AppHeader";
import Backdrop from "./Backdrop";
import AppSidebar from "./AppSidebar";
import { Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "../api/EmpleadoApi.ts";

const LayoutContent: React.FC = () => {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();

  return (
    <div className="min-h-screen xl:flex">
      <div>
        <AppSidebar />
        <Backdrop />
      </div>
      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${
          isExpanded || isHovered ? "lg:ml-[290px]" : "lg:ml-[90px]"
        } ${isMobileOpen ? "ml-0" : ""}`}
      >
        <AppHeader />
        <div className="p-4 mx-auto max-w-(--breakpoint-2xl) md:p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default function AppLayout() {
    console.log("AppLayout");
    const { data, isLoading, isError } = useQuery({
        queryFn: getUser,
        queryKey: ["user"],
        retry: 5,
        retryDelay: (attempt) => Math.min(1000 * 5 ** attempt, 1000),
        refetchOnWindowFocus: false,
    });
    console.log("data", data, "isLoading", isLoading, "isError", isError);

    if (isLoading) {
        console.log("Loading ---> Loading", isLoading, "isError", isError);
        return (
            <p className="font-bold text-2xl text-center text-white">Cargando...</p>
        );
    }

    if (isError && !data) {
        console.log("Error ----> Error", isLoading, "isError", isError, "data", data);
        console.log("error", isError, "data", !data, "is", isError && !data);
        return <Navigate to="/login" replace/>;
    }

    if (data) {
        console.log("data", data);
        return (
            <SidebarProvider>
                <LayoutContent/>
            </SidebarProvider>
        );
    }
    console.log("End ---> Loading", isLoading, "isError", isError);
    // Si no hay datos y no hay error, mostramos una página de error 404
    // return <Navigate to="/not-found" replace />;
}