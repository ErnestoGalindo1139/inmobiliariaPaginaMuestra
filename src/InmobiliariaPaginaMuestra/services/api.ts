const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4002';

export async function apiFetch<T>(
  endpoint: string,
  // eslint-disable-next-line no-undef
  options: RequestInit = {}
): Promise<T> {
  try {
    const isFormData = options.body instanceof FormData;

    const response = await fetch(`${API_URL}${endpoint}`, {
      headers: {
        ...(isFormData ? {} : { 'Content-Type': 'application/json' }), // 👈 solo si no es FormData
        ...(options.headers || {}),
      },
      ...options,
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(
        data?.error ||
          data?.message ||
          `Error HTTP ${response.status} al obtener ${endpoint}`
      );
    }

    if (data && data.success === false) {
      throw new Error(data.error || data.message || 'Error en la respuesta');
    }

    return data;
  } catch (error) {
    console.error('❌ Error en apiFetch:', error);
    throw error;
  }
}
