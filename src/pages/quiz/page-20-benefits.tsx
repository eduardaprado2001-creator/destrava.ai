import React from 'react';
import { ChevronRight } from 'lucide-react';

interface Page20Props {
  onNext: () => void;
  gainXp: (amount: number, reason?: string) => void;
  setAnswer: (key: string, value: any) => void;
  playSound: () => void;
}

export function Page20Benefits({ onNext, gainXp, setAnswer, playSound }: Page20Props) {
  const options = [
    "Minha carreira vai decolar",
    "Vou ganhar mais dinheiro",
    "Vou recuperar minha saúde",
    "Vou viver relacionamentos melhores",
    "Vou conquistar tudo de uma vez"
  ];

  const handleSelect = (value: string) => {
    playSound();
    setAnswer("benefits", value);
    gainXp(10, "p20_benefits");
    onNext();
  };

  return (
    <div className="rounded-3xl p-6 md:p-8 ring-1 ring-white/10 shadow-[0_20px_60px_rgba(0,0,0,.35)] bg-gradient-to-b from-[#2b1a4e] via-[#3c2569] to-[#4B2E83] text-[#FCEEE3]">
      
      <div className="text-center mb-8">
        <div className="flex justify-center mb-6">
          <div className="size-16 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 grid place-items-center shadow-[0_20px_60px_rgba(34,197,94,.6)] ring-2 ring-green-400/30">
            <span className="text-3xl">✨</span>
          </div>
        </div>

        <h3 className="text-xl md:text-2xl font-extrabold tracking-tight text-white mb-6 leading-tight">
          ✨ Agora imagina o contrário: se você aplicar esse método e parar de procrastinar, o que vai mudar primeiro na sua vida?
        </h3>
      </div>
      
      <div className="grid gap-3">
        {options.map((label, index) => {
          const isLast = index === options.length - 1;
          return (
            <button
              key={label}
              onClick={() => handleSelect(label)}
              className={`flex items-center justify-between w-full rounded-2xl p-4 ring-1 ring-white/10 transition shadow-[0_20px_60px_rgba(0,0,0,.35)] hover:scale-[1.02] ${
                isLast 
                  ? "bg-gradient-to-br from-[#1d3a2b] to-[#0f1c15]" 
                  : "bg-gradient-to-br from-[#5e348f] to-[#3d225e]"
              }`}
            >
              <span className="text-left text-[15px] font-medium">{label}</span>
              <ChevronRight className="size-5 opacity-80" />
            </button>
          );
        })}
      </div>
      
      <div className="mt-6 text-center">
        <div className="rounded-2xl p-4 ring-1 ring-green-500/30 bg-gradient-to-br from-[#1d3a2b] to-[#0f1c15]">
          <p className="text-sm text-green-300 italic">
            ⚡ A transformação começa no momento em que você decide agir.
          </p>
        </div>
      </div>
    </div>
  );
}