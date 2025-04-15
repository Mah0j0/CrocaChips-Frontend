import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "swiper/swiper-bundle.css";
import "flatpickr/dist/flatpickr.css";
import App from "./App.tsx";
import { AppWrapper } from "./components/common/PageMeta.tsx";
import { ThemeProvider } from "./context/ThemeContext.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider} from "./context/AuthContext.tsx";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";

// 1. Crear el cliente de React Query
const queryClient = new QueryClient();

// 2. Envolver la app con el QueryClientProvider
createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <ThemeProvider>
                <AppWrapper>
                    <AuthProvider>
                        <App />
                    </AuthProvider>
                </AppWrapper>
            </ThemeProvider>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    </StrictMode>
);
