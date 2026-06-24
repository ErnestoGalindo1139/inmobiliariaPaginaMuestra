export interface IUsuarioAuth {
  id_Usuario: number;
  de_Nombre: string;
  de_ApellidoPaterno: string;
  de_ApellidoMaterno: string;
  de_Email: string;
  de_Telefono: string;
  sn_Verificado: number;
}

export interface IAuthContext {
  usuario: IUsuarioAuth | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (token: string, usuario: IUsuarioAuth) => void;
  logout: () => void;
}

export interface ILoginRequest {
  de_Email: string;
  de_Contrasena: string;
}

export interface IRegisterRequest {
  de_Nombre: string;
  de_ApellidoPaterno: string;
  de_ApellidoMaterno: string;
  de_Email: string;
  de_Telefono: string;
  de_Contrasena: string;
}

export interface IAuthResponse {
  token: string;
  usuario: {
    id_Usuario: number;
    de_Nombre: string;
    de_ApellidoPaterno: string;
    de_ApellidoMaterno: string;
    de_Email: string;
    de_Telefono: string;
    sn_Verificado: number;
  };
}
