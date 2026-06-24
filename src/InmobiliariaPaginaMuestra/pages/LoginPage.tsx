import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../services/auth.services';
import { useAuth } from '../hooks/useAuth';

export const LoginPage = (): React.JSX.Element => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    de_Email: '',
    de_Contrasena: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setError(null);

    try {
      setLoading(true);
      const res = await authAPI.login(form);

      if (res.success && res.body) {
        login(res.body.token, res.body.usuario);
        navigate('/');
      }
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-sm w-full max-w-md"
      >
        <h1 className="text-2xl font-bold mb-6">Iniciar sesión</h1>

        {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

        <div className="space-y-4">
          <input
            name="de_Email"
            type="email"
            placeholder="Correo electrónico"
            value={form.de_Email}
            onChange={handleChange}
            required
            className="w-full border rounded-xl px-4 py-3"
          />

          <input
            name="de_Contrasena"
            type="password"
            placeholder="Contraseña"
            value={form.de_Contrasena}
            onChange={handleChange}
            required
            className="w-full border rounded-xl px-4 py-3"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </div>
      </form>
    </div>
  );
};
