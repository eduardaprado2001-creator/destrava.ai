import React from 'react';
import { motion } from 'framer-motion';

interface CTASectionProps {
  onStartQuiz: () => void;
}

export function CTASection({ onStartQuiz }: CTASectionProps) {
  return (
    <section id="como-funciona" className="mx-auto max-w-6xl px-4 pb-16">
      <div className="relative">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-20 -left-20 h-96 w-96 rounded-full bg-red-600/40 blur-[120px]" />
          <div className="absolute -bottom-20 -right-20 h-96 w-96 rounded-full bg-purple-900/50 blur-[120px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-80 w-80 rounded-full bg-black/30 blur-[100px]" />
        </div>

        <div className="relative text-center">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex justify-center mb-8"
          >
            <div className="size-16 rounded-2xl bg-gradient-to-br from-red-600 to-red-800 grid place-items-center shadow-[0_20px_60px_rgba(220,38,38,.8)] ring-2 ring-red-500/30">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
              </svg>
            </div>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[0.9] text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.9)] mb-8"
          >
            Você Tá Perdendo Sua Vida <span className="text-red-500">e Nem Percebe…</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-lg md:text-xl text-gray-300 leading-relaxed font-medium max-w-3xl mx-auto mb-12"
          >
            Cada minuto enrolando é um passo a mais na mesma vida que você diz odiar. Quer ver o estrago real que a
            procrastinação tá causando? Responda o quiz e encare a verdade na sua cara.
          </motion.p>

          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.3 }}
            viewport={{ once: true }}
            onClick={() => {
              (window as any).__ga?.gainXp?.(50, "cta_click")
              onStartQuiz()
            }}
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold text-xl rounded-2xl shadow-[0_20px_60px_rgba(220,38,38,.6)] hover:shadow-[0_25px_70px_rgba(220,38,38,.8)] transform transition-all duration-300 ring-2 ring-red-500/30 hover:ring-red-400/50"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
            Quero Encarar a Verdade Agora
          </motion.button>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            viewport={{ once: true }}
            className="mt-4 text-sm text-gray-400"
          >
            Resultado imediato • 100% anônimo • Choque de realidade garantido
          </motion.p>
        </div>
      </div>
    </section>
  );
}