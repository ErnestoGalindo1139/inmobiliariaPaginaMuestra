import React from 'react';
import { CalendarDays } from 'lucide-react';
import { motion } from 'framer-motion';

const backgroundImage =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuB9cx8cPmSNt-rW0ct1PK5SBiKfxPoqXulBf8RlyvjWDISc9WaHn8kGpRTtkc0JWNAv4G3Gj00ACeorZ5cFWCW28K6SS3l0X9LjmaBfJHcLFyvUknES6r621wNXfd3vaXKNdkH-IuwIospk-3orWKoSOkxyFl9OSwWVQrhk1I66v2FxJ3Lw0b1nDKqgT3r1FC0s9MHK9PMBdRCLwXLYDVgNOkcLAPFXqXJ1OVUTqFr1ya6yTFZveXPLrSIk_VJhK9On6FQxHCTxK2I';

export const FinalCta = (): React.JSX.Element => {
  return (
    <section className="relative flex min-h-[64vh] items-center justify-center overflow-hidden px-[3rem] py-[11rem] text-center">
      <img
        alt="Residencia para iniciar asesoria"
        className="absolute inset-0 h-full w-full object-cover"
        src={backgroundImage}
      />
      <div className="absolute inset-0 bg-black/72" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.22),rgba(0,0,0,0.72)_68%)]" />

      <motion.div
        className="relative z-10 mx-auto max-w-[86rem]"
        initial={{ opacity: 0, y: 34 }}
        transition={{ duration: 0.65, ease: 'easeOut' }}
        viewport={{ amount: 0.45, once: true }}
        whileInView={{ opacity: 1, y: 0 }}
      >
        <h2 className="cinematic-heading text-[clamp(3.2rem,4.8vw,5.8rem)] font-black leading-tight text-white">
          Tu proxima propiedad puede empezar con una conversacion
        </h2>
        <p className="cta-readable-text mx-auto mt-[2.8rem] max-w-[72rem] font-sans text-[2rem] font-semibold leading-relaxed text-white">
          Agenda una asesoria personalizada y descubre como podemos ayudarte a
          encontrar el lugar ideal.
        </p>
        <a
          className="champagne-glow mt-[4.6rem] inline-flex items-center gap-[1.2rem] rounded-full bg-[#E9C176] px-[4rem] py-[1.8rem] font-sans text-[1.45rem] font-black uppercase tracking-[0.14em] text-[#2b2418] transition-transform duration-300 hover:scale-105"
          href="#contacto"
        >
          <CalendarDays className="h-[2rem] w-[2rem]" />
          Agendar Asesoria
        </a>
      </motion.div>
    </section>
  );
};
