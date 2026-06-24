import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Car } from 'lucide-react';
import { authAPI } from '../services/auth.services';
import { useAuth } from '../hooks/useAuth';
import { useUI } from '../hooks/useUI';

interface RegisterForm {
  de_Nombre: string;
  de_ApellidoPaterno: string;
  de_ApellidoMaterno: string;
  de_Email: string;
  de_Telefono: string;
  de_Contrasena: string;
}

export const RegisterPage = (): React.JSX.Element => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState<RegisterForm>({
    de_Nombre: '',
    de_ApellidoPaterno: '',
    de_ApellidoMaterno: '',
    de_Email: '',
    de_Telefono: '',
    de_Contrasena: '',
  });

  const { loading, showWaitScreen, closeWaitScreen, showToast } = useUI();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

    try {
      showWaitScreen('Creando tu cuenta...');

      const res = await authAPI.register(form);

      if (!res.success || !res.body) {
        throw new Error(res.message || 'No se pudo crear la cuenta');
      }

      login(res.body.token, res.body.usuario);

      showToast('Cuenta creada con éxito 🎉', 'success', 'top-right', 2000);

      // ⏳ Pequeño delay para que el usuario vea el feedback
      setTimeout(() => {
        navigate('/');
      }, 300);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Error al registrar usuario';
      showToast(message, 'error', 'top-right', 3000);
    } finally {
      closeWaitScreen();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
        className="w-full max-w-2xl"
      >
        <div className="bg-white rounded-3xl shadow-xl px-8 py-10 sm:px-12">
          {/* Header */}
          <div className="flex items-center gap-4 mb-10">
            <div className="w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-md">
              <Car size={28} />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Crear cuenta</h1>
              <p className="text-gray-600">
                Publica y encuentra autos de forma confiable
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Datos personales */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="de_Nombre"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Nombre
                </label>
                <input
                  id="de_Nombre"
                  name="de_Nombre"
                  type="text"
                  value={form.de_Nombre}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl bg-gray-50 border border-gray-300 px-4 py-3
                             text-gray-900 focus:bg-white focus:border-blue-600
                             focus:ring-2 focus:ring-blue-500 outline-none transition"
                />
              </div>

              <div>
                <label
                  htmlFor="de_ApellidoPaterno"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Apellido paterno
                </label>
                <input
                  id="de_ApellidoPaterno"
                  name="de_ApellidoPaterno"
                  type="text"
                  value={form.de_ApellidoPaterno}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl bg-gray-50 border border-gray-300 px-4 py-3
                             focus:bg-white focus:border-blue-600 focus:ring-2
                             focus:ring-blue-500 outline-none transition"
                />
              </div>

              <div>
                <label
                  htmlFor="de_ApellidoMaterno"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Apellido materno
                </label>
                <input
                  id="de_ApellidoMaterno"
                  name="de_ApellidoMaterno"
                  type="text"
                  value={form.de_ApellidoMaterno}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl bg-gray-50 border border-gray-300 px-4 py-3
                             focus:bg-white focus:border-blue-600 focus:ring-2
                             focus:ring-blue-500 outline-none transition"
                />
              </div>

              <div>
                <label
                  htmlFor="de_Telefono"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Teléfono
                </label>
                <input
                  id="de_Telefono"
                  name="de_Telefono"
                  type="tel"
                  value={form.de_Telefono}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl bg-gray-50 border border-gray-300 px-4 py-3
                             focus:bg-white focus:border-blue-600 focus:ring-2
                             focus:ring-blue-500 outline-none transition"
                />
              </div>
            </div>

            {/* Credenciales */}
            <div>
              <label
                htmlFor="de_Email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Correo electrónico
              </label>
              <input
                id="de_Email"
                name="de_Email"
                type="email"
                value={form.de_Email}
                onChange={handleChange}
                required
                className="w-full rounded-xl bg-gray-50 border border-gray-300 px-4 py-3
                           focus:bg-white focus:border-blue-600 focus:ring-2
                           focus:ring-blue-500 outline-none transition"
              />
            </div>

            <div>
              <label
                htmlFor="de_Contrasena"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Contraseña
              </label>
              <input
                id="de_Contrasena"
                name="de_Contrasena"
                type="password"
                value={form.de_Contrasena}
                onChange={handleChange}
                required
                className="w-full rounded-xl bg-gray-50 border border-gray-300 px-4 py-3
                           focus:bg-white focus:border-blue-600 focus:ring-2
                           focus:ring-blue-500 outline-none transition"
              />
            </div>

            {/* CTA */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-blue-600 py-4 text-lg font-semibold text-white
                         hover:bg-blue-700 transition shadow-lg disabled:opacity-60"
            >
              {loading ? 'Creando cuenta…' : 'Crear cuenta'}
            </button>
          </form>

          {/* Footer */}
          <p className="mt-8 text-center text-sm text-gray-600">
            ¿Ya tienes cuenta?{' '}
            <Link
              to="/login"
              className="font-medium text-blue-600 hover:underline"
            >
              Inicia sesión
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};
