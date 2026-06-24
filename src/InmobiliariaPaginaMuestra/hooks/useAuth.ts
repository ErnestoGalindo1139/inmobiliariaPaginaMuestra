import { useContext } from 'react';
import type { IAuthContext } from '../interfaces/auth.interfaces';
import { AuthContext } from '../context/AuthContext';

export const useAuth = (): IAuthContext => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth debe usarse dentro de <AuthProvider>');
  }

  return context;
};
