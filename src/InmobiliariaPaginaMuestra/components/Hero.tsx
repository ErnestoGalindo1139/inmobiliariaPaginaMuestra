import React from 'react';

import { HeroFilters } from './HeroFilters';

const heroImage =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBw1NcdMD02ra1ccuwx7SvWd1eaxrbfpS5TBOvYYzkZpOU4tO0_Dz7F2ilrtthcM8G0Y3kgsCm_EBcf4o1GazDHHEWgT94GpOba3WnTXNZzEw5_eIyKPcfMXJRI1Mf5STCqnyyUjXwX_StEQQlB86V6g9ewxlQZFKshIDIOyQdxfSBnWZwWKbzZZ_XtwVrT04yhBiA-2Awv93C56WLIX-Ty4_HI7H8ae63-0BlNyoJsGOYwQAXENIQnOX88UT4tZC3ituDi_VsxbXk';

export const Hero = (): React.JSX.Element => {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#101413]">
      <img
        alt="Luxury Villa Sunset"
        className="ken-burns absolute inset-0 h-full w-full object-cover"
        src={heroImage}
      />

      <div className="absolute inset-0 bg-black/55" />

      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/25 to-transparent" />

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[136rem] items-center px-[3rem] pb-[26rem] pt-[8rem]">
        <div className="max-w-[78rem]">
          <h1 className="text-[clamp(4rem,5vw,7rem)] font-black leading-[0.98] text-white">
            Encuentra la propiedad ideal con una{' '}
            <span className="text-[#E9C176]">experiencia inmobiliaria</span>{' '}
            diferente
          </h1>

          <p className="mt-[2.8rem] max-w-[66rem] font-sans text-[2rem] font-semibold leading-[1.45] text-white/90">
            Compra, vende o renta propiedades con una asesoria profesional,
            visual y moderna, disenada para el mercado de alto nivel.
          </p>

          <div className="mt-[5rem] flex flex-wrap gap-[2.4rem]">
            <button className="rounded-[1rem] bg-[#E9C176] px-[4rem] py-[1.9rem] font-sans text-[1.55rem] font-semibold uppercase tracking-[0.18em] text-[#2b2418] transition-colors duration-300 hover:bg-[#f4ce82]">
              Ver propiedades
            </button>

            <button className="rounded-[1rem] border border-white/25 bg-black/35 px-[4rem] py-[1.9rem] font-sans text-[1.55rem] font-semibold uppercase tracking-[0.16em] text-white backdrop-blur-sm transition-colors duration-300 hover:bg-white/10">
              Agendar asesoria
            </button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-[9rem] left-0 right-0 z-20 mx-auto w-full px-[3rem]">
        <HeroFilters />
      </div>
    </section>
  );
};
