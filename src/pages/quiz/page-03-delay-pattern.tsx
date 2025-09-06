import React from 'react';
import { ChevronRight } from 'lucide-react';

interface Page03Props {
  onNext: () => void;
  gainXp: (amount: number, reason?: string) => void;
  setAnswer: (key: string, value: any) => void;
  playSound: () => void;
}

export function Page03DelayPattern({ onNext, gainXp, setAnswer, playSound }: Page03Props) {
  const options = [
    "Sempre, é um ciclo que não consigo parar",
    "Frequentemente, vivo adiando tudo",
    "Às vezes, mas me atrapalha muito",
    "Raramente, mas ainda assim me trava"
  ];

  const handleSelect = (value: string) => {
    playSound();
    setAnswer("delayPattern", value);
    gainXp(3, "p3_delay_pattern");
    onNext();
  };

  return (
    <div className="rounded-3xl p-6 md:p-8 ring-1 ring-white/10 shadow-[0_20px_60px_rgba(0,0,0,.35)] bg-gradient-to-b from-[#2b1a4e] via-[#3c2569] to-[#4B2E83] text-[#FCEEE3]">
      <h3 className="text-2xl md:text-3xl font-black tracking-tight text-white mb-6 leading-tight">
        Com que frequência você deixa tarefas importantes pra depois, mesmo sabendo que isso só acumula e te afunda ainda mais?
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
        Reconhecer o padrão é o primeiro passo para quebrá-lo.
      </p>
    </div>
  );
}