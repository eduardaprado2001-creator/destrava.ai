import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

interface Page01Props {
  onNext: () => void;
  gainXp: (amount: number, reason?: string) => void;
}

export function Page01Start({ onNext, gainXp }: Page01Props) {
  const handleStart = () => {
    gainXp(1, "p1_start");
    onNext();
  };

  return (
    <div className="rounded-3xl p-6 md:p-8 ring-1 ring-white/10 shadow-[0_20px_60px_rgba(0,0,0,.35)] bg-gradient-to-b from-[#2b1a4e] via-[#3c2569] to-[#4B2E83] text-[#FCEEE3]">
      <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-3 text-[#FF3B3B]">
        Daqui a 1 ano sua vida vai estar IGUAL — travada, sem dinheiro e sem orgulho.
      </h1>
      <p className="text-sm mb-5">
        Descubra agora o que te sabota e receba um plano comprovado.
      </p>

      <div className="grid gap-3">
        {[
          "Você gasta 3h40/dia no celular (= 1.345h/ano). Investe em quê?",
          "Cada hora de enrolação = 1 oportunidade morta.",
          "Você já perdeu anos procrastinando. Vai repetir?",
          "Esse quiz é espelho. Vai doer."
        ].map((text, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="rounded-2xl p-4 ring-1 ring-white/10 bg-gradient-to-br from-[#5e348f] to-[#3d225e]"
          >
            <p className="text-sm opacity-90">{text}</p>
          </motion.div>
        ))}
      </div>

      <div className="mt-6">
        <button
          onClick={handleStart}
          className="w-full flex items-center justify-between rounded-2xl p-4 ring-1 ring-white/10 transition shadow-[0_20px_60px_rgba(0,0,0,.35)] bg-gradient-to-br from-[#FF6A00] to-[#FF3B3B] hover:scale-[1.02] font-bold"
        >
          <span className="text-left text-[15px]">COMEÇAR O DIAGNÓSTICO</span>
          <ChevronRight className="size-5 opacity-80" />
        </button>
      </div>

      <p className="mt-4 text-xs opacity-80 italic text-center">
        Quem foge da verdade, casa com a mentira.
      </p>
    </div>
  );
}