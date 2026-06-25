import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';

type CinematicService = {
  id: string;
  eyebrow: string;
  title: string;
  highlight: string;
  suffix?: string;
  description: string;
  metricLabel: string;
  metric: string;
  image: string;
  alt: string;
};

const services: CinematicService[] = [
  {
    id: 'ventas',
    eyebrow: '01 Ventas de lujo',
    title: 'Estrategias disenadas para comercializar',
    highlight: 'propiedades excepcionales.',
    description: 'Con maxima exposicion y resultados que definen el mercado.',
    metricLabel: 'Metrica de impacto',
    metric: '+120 propiedades comercializadas',
    alt: 'Residencia de lujo',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDQv0ZKIMiOcYCsK3BjC0TMpypY7Rq8Ihl81hPflpdAhZqqHryf_yLwz5Xh3cGbRD87KiGTqXElTmMOA9_n41hHs_CFUYX-HMvV_dc-VtcZ3pGY6Ltyb03l4jv76Vs8LbYe7o_nqUc26L1g6MBhSj6A-0GORBu0fa2MlbBx-SPegzN06nnAlk8Btcb0FEW6QJSkgLOnM7I2qeldIwNbMrLjnca4DA2O5JfbtmEBpkIctohzkQNONVMDpCrkWN63wWPeAygblYkRLwE',
  },
  {
    id: 'rentas',
    eyebrow: '02 Rentas corporativas',
    title: 'Soluciones para',
    highlight: 'ejecutivos y empresas',
    suffix: 'de alto nivel.',
    description: 'Espacios corporativos que reflejan el prestigio de su marca.',
    metricLabel: 'Eficiencia operativa',
    metric: '98% ocupacion promedio',
    alt: 'Interior corporativo de alto nivel',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC0-m3ckQIoBcQHvL-GPUWDvK1b_2a4J177WqV-bmKBfU70IyABHh9xeiIQGdTVzY0KvyHnS-XGivVhaxNhWta5LllLOnHCFd_yvTiwuX8JxXAKLKlfVV1cHOpe4Wo70NGH74pA6PkKcaUyCwuwyfp3S1IZQerDB7c3rH4dTlc5FdFzAWQJ2MU6D4J-N5jD4f6p6_lQ4ZcGpCOJRLV-WLSTN5GjV4CGpwadn8wT3ufVCdQvMfRFxWL5VVT9snKUDqy3LtF00KCb8HM',
  },
  {
    id: 'management',
    eyebrow: '03 Property management',
    title: 'Administracion integral para',
    highlight: 'proteger el valor',
    suffix: 'de su patrimonio.',
    description: 'Operacion impecable para inmuebles que demandan excelencia.',
    metricLabel: 'Cartera administrada',
    metric: '+45 propiedades administradas',
    alt: 'Propiedad administrada de lujo',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBuukD5BRg1pm4ZqmBuX-t6dgFZxYGRShIo8vaI0oVQjGuCNM-hwuSwdYkPv3UPM1w-Aw5PeoT7GGEooB6yMmj4GT65uGPlzAZQUZD1XIZ3NRWDTzFrhg7Zb8mlqjmJ94JWaINQq7RYD2fbQ4TdMbZ_mLbQWpwU7vPLf9F_SvAp8Jqq7gKHm4YH1c4xXGNDoPIx6xQJt7ryMPWWLrkBbvYIbdjGlPfR6_5hS1yFomjpHOW2QKZjUn4XCrDg9JAamLLaky2j5peYC1o',
  },
  {
    id: 'patrimonial',
    eyebrow: '04 Asesoria patrimonial',
    title: 'Planeacion estrategica para',
    highlight: 'maximizar inversiones',
    suffix: 'inmobiliarias.',
    description:
      'Consultoria de alto nivel enfocada en el crecimiento seguro de capital.',
    metricLabel: 'Valor asesorado',
    metric: '+$250M MXN asesorados',
    alt: 'Residencia para asesoria patrimonial',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB9cx8cPmSNt-rW0ct1PK5SBiKfxPoqXulBf8RlyvjWDISc9WaHn8kGpRTtkc0JWNAv4G3Gj00ACeorZ5cFWCW28K6SS3l0X9LjmaBfJHcLFyvUknES6r621wNXfd3vaXKNdkH-IuwIospk-3orWKoSOkxyFl9OSwWVQrhk1I66v2FxJ3Lw0b1nDKqgT3r1FC0s9MHK9PMBdRCLwXLYDVgNOkcLAPFXqXJ1OVUTqFr1ya6yTFZveXPLrSIk_VJhK9On6FQxHCTxK2I',
  },
  {
    id: 'marketing',
    eyebrow: '05 Marketing para desarrollos',
    title: 'Posicionamiento visual para',
    highlight: 'proyectos de alto impacto.',
    description:
      'Proptech y narrativa de lujo para acelerar el desplazamiento de inventario.',
    metricLabel: 'Proyectos exitosos',
    metric: '+30 desarrollos promocionados',
    alt: 'Marketing inmobiliario para desarrollos',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDfCh61zqqRGylWdE1AnCXv8ZZkK953Qof5ZgLbxFN6FmRiM0shUooaDd4O8OJIlZJjnvuGzfNqFVrfA3Winztb0s_eIaXalWiupTF40NfjTs8rw3YnP6tdyNxixmN-BSYIvebgNMTxWdmOZ4QNVU18x_THlannQTZvKxO_ZXyKfLZr8yECbOSjLM8SR9gRmaGdy2js1LDO9dFq80gSIfOOfsOg7qFSK1QJ5ELGEpEcKoLNvYaGvt5epOcKXnTyO72KKRxID2Unf9w',
  },
  {
    id: 'analisis',
    eyebrow: '06 Analisis de mercado',
    title: 'Datos y proyecciones para tomar',
    highlight: 'decisiones inteligentes.',
    description:
      'Inteligencia de mercado basada en Big Data y tendencias reales.',
    metricLabel: 'Consultoria tecnica',
    metric: '+500 analisis realizados',
    alt: 'Analisis de mercado inmobiliario',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCVyA8Uza4g4I8MMiuuyKQih1OoLFwK7kUVRPBk1RBuYmKDPsHouVp12SblZ0eoVcr8gjnHmWYfimBwxB5g-mWNnqP0A8zcAemfuZw0qLf9IsrI6M8aYaccppXule-Owjw8pPFjJ8EF_urzWaBM5OEOLeq83kGZ41Av01rZCOk9m9qaZEuacAATuQmXHywUv9o7zgp73fWoJ09k9HpN_1IJvaX5BjNPR117tTDSCQgFJ9f607nsc4P6mZMfg1aSH7RdiBc9sUebaY8',
  },
];

const CinematicPanel = ({
  activeIndex,
  hasNext,
  index,
  onNext,
  panelRef,
  service,
}: {
  activeIndex: number;
  hasNext: boolean;
  index: number;
  onNext: () => void;
  panelRef: (node: HTMLElement | null) => void;
  service: CinematicService;
}): React.JSX.Element => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1.03, 1.1]);
  const contentScale = useTransform(
    scrollYProgress,
    [0, 0.42, 0.58, 1],
    [0.93, 1, 1, 0.93]
  );
  const contentOpacity = useTransform(
    scrollYProgress,
    [0, 0.35, 0.65, 1],
    [0.2, 1, 1, 0.2]
  );
  const isActive = activeIndex === index;

  return (
    <section
      className="relative flex h-screen min-h-[100svh] snap-start snap-always items-center justify-center overflow-hidden bg-[#101413]"
      id={service.id}
      ref={(node) => {
        sectionRef.current = node;
        panelRef(node);
      }}
    >
      <motion.img
        alt={service.alt}
        className="absolute inset-0 h-[116%] w-full object-cover"
        src={service.image}
        style={{ y, scale }}
      />
      <div className="absolute inset-0 bg-black/60" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(233,193,118,0.2),transparent_36%),linear-gradient(180deg,rgba(0,0,0,0.16),rgba(0,0,0,0.92))]" />
      <div className="absolute inset-y-0 left-0 w-[22rem] bg-gradient-to-r from-black/55 to-transparent" />
      <div className="absolute inset-y-0 right-0 w-[22rem] bg-gradient-to-l from-black/55 to-transparent" />
      <div className="absolute inset-x-0 top-0 z-10 h-[18rem] bg-gradient-to-b from-black/70 to-transparent" />

      <motion.div
        className="relative z-10 mx-auto flex h-full w-full max-w-[144rem] items-center justify-center px-[3rem] py-[9rem] text-center"
        initial={{ y: 56 }}
        style={{ opacity: contentOpacity, scale: contentScale }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ amount: 0.45, once: false }}
        whileInView={{ y: 0 }}
      >
        <motion.div
          animate={{
            filter: isActive ? 'blur(0px)' : 'blur(3px)',
            y: isActive ? 0 : 18,
          }}
          className="max-w-[102rem]"
          transition={{ duration: 0.45, ease: 'easeOut' }}
        >
          <span className="mx-auto mb-[3.8rem] block w-fit border border-[#E9C176]/30 bg-black/20 px-[2rem] py-[1rem] font-sans text-[1.15rem] font-bold uppercase tracking-[0.5em] text-[#E9C176]/85 backdrop-blur-md md:text-[1.3rem]">
            {service.eyebrow}
          </span>

          <h2 className="cinematic-heading text-[clamp(4rem,7vw,8.8rem)] font-black leading-[1.05] text-white">
            {service.title}{' '}
            <span className="font-normal italic text-[#E9C176]">
              {service.highlight}
            </span>{' '}
            {service.suffix}
          </h2>

          <p className="cinematic-readable-text mx-auto mt-[3.8rem] max-w-[76rem] font-sans text-[clamp(1.8rem,2vw,2.4rem)] font-semibold leading-relaxed text-white/95">
            {service.description}
          </p>

          <div className="mt-[7rem] flex flex-col items-center gap-[1.4rem]">
            <p className="cinematic-metric-label font-sans text-[1.15rem] font-bold uppercase tracking-[0.25em] text-white/75">
              {service.metricLabel}
            </p>
            <div className="metric-reveal overflow-hidden">
              <motion.span
                className="block text-[clamp(3.2rem,5vw,6rem)] font-black uppercase leading-none text-[#E9C176]"
                initial={{ y: '110%' }}
                transition={{ delay: 0.15, duration: 0.7, ease: 'easeOut' }}
                viewport={{ amount: 0.7, once: false }}
                whileInView={{ y: 0 }}
              >
                {service.metric}
              </motion.span>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <div className="pointer-events-none absolute right-[2.4rem] top-1/2 z-20 hidden -translate-y-1/2 flex-col gap-[1.2rem] md:flex">
        {services.map((item, dotIndex) => (
          <span
            className={`block h-[0.9rem] w-[0.9rem] rounded-full border border-[#E9C176] transition-all duration-500 ${
              dotIndex === activeIndex
                ? 'h-[4rem] bg-[#E9C176]'
                : 'bg-transparent opacity-45'
            }`}
            key={item.id}
          />
        ))}
      </div>

      {hasNext && (
        <motion.button
          aria-label="Continuar al siguiente servicio"
          className="cinematic-next-button absolute bottom-[6.6rem] left-1/2 z-30 flex h-[5.8rem] w-[5.8rem] -translate-x-1/2 items-center justify-center rounded-full border border-[#E9C176]/45 bg-black/35 text-[#E9C176] shadow-[0_0_4rem_rgba(233,193,118,0.22)] backdrop-blur-md transition-colors duration-300 hover:bg-[#E9C176] hover:text-[#2b2418]"
          onClick={onNext}
          type="button"
        >
          <ChevronDown className="h-[2.8rem] w-[2.8rem]" />
        </motion.button>
      )}

      <div className="absolute bottom-[2.2rem] left-1/2 z-20 flex -translate-x-1/2 items-center gap-[1.2rem] font-sans text-[1.05rem] font-bold uppercase tracking-[0.28em] text-white/38">
        <span>{String(index + 1).padStart(2, '0')}</span>
        <span className="h-px w-[5rem] bg-white/25" />
        <span>{String(services.length).padStart(2, '0')}</span>
      </div>
    </section>
  );
};

export const CinematicServices = (): React.JSX.Element => {
  const containerRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<Array<HTMLElement | null>>([]);
  const isAutoScrolling = useRef(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const setPanelRef = useCallback(
    (index: number) =>
      (node: HTMLElement | null): void => {
        panelRefs.current[index] = node;
      },
    []
  );

  const goToPanel = useCallback((nextIndex: number): void => {
    const panel = panelRefs.current[nextIndex];

    if (!panel) {
      return;
    }

    isAutoScrolling.current = true;
    setActiveIndex(nextIndex);
    panel.scrollIntoView({ behavior: 'smooth', block: 'start' });

    window.setTimeout(() => {
      isAutoScrolling.current = false;
    }, 950);
  }, []);

  const handleWheel = (event: React.WheelEvent<HTMLDivElement>): void => {
    if (isAutoScrolling.current || Math.abs(event.deltaY) < 24) {
      return;
    }

    const direction = event.deltaY > 0 ? 1 : -1;
    const nextIndex = activeIndex + direction;

    if (nextIndex < 0 || nextIndex >= services.length) {
      return;
    }

    event.preventDefault();
    goToPanel(nextIndex);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          const nextIndex = panelRefs.current.findIndex(
            (panel) => panel === entry.target
          );

          if (nextIndex >= 0) {
            setActiveIndex(nextIndex);
          }
        });
      },
      { threshold: 0.62 }
    );

    panelRefs.current.forEach((panel) => {
      if (panel) {
        observer.observe(panel);
      }
    });

    return (): void => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      className="cinematic-scroll bg-[#101413]"
      onWheel={handleWheel}
      ref={containerRef}
    >
      {services.map((service, index) => (
        <CinematicPanel
          activeIndex={activeIndex}
          hasNext={index < services.length - 1}
          index={index}
          key={service.id}
          onNext={() => goToPanel(index + 1)}
          panelRef={setPanelRef(index)}
          service={service}
        />
      ))}
    </div>
  );
};
