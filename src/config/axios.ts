import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

// Interceptor para agregar el token solo si no es una ruta de login
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("AUTH_TOKEN");

    // Rutas donde NO se debe enviar el token
    const excludedRoutes = ["/login", "/auth/login"];

    const isExcluded = excludedRoutes.some(route =>
        config.url?.includes(route)
    );

    if (token && !isExcluded) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export default api;
