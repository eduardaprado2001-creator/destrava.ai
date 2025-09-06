import React from 'react';
import { motion } from 'framer-motion';
import { TestimonialCard } from '../shared/testimonial-card';

const testimonialsData = [
  {
    name: "Bianca Lima, 28 anos",
    city: "São Paulo, SP",
    text: "Eu prometia todo domingo que ia mudar. O app me deu choque de realidade e um plano simples. Em 2 semanas entreguei o TCC travado há meses.",
    color: "bg-[#4B2E83]"
  },
  {
    name: "Roberto Silva, 35 anos",
    city: "Rio de Janeiro, RJ",
    text: "Minha esposa sempre dizia que meu problema era enrolação. Quando comecei o plano e cortei o scroll, nossa vida melhorou 100%.",
    color: "bg-[#1d3a2b]"
  },
  {
    name: "Mariana Costa, 31 anos",
    city: "Belo Horizonte, MG",
    text: "Parei 2 anos na inércia. Com o Destrava Aí, em 14 dias voltei a treinar, estudar e crescer no trabalho — sem ansiedade me travar.",
    color: "bg-[#3b173b]"
  }
];

export function TestimonialsSection() {
  return (
    <section id="relatos" className="mx-auto max-w-6xl px-4 pb-20">
      <motion.h3
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-2xl font-extrabold tracking-tight"
      >
        Relatos Reais de Quem Destravou
      </motion.h3>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, staggerChildren: 0.2 }}
        viewport={{ once: true }}
        className="mt-6 grid gap-5 md:grid-cols-3"
      >
        {testimonialsData.map((testimonial, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true }}
          >
            <TestimonialCard {...testimonial} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}