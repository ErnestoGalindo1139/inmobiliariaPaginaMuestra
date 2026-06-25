import React from 'react';
import { NavLink } from 'react-router-dom';

export const Navbar = (): React.JSX.Element => {
  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `relative text-[1.35rem] font-bold uppercase tracking-[0.18em] transition-colors duration-300 ${
      isActive ? 'text-[#E9C176]' : 'text-white/70 hover:text-white'
    }`;

  return (
    <nav className="absolute left-0 top-0 z-20 w-full px-[3rem] py-[2.5rem]">
      <div className="mx-auto grid w-full max-w-[136rem] grid-cols-[25%_50%_25%] items-center">
        <h3 className="text-[3.2rem] font-black uppercase leading-none text-[#E9C176]">
          Aurelian
        </h3>
        <div className="flex items-center justify-center gap-[3.6rem]">
          <NavLink className={navLinkClass} to="/">
            {({ isActive }) => (
              <>
                Inicio
                {isActive && (
                  <span className="absolute -bottom-[0.8rem] left-0 h-[0.2rem] w-full bg-[#E9C176]" />
                )}
              </>
            )}
          </NavLink>
          <NavLink className={navLinkClass} to="/about">
            Propiedades
          </NavLink>
          <NavLink className={navLinkClass} to="/servicios">
            Servicios
          </NavLink>
          <NavLink className={navLinkClass} to="/nosotros">
            Nosotros
          </NavLink>
          <NavLink className={navLinkClass} to="/contacto">
            Contacto
          </NavLink>
        </div>

        <div className="flex justify-end">
          <button className="rounded-[1rem] border-none bg-[#E9C176] px-[3.2rem] py-[1.35rem] text-[1.4rem] uppercase tracking-[0.04em] text-[#2b2418] transition-colors duration-300 hover:bg-[#f4ce82]">
            Agendar Cita
          </button>
        </div>
      </div>
    </nav>
  );
};
