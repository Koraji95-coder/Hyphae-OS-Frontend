import { useState, useEffect, createContext, useContext, ReactNode } from "react";
import { login as apiLogin, logout as apiLogout, refreshToken, getProfile } from "../services/auth";

type User = {
  email: string;
  pinVerified: boolean;
  role: "owner" | "admin" | "guest";
};

type AuthContextType = {
  user: User | null;
  token: string | null;
  login: (email: string, password: string, pin?: string) => Promise<any>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const init = async () => {
      try {
        const newToken = await refreshToken();
        setToken(newToken);
        const data = await getProfile(newToken);
        setUser(data);
      } catch {
        setUser(null);
        setToken(null);
      }
    };
    init();
  }, []);

  const login = async (email: string, password: string, pin?: string) => {
    const response = await apiLogin(email, password, pin);
    if (response.token) {
      setToken(response.token);
      const data = await getProfile(response.token);
      setUser(data);
    }
    return response;
  };

  const logout = () => {
    apiLogout();
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
