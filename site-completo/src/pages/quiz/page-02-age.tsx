import React from 'react';
import { ChevronRight } from 'lucide-react';

interface Page02Props {
  onNext: () => void;
  gainXp: (amount: number, reason?: string) => void;
  setAnswer: (key: string, value: any) => void;
}

export function Page02Age({ onNext, gainXp, setAnswer }: Page02Props) {
  const options = [
    "Menos de 20 — Ainda dá tempo de virar tudo.",
    "21 a 29 — Agora ou perde os melhores anos.",
    "30 a 39 — Ou muda, ou começa a enterrar sonhos.",
    "40 a 49 — É hoje ou nunca.",
    "50+ — Procrastinar agora é suicídio de futuro.",
  ];

  const handleSelect = (value: string) => {
    setAnswer("age", value);
    gainXp(2, "p2_age");
    onNext();
  };

  return (
    <div className="rounded-3xl p-6 md:p-8 ring-1 ring-white/10 shadow-[0_20px_60px_rgba(0,0,0,.35)] bg-gradient-to-b from-[#2b1a4e] via-[#3c2569] to-[#4B2E83] text-[#FCEEE3]">
      <h3 className="text-xl md:text-2xl font-extrabold tracking-tight text-white mb-3">
        ⌛ Sua idade diz muito sobre o quanto a procrastinação já vem roubando da sua vida. Quantos anos você tem?
      </h3>
      
      <div className="grid gap-3">
        {options.map((label) => (
          <button
            key={label}
            onClick={() => handleSelect(label)}
            className="flex items-center justify-between w-full rounded-2xl p-4 ring-1 ring-white/10 transition shadow-[0_20px_60px_rgba(0,0,0,.35)] bg-gradient-to-br from-[#1f3550] to-[#0f1c2b] hover:scale-[1.02]"
          >
            <span className="text-left text-[15px]">{label}</span>
            <ChevronRight className="size-5 opacity-80" />
          </button>
        ))}
      </div>
      
      <p className="mt-4 text-xs opacity-80 italic text-center">
        Cada década sem ação é um caixão pro teu potencial.
      </p>
    </div>
  );
}