import React from 'react';
import { ChevronRight } from 'lucide-react';

interface Page08Props {
  onNext: () => void;
  gainXp: (amount: number, reason?: string) => void;
  setAnswer: (key: string, value: any) => void;
  playSound: () => void;
}

export function Page08Vision({ onNext, gainXp, setAnswer, playSound }: Page08Props) {
  const options = [
    "Resultados reais, projetos do papel.",
    "Disciplina, confiança e orgulho.",
    "Rotina produtiva no controle."
  ];

  const handleSelect = (value: string) => {
    playSound();
    setAnswer("vision12", value);
    gainXp(6, "p8_vision");
    onNext();
  };

  return (
    <div className="rounded-3xl p-6 md:p-8 ring-1 ring-white/10 shadow-[0_20px_60px_rgba(0,0,0,.35)] bg-gradient-to-b from-[#2b1a4e] via-[#3c2569] to-[#4B2E83] text-[#FCEEE3]">
      <h3 className="text-xl md:text-2xl font-extrabold tracking-tight text-white mb-3">
        Sua vida em 12 meses
      </h3>
      <p className="text-sm text-[#C39BD3] mb-6">
        Daqui a 12 meses, como você quer se enxergar?
      </p>
      
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
        A vida que quer não chega — é construída.
      </p>
    </div>
  );
}