import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
} from "react";

interface AuthContextType {
    authenticated: boolean;
    login: (token: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [authenticated, setAuthenticated] = useState<boolean>(false);

    useEffect(() => {
        console.log("AuthProvider useEffect");
        const token = localStorage.getItem("AUTH_CROCA");
        setAuthenticated(!!token);
    }, []);

    const login = (token: string) => {
        console.log("login", token);
        localStorage.setItem("AUTH_CROCA", token);
        setAuthenticated(true);
    };

    const logout = () => {
        localStorage.removeItem("AUTH_CROCA");
        setAuthenticated(false);
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
