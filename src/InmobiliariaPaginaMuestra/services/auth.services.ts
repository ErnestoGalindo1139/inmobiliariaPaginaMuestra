import type {
  ILoginRequest,
  IRegisterRequest,
  IAuthResponse,
} from '../interfaces/auth.interfaces';
import type { IApiResponse } from '../interfaces/api.interfaces';
import { apiFetch } from './api';

export const authAPI = {
  login: (data: ILoginRequest): Promise<IApiResponse<IAuthResponse>> =>
    apiFetch('/usuarios/login', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  register: (data: IRegisterRequest): Promise<IApiResponse<IAuthResponse>> =>
    apiFetch('/usuarios/register', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
};
