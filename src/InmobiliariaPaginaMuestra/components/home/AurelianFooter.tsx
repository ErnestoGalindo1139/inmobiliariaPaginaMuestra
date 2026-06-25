import React from 'react';
import { ArrowRight, Globe2, Share2 } from 'lucide-react';

const footerLinks = {
  Empresa: ['Propiedades', 'Servicios'],
  Soporte: ['Contacto', 'Privacidad'],
};

export const AurelianFooter = (): React.JSX.Element => {
  return (
    <footer className="relative overflow-hidden border-t border-[#E9C176]/20 bg-[#121414] px-[3rem] py-[10rem] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(233,193,118,0.08),transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.03),transparent)]" />
      <div className="mx-auto w-full max-w-[136rem]">
        <div className="relative z-10 grid grid-cols-1 gap-[5rem] md:grid-cols-4">
          <div>
            <div className="text-[3.2rem] font-black uppercase leading-none tracking-tight text-[#E9C176]">
              Aurelian
            </div>
            <p className="mt-[2.8rem] max-w-[34rem] font-sans text-[1.65rem] font-medium leading-relaxed text-white/80">
              Redefiniendo el estandar inmobiliario para los que buscan la
              excelencia absoluta.
            </p>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h5 className="mb-[2.4rem] font-sans text-[1.25rem] font-black uppercase tracking-[0.25em] text-white drop-shadow-[0_0.35rem_1.2rem_rgba(0,0,0,0.7)]">
                {title}
              </h5>
              <ul className="space-y-[1.5rem] font-sans text-[1.6rem] font-medium">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      className="text-white/80 transition-colors duration-300 hover:text-[#E9C176]"
                      href="#"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h5 className="mb-[2.4rem] font-sans text-[1.25rem] font-black uppercase tracking-[0.25em] text-white drop-shadow-[0_0.35rem_1.2rem_rgba(0,0,0,0.7)]">
              Newsletter
            </h5>
            <form
              className="flex overflow-hidden rounded-[0.8rem] border border-white/20 bg-black/30"
              onSubmit={(event) => event.preventDefault()}
            >
              <input
                aria-label="Email para newsletter"
                className="min-w-0 flex-1 border-none bg-white/10 px-[1.6rem] py-[1.55rem] font-sans text-[1.5rem] font-semibold text-white outline-none transition-colors placeholder:text-white/60 focus:bg-white/15"
                placeholder="Email"
                type="email"
              />
              <button
                aria-label="Enviar email"
                className="flex w-[5.4rem] items-center justify-center bg-[#E9C176] text-[#2b2418] transition-colors duration-300 hover:bg-[#f4ce82]"
                type="submit"
              >
                <ArrowRight className="h-[2rem] w-[2rem]" />
              </button>
            </form>
          </div>
        </div>

        <div className="relative z-10 mt-[7rem] flex flex-col items-center justify-between gap-[2.8rem] border-t border-white/20 pt-[4rem] md:flex-row">
          <p className="font-sans text-[1.45rem] font-medium text-white/70">
            Copyright 2026 Aurelian Estates. All rights reserved.
          </p>
          <div className="flex gap-[2rem]">
            <a
              aria-label="Compartir"
              className="text-white/80 transition-colors duration-300 hover:text-[#E9C176]"
              href="#"
            >
              <Share2 className="h-[2.2rem] w-[2.2rem]" />
            </a>
            <a
              aria-label="Sitio global"
              className="text-white/80 transition-colors duration-300 hover:text-[#E9C176]"
              href="#"
            >
              <Globe2 className="h-[2.2rem] w-[2.2rem]" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
