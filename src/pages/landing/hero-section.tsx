import React from 'react';
import { motion } from 'framer-motion';

interface HeroSectionProps {
  onStartQuiz: () => void;
}

export function HeroSection({ onStartQuiz }: HeroSectionProps) {
  return (
    <section className="relative mx-auto max-w-6xl px-4 pb-12 pt-16 md:pt-20">
      <div className="text-center">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8 flex justify-center"
        >
          <div className="size-16 rounded-2xl bg-[#F25C54] grid place-items-center shadow-[0_0_30px_rgba(242,92,84,.45)] overflow-hidden">
            <img src="/ChatGPT Image 20 de ago. de 2025, 19_59_46.png" alt="Destrava Aí" className="w-full h-full object-cover" />
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[0.9] text-[#FCEEE3] mb-6"
        >
          ⚡ Daqui a 1 ano, sua vida vai estar <span className="text-red-500">IGUAL</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-xl md:text-2xl text-red-400 font-bold mb-4 max-w-4xl mx-auto leading-relaxed"
        >
          Imagine olhar pra trás e ver 12 meses jogados no lixo, sem progresso, sem conquistas e odiando o espelho.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-lg md:text-xl text-[#C39BD3] mb-8 max-w-3xl mx-auto leading-relaxed"
        >
          Descubra agora o que tá te sabotando e receba um plano comprovado pra sair desse ciclo antes que seja tarde
          demais.
        </motion.p>
      </div>
    </section>
  );
}