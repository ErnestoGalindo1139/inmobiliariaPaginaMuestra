import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

const backgroundImage =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBuukD5BRg1pm4ZqmBuX-t6dgFZxYGRShIo8vaI0oVQjGuCNM-hwuSwdYkPv3UPM1w-Aw5PeoT7GGEooB6yMmj4GT65uGPlzAZQUZD1XIZ3NRWDTzFrhg7Zb8mlqjmJ94JWaINQq7RYD2fbQ4TdMbZ_mLbQWpwU7vPLf9F_SvAp8Jqq7gKHm4YH1c4xXGNDoPIx6xQJt7ryMPWWLrkBbvYIbdjGlPfR6_5hS1yFomjpHOW2QKZjUn4XCrDg9JAamLLaky2j5peYC1o';

const stats = [
  { value: '+120', label: 'Propiedades' },
  { value: '+8', label: 'Anos de exito' },
  { value: '95%', label: 'Satisfechos' },
  { value: '10', label: 'Paises' },
];

const validations = [
  'Certificacion internacional de Real Estate Luxury',
  'Red de inversores exclusivos a nivel global',
];

export const ResultsSection = (): React.JSX.Element => {
  return (
    <section className="relative overflow-hidden bg-[#111414] px-[3rem] py-[12rem] md:py-[16rem]">
      <div
        className="absolute inset-0 bg-fixed bg-center bg-cover"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      <div className="absolute inset-0 bg-black/85 backdrop-blur-[0.1rem]" />

      <div className="relative z-10 mx-auto grid w-full max-w-[136rem] grid-cols-1 items-center gap-[7rem] lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          transition={{ duration: 0.65, ease: 'easeOut' }}
          viewport={{ amount: 0.35, once: true }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <h2 className="max-w-[66rem] text-[clamp(3.6rem,4vw,5.8rem)] font-black leading-tight text-white">
            Excelencia respaldada por resultados impecables
          </h2>
          <p className="mt-[3rem] max-w-[64rem] font-sans text-[1.9rem] leading-relaxed text-white/78">
            No solo mostramos propiedades; creamos el escenario para su proxima
            etapa de vida. Nuestra metodologia combina el rigor tradicional con
            herramientas digitales de ultima generacion.
          </p>

          <div className="mt-[5rem] flex flex-col gap-[2rem]">
            {validations.map((validation) => (
              <div
                className="flex items-center gap-[1.4rem] font-sans text-[1.8rem] font-semibold text-white"
                key={validation}
              >
                <CheckCircle2 className="h-[2.4rem] w-[2.4rem] shrink-0 text-[#E9C176]" />
                <span>{validation}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 gap-[2rem] md:gap-[3rem]"
          initial={{ opacity: 0, y: 36 }}
          transition={{ delay: 0.12, duration: 0.65, ease: 'easeOut' }}
          viewport={{ amount: 0.35, once: true }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          {stats.map((stat) => (
            <div
              className="lux-glass rounded-[0.8rem] border border-white/10 p-[3rem] text-center shadow-[0_2rem_6rem_rgba(0,0,0,0.24)] md:p-[4rem]"
              key={stat.label}
            >
              <p className="text-[clamp(3.4rem,5vw,6rem)] font-black leading-none text-[#E9C176]">
                {stat.value}
              </p>
              <p className="mt-[1.4rem] font-sans text-[1.15rem] font-bold uppercase tracking-[0.28em] text-white/60">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
