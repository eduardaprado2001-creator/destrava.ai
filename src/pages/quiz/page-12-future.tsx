import React from 'react';
import { ChevronRight } from 'lucide-react';

interface Page12Props {
  onNext: () => void;
  gainXp: (amount: number, reason?: string) => void;
  setAnswer: (key: string, value: any) => void;
  playSound: () => void;
}

export function Page12Future({ onNext, gainXp, setAnswer, playSound }: Page12Props) {
  const options = [
    "Muitas vezes, é um padrão na minha vida",
    "Algumas vezes, mas me destrói",
    "Raramente, mas já aconteceu",
    "Nunca (mentira que ninguém marca 😈)"
  ];

  const handleSelect = (value: string) => {
    playSound();
    setAnswer("quitPattern", value);
    gainXp(5, "p12_future");
    onNext();
  };

  return (
    <div className="rounded-3xl p-6 md:p-8 ring-1 ring-white/10 shadow-[0_20px_60px_rgba(0,0,0,.35)] bg-gradient-to-b from-[#2b1a4e] via-[#3c2569] to-[#4B2E83] text-[#FCEEE3]">
      <h3 className="text-xl md:text-2xl font-extrabold tracking-tight text-white mb-6 leading-tight">
        O futuro sem ação
      </h3>
      <p className="text-lg md:text-xl text-[#C39BD3] mb-6 leading-relaxed">
        Quantas vezes você começou algo cheio de energia… e largou no meio, se sentindo um fracassado?
      </p>
      
      <div className="grid gap-3">
        {options.map((label) => (
          <button
            key={label}
            onClick={() => handleSelect(label)}
            className="flex items-center justify-between w-full rounded-2xl p-4 ring-1 ring-white/10 transition shadow-[0_20px_60px_rgba(0,0,0,.35)] bg-gradient-to-br from-[#5e348f] to-[#3d225e] hover:scale-[1.02]"
          >
            <span className="text-left text-[15px]">{label}</span>
            <ChevronRight className="size-5 opacity-80" />
          </button>
        ))}
      </div>
      
      <p className="mt-4 text-xs opacity-80 italic text-center">
        Cada desistência é uma mini‑morte.
      </p>
    </div>
  );
}