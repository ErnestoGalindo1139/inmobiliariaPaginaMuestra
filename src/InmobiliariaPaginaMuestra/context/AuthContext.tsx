import React, { createContext, useContext, useEffect, useState } from 'react';
import type { IAuthContext, IUsuarioAuth } from '../interfaces/auth.interfaces';

const AuthContext = createContext<IAuthContext | undefined>(undefined);

const AUTH_STORAGE_KEY = 'automarket_auth';

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({
  children,
}: AuthProviderProps): React.JSX.Element => {
  const [usuario, setUsuario] = useState<IUsuarioAuth | null>(null);
  const [token, setToken] = useState<string | null>(null);

  /* =========================
     CARGAR SESIÓN AL INICIAR
  ========================== */

  useEffect(() => {
    const stored = localStorage.getItem(AUTH_STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setUsuario(parsed.usuario);
        setToken(parsed.token);
      } catch {
        localStorage.removeItem(AUTH_STORAGE_KEY);
      }
    }
  }, []);

  /* =========================
     LOGIN
  ========================== */

  const login = (newToken: string, newUsuario: IUsuarioAuth): void => {
    setToken(newToken);
    setUsuario(newUsuario);

    localStorage.setItem(
      AUTH_STORAGE_KEY,
      JSON.stringify({
        token: newToken,
        usuario: newUsuario,
      })
    );
  };

  /* =========================
     LOGOUT
  ========================== */

  const logout = (): void => {
    setToken(null);
    setUsuario(null);
    localStorage.removeItem(AUTH_STORAGE_KEY);
  };

  return (
    <AuthContext.Provider
      value={{
        usuario,
        token,
        isAuthenticated: Boolean(token),
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };
