import React from 'react';
import { Quote } from 'lucide-react';
import { motion } from 'framer-motion';

const testimonial = {
  quote:
    'La experiencia con Aurelian supero mis expectativas. No solo encontraron el departamento perfecto, sino que la gestion del cierre fue impecable y rapida.',
  name: 'Julian Voss',
  role: 'Inversionista Privado',
  avatar:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDFkp5q3J-UrLvndz3UKbg6WXLScQ3A857f6toNbI1Y846qsIvd9e8qllzk17KJXZvJ1IoU99zSlXFv3Lo29EeUrzIf2gyB6jEgNTHM7-uFvegTahh44q7WFou-6foEL6DpGcRz_4mjPqiYs6nFuVqSwqvTsYfvCsK-MNqBFtSddPquyBApk0EcqJuKD5mJIlYEwmy4YnhBnMVmItvOn_jAJm3BAWwcvzM-MJMi9v31SIwcEct4DmMCghgoWAKv829Jh9EFte1oS6o',
};

export const TestimonialsSection = (): React.JSX.Element => {
  return (
    <section className="overflow-hidden bg-[#121414] px-[3rem] py-[12rem] md:py-[15rem]">
      <div className="mx-auto w-full max-w-[136rem]">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 34 }}
          transition={{ duration: 0.65, ease: 'easeOut' }}
          viewport={{ amount: 0.4, once: true }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <Quote className="mx-auto mb-[2rem] h-[5rem] w-[5rem] text-[#E9C176]" />
          <h2 className="text-[clamp(3.6rem,4vw,5.8rem)] font-black leading-tight text-white">
            Lo que dicen nuestros clientes
          </h2>
        </motion.div>

        <motion.div
          className="mx-auto mt-[6rem] max-w-[92rem] text-center"
          initial={{ opacity: 0, y: 36 }}
          transition={{ delay: 0.1, duration: 0.65, ease: 'easeOut' }}
          viewport={{ amount: 0.45, once: true }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <p className="text-[clamp(2.4rem,3vw,3.6rem)] font-semibold italic leading-relaxed text-white">
            "{testimonial.quote}"
          </p>

          <div className="mt-[5rem] flex flex-col items-center">
            <div className="h-[7rem] w-[7rem] overflow-hidden rounded-full border-[0.2rem] border-[#E9C176] bg-white/10">
              <img
                alt={testimonial.name}
                className="h-full w-full object-cover"
                src={testimonial.avatar}
              />
            </div>
            <h5 className="mt-[1.6rem] font-sans text-[1.9rem] font-bold text-white">
              {testimonial.name}
            </h5>
            <p className="mt-[0.6rem] font-sans text-[1.2rem] font-bold uppercase tracking-[0.24em] text-[#E9C176]">
              {testimonial.role}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
