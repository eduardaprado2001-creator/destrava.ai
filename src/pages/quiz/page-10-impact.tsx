import React from 'react';
import { ChevronRight } from 'lucide-react';

interface Page10Props {
  onNext: () => void;
  gainXp: (amount: number, reason?: string) => void;
  setAnswer: (key: string, value: any) => void;
  playSound: () => void;
}

export function Page10Impact({ onNext, gainXp, setAnswer, playSound }: Page10Props) {
  const options = [
    "Seria transformador, mudaria minha vida inteira",
    "Me traria orgulho de verdade",
    "Mudaria meus resultados de forma absurda",
    "Me faria ser respeitado por todos (e por mim mesmo)"
  ];

  const handleSelect = (value: string) => {
    playSound();
    setAnswer("impact", value);
    gainXp(6, "p10_impact");
    onNext();
  };

  return (
    <div className="rounded-3xl p-6 md:p-8 ring-1 ring-white/10 shadow-[0_20px_60px_rgba(0,0,0,.35)] bg-gradient-to-b from-[#2b1a4e] via-[#3c2569] to-[#4B2E83] text-[#FCEEE3]">
      <h3 className="text-xl md:text-2xl font-extrabold tracking-tight text-white mb-6 leading-tight">
        Qual seria o impacto de se tornar alguém disciplinado, focado e admirado — um exemplo vivo de determinação que inspira quem tá ao seu redor?
      </h3>
      
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
        A pessoa que você pode se tornar já existe dentro de você.
      </p>
    </div>
  );
}