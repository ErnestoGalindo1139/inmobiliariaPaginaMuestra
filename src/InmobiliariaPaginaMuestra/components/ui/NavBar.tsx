import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  X,
  Car,
  Search,
  PlusCircle,
  User,
  LogOut,
  GitCompareIcon,
} from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export const Navbar = (): React.JSX.Element => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const { isAuthenticated, usuario, logout } = useAuth();

  const goTo = (path: string): void => {
    navigate(path);
    setOpen(false);
  };

  const handlePublicar = (): void => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    navigate('/publicar');
  };

  const linkClass = ({ isActive }: { isActive: boolean }): string =>
    `hover:text-blue-600 transition ${
      isActive ? 'text-blue-600 font-semibold' : ''
    }`;

  return (
    <>
      {/* =========================
          NAVBAR DESKTOP
      ========================== */}
      <nav className="fixed top-0 left-0 w-full h-16 bg-white border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 font-extrabold text-xl text-blue-600"
          >
            <Car />
            AutoMarket
          </button>

          {/* Links Desktop */}
          <div className="hidden md:flex items-center gap-8 font-medium">
            <NavLink to="/autos" className={linkClass}>
              Buscar autos
            </NavLink>

            <NavLink to="/como-funciona" className={linkClass}>
              Cómo funciona
            </NavLink>

            <NavLink to="/comparar" className={linkClass}>
              Comparar
            </NavLink>

            {isAuthenticated && (
              <NavLink to="/mi-cuenta" className={linkClass}>
                Mi cuenta
              </NavLink>
            )}

            {!isAuthenticated ? (
              <>
                <button
                  onClick={() => navigate('/login')}
                  className="hover:text-blue-600"
                >
                  Iniciar sesión
                </button>

                <button
                  onClick={() => navigate('/register')}
                  className="border px-4 py-2 rounded-xl hover:bg-gray-100"
                >
                  Crear cuenta
                </button>
              </>
            ) : (
              <>
                <span className="text-sm text-gray-600">
                  Hola, {usuario?.de_Nombre}
                </span>

                <button
                  onClick={logout}
                  className="flex items-center gap-1 text-red-600 hover:underline"
                >
                  <LogOut size={16} />
                  Salir
                </button>
              </>
            )}

            <button
              onClick={handlePublicar}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition shadow"
            >
              <PlusCircle size={18} />
              Publicar
            </button>
          </div>

          {/* Botón móvil */}
          <button
            onClick={() => setOpen(true)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            <Menu />
          </button>
        </div>
      </nav>

      {/* =========================
          OVERLAY + SIDEBAR MÓVIL
      ========================== */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 bg-black/40 z-40"
            />

            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.3 }}
              className="fixed top-0 right-0 w-80 max-w-full h-full bg-white z-50 shadow-2xl flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-5 border-b">
                <button
                  onClick={() => goTo('/')}
                  className="flex items-center gap-2 font-bold text-lg text-blue-600"
                >
                  <Car />
                  AutoMarket
                </button>

                <button
                  onClick={() => setOpen(false)}
                  className="p-2 rounded-lg hover:bg-gray-100"
                >
                  <X />
                </button>
              </div>

              {/* Links */}
              <div className="flex flex-col gap-2 p-5 text-gray-700">
                <button
                  onClick={() => goTo('/autos')}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100"
                >
                  <Search size={18} />
                  Buscar autos
                </button>

                <button
                  onClick={() => goTo('/como-funciona')}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100"
                >
                  <Car size={18} />
                  Cómo funciona
                </button>

                <button
                  onClick={() => goTo('/comparar')}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100"
                >
                  <GitCompareIcon size={18} />
                  Comparar
                </button>

                {isAuthenticated ? (
                  <>
                    <button
                      onClick={() => goTo('/mi-cuenta')}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100"
                    >
                      <User size={18} />
                      Mi cuenta
                    </button>

                    <button
                      onClick={logout}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-gray-100"
                    >
                      <LogOut size={18} />
                      Cerrar sesión
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => goTo('/login')}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100"
                    >
                      <User size={18} />
                      Iniciar sesión
                    </button>

                    <button
                      onClick={() => goTo('/register')}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100"
                    >
                      <User size={18} />
                      Crear cuenta
                    </button>
                  </>
                )}
              </div>

              {/* CTA */}
              <div className="mt-auto p-5">
                <button
                  onClick={handlePublicar}
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-3 rounded-xl font-semibold shadow-lg"
                >
                  <PlusCircle size={18} />
                  Publicar mi auto
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
