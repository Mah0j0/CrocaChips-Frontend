import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
} from "react";

interface AuthContextType {
    authenticated: boolean;
    login: (access: string, refresh: string) => void;
    logout: () => void;
}

interface AuthProviderProps {
    children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {

    const [authenticated, setAuthenticated] = useState<boolean>(false);

    useEffect(() => {
        const access = localStorage.getItem("AUTH_CROCA");
        const refresh = localStorage.getItem("REFRESH_CROCA");

        if (access && refresh) {
            setAuthenticated(true);
        } else {
            setAuthenticated(false);
        }
    }, []);

    const login = (access: string, refresh: string) => {
        localStorage.setItem("AUTH_CROCA", access);
        localStorage.setItem("REFRESH_CROCA", refresh);
        setAuthenticated(true);
    };

    const logout = () => {
        localStorage.removeItem("AUTH_CROCA");
        localStorage.removeItem("REFRESH_CROCA");
        setAuthenticated(false);
        window.location.href = "/login"; // Redirige si quieres
    };

    return (
        <AuthContext.Provider value={{ authenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
