import React from 'react';
import { ChevronDown, Search } from 'lucide-react';

const selectBaseClass =
  'h-[5rem] w-full appearance-none rounded-[0.4rem] border border-white/15 bg-white/[0.03] px-[1.4rem] pr-[4rem] font-sans text-[1.55rem] font-semibold text-white/80 outline-none transition-colors duration-300 focus:border-[#E9C176]/70';

export const HeroFilters = (): React.JSX.Element => {
  return (
    <form className="mx-auto grid w-full max-w-[112rem] grid-cols-1 items-end gap-[2.6rem] rounded-[2.2rem] border border-white/[0.08] bg-[#171815]/95 px-[4rem] py-[4.8rem] shadow-[0_2.4rem_6rem_rgba(0,0,0,0.28)] backdrop-blur-md sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_auto] lg:px-[4.2rem]">
      <label className="block">
        <span className="mb-[1rem] block font-sans text-[1.2rem] font-bold uppercase tracking-[0.16em] text-white/65">
          Tipo
        </span>
        <span className="relative block">
          <select className={selectBaseClass} defaultValue="residencial">
            <option className="bg-white text-[#171815]" value="residencial">
              Residencial
            </option>
            <option className="bg-white text-[#171815]" value="departamento">
              Departamento
            </option>
            <option className="bg-white text-[#171815]" value="casa">
              Casa
            </option>
            <option className="bg-white text-[#171815]" value="terreno">
              Terreno
            </option>
          </select>
          <ChevronDown
            aria-hidden="true"
            className="pointer-events-none absolute right-[1.4rem] top-1/2 h-[1.8rem] w-[1.8rem] -translate-y-1/2 text-slate-400"
            strokeWidth={2}
          />
        </span>
      </label>

      <label className="block">
        <span className="mb-[1rem] block font-sans text-[1.2rem] font-bold uppercase tracking-[0.16em] text-white/65">
          Operacion
        </span>
        <span className="relative block">
          <select className={selectBaseClass} defaultValue="venta">
            <option className="bg-white text-[#171815]" value="venta">
              Venta
            </option>
            <option className="bg-white text-[#171815]" value="renta">
              Renta
            </option>
          </select>
          <ChevronDown
            aria-hidden="true"
            className="pointer-events-none absolute right-[1.4rem] top-1/2 h-[1.8rem] w-[1.8rem] -translate-y-1/2 text-slate-400"
            strokeWidth={2}
          />
        </span>
      </label>

      <label className="block">
        <span className="mb-[1rem] block font-sans text-[1.2rem] font-bold uppercase tracking-[0.16em] text-white/65">
          Ubicacion
        </span>
        <input
          className="h-[5rem] w-full rounded-[0.4rem] border border-white/15 bg-white/[0.03] px-[1.4rem] font-sans text-[1.55rem] font-semibold text-white/80 outline-none transition-colors duration-300 placeholder:text-white/25 focus:border-[#E9C176]/70"
          placeholder="Ciudad, Zona..."
          type="text"
        />
      </label>

      <button
        className="flex h-[5.6rem] min-w-[23.6rem] items-center justify-center gap-[1.2rem] rounded-[1.2rem] bg-[#E9C176] px-[3.2rem] font-sans text-[1.55rem] font-semibold uppercase tracking-[0.04em] text-[#241d13] transition-colors duration-300 hover:bg-[#f4ce82] sm:col-span-2 lg:col-span-1"
        type="submit"
      >
        <Search
          aria-hidden="true"
          className="h-[2rem] w-[2rem]"
          strokeWidth={2.4}
        />
        Buscar ahora
      </button>
    </form>
  );
};
