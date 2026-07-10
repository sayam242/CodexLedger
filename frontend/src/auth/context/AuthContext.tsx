/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, type ReactNode } from "react";
import type { User } from "firebase/auth";
import { useAuth } from "../hooks/useAuth";

interface AuthContextType {
    user: User | null;
    loading: boolean;
    loginInProgress: boolean;
    setLoginInProgress: (value: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const { user, loading } = useAuth();
    const [loginInProgress, setLoginInProgress] = useState(false);

    return (
        <AuthContext.Provider value={{ user, loading, loginInProgress, setLoginInProgress }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuthContext(): AuthContextType {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuthContext must be used within an AuthProvider");
    }
    return context;
}
