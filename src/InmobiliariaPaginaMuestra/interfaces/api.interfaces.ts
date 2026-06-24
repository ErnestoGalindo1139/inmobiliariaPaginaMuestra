export interface IApiResponse<T> {
  success: boolean;
  body?: T;
  message?: string;
  error?: unknown;
}
