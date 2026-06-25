import React, { useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const locations = [
  {
    name: 'Polanco Section',
    description: 'El epicentro del lujo urbano.',
    properties: '24 Propiedades',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCVyA8Uza4g4I8MMiuuyKQih1OoLFwK7kUVRPBk1RBuYmKDPsHouVp12SblZ0eoVcr8gjnHmWYfimBwxB5g-mWNnqP0A8zcAemfuZw0qLf9IsrI6M8aYaccppXule-Owjw8pPFjJ8EF_urzWaBM5OEOLeq83kGZ41Av01rZCOk9m9qaZEuacAATuQmXHywUv9o7zgp73fWoJ09k9HpN_1IJvaX5BjNPR117tTDSCQgFJ9f607nsc4P6mZMfg1aSH7RdiBc9sUebaY8',
  },
  {
    name: 'Santa Fe Prime',
    description: 'Corredor corporativo y residencial premium.',
    properties: '18 Propiedades',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDfCh61zqqRGylWdE1AnCXv8ZZkK953Qof5ZgLbxFN6FmRiM0shUooaDd4O8OJIlZJjnvuGzfNqFVrfA3Winztb0s_eIaXalWiupTF40NfjTs8rw3YnP6tdyNxixmN-BSYIvebgNMTxWdmOZ4QNVU18x_THlannQTZvKxO_ZXyKfLZr8yECbOSjLM8SR9gRmaGdy2js1LDO9dFq80gSIfOOfsOg7qFSK1QJ5ELGEpEcKoLNvYaGvt5epOcKXnTyO72KKRxID2Unf9w',
  },
  {
    name: 'Bosques Reserve',
    description: 'Privacidad, vistas y patrimonio familiar.',
    properties: '12 Propiedades',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB9cx8cPmSNt-rW0ct1PK5SBiKfxPoqXulBf8RlyvjWDISc9WaHn8kGpRTtkc0JWNAv4G3Gj00ACeorZ5cFWCW28K6SS3l0X9LjmaBfJHcLFyvUknES6r621wNXfd3vaXKNdkH-IuwIospk-3orWKoSOkxyFl9OSwWVQrhk1I66v2FxJ3Lw0b1nDKqgT3r1FC0s9MHK9PMBdRCLwXLYDVgNOkcLAPFXqXJ1OVUTqFr1ya6yTFZveXPLrSIk_VJhK9On6FQxHCTxK2I',
  },
];

export const StrategicLocations = (): React.JSX.Element => {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeLocation = locations[activeIndex];

  const visibleLocations = useMemo(() => {
    return [
      ...locations.slice(activeIndex),
      ...locations.slice(0, activeIndex),
    ];
  }, [activeIndex]);

  const updateIndex = (direction: 1 | -1): void => {
    setActiveIndex((currentIndex) => {
      const nextIndex = currentIndex + direction;

      if (nextIndex < 0) {
        return locations.length - 1;
      }

      if (nextIndex >= locations.length) {
        return 0;
      }

      return nextIndex;
    });
  };

  return (
    <section className="bg-[#181a19] px-[3rem] py-[12rem] md:py-[15rem]">
      <div className="mx-auto w-full max-w-[136rem]">
        <motion.div
          className="mb-[5rem] flex flex-col justify-between gap-[3rem] md:flex-row md:items-end"
          initial={{ opacity: 0, y: 32 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          viewport={{ amount: 0.35, once: true }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <div>
            <h2 className="text-[clamp(3.6rem,4vw,5.8rem)] font-black leading-tight text-white">
              Ubicaciones Estrategicas
            </h2>
            <p className="mt-[1.8rem] max-w-[58rem] font-sans text-[1.8rem] leading-relaxed text-white/65">
              Descubre las zonas con mayor plusvalia y estilo de vida donde
              operamos activamente.
            </p>
          </div>

          <div className="flex gap-[1.2rem]">
            <button
              aria-label="Ver ubicacion anterior"
              className="flex h-[5.2rem] w-[5.2rem] items-center justify-center rounded-full border border-white/20 text-white transition-all duration-300 hover:border-[#E9C176] hover:bg-[#E9C176] hover:text-[#2b2418]"
              onClick={() => updateIndex(-1)}
              type="button"
            >
              <ArrowLeft className="h-[2rem] w-[2rem]" />
            </button>
            <button
              aria-label="Ver siguiente ubicacion"
              className="flex h-[5.2rem] w-[5.2rem] items-center justify-center rounded-full border border-white/20 text-white transition-all duration-300 hover:border-[#E9C176] hover:bg-[#E9C176] hover:text-[#2b2418]"
              onClick={() => updateIndex(1)}
              type="button"
            >
              <ArrowRight className="h-[2rem] w-[2rem]" />
            </button>
          </div>
        </motion.div>

        <motion.div
          className="relative min-h-[60rem] overflow-hidden rounded-[0.8rem] border border-white/10 bg-[#111414] shadow-inner"
          initial={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          viewport={{ amount: 0.25, once: true }}
          whileInView={{ opacity: 1, scale: 1 }}
        >
          <motion.div
            animate={{ opacity: 1, scale: 1 }}
            className="absolute inset-0 bg-cover bg-center grayscale"
            initial={{ opacity: 0, scale: 1.04 }}
            key={activeLocation.name}
            style={{ backgroundImage: `url(${activeLocation.image})` }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/15" />

          <div className="absolute bottom-[3rem] left-[3rem] right-[3rem] flex gap-[1.8rem] overflow-x-auto pb-[1rem] scrollbar-hide">
            {visibleLocations.map((location, index) => (
              <button
                className={`lux-glass min-w-[28rem] rounded-[0.8rem] border border-white/10 border-l-[0.4rem] p-[2.4rem] text-left shadow-2xl transition-all duration-300 ${
                  index === 0
                    ? 'border-l-[#E9C176]'
                    : 'border-l-white/25 opacity-78 hover:opacity-100'
                }`}
                key={location.name}
                onClick={() =>
                  setActiveIndex(
                    locations.findIndex((item) => item.name === location.name)
                  )
                }
                type="button"
              >
                <h4 className="text-[2rem] font-bold text-white">
                  {location.name}
                </h4>
                <p className="mt-[0.8rem] font-sans text-[1.45rem] text-white/62">
                  {location.description}
                </p>
                <div className="mt-[2.2rem] flex justify-between gap-[2rem] font-sans text-[1.1rem] font-bold uppercase tracking-[0.18em]">
                  <span className="text-white">{location.properties}</span>
                  <span className="text-[#E9C176]">Explorar</span>
                </div>
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
