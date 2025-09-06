import React from 'react';
import { ChevronRight } from 'lucide-react';

interface Page05Props {
  onNext: () => void;
  gainXp: (amount: number, reason?: string) => void;
  setAnswer: (key: string, value: any) => void;
}

export function Page05Mirror({ onNext, gainXp, setAnswer }: Page05Props) {
  const options = ["Sempre", "Muitas vezes", "Às vezes"];

  const handleSelect = (value: string) => {
    setAnswer("mirror", value);
    gainXp(4, "p5_mirror");
    onNext();
  };

  return (
    <div className="rounded-3xl p-6 md:p-8 ring-1 ring-white/10 shadow-[0_20px_60px_rgba(0,0,0,.35)] bg-gradient-to-b from-[#2b1a4e] via-[#3c2569] to-[#4B2E83] text-[#FCEEE3]">
      <h3 className="text-xl md:text-2xl font-extrabold tracking-tight text-white mb-3">
        No espelho, você tá matando sua melhor versão?
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
        O espelho não mente: ou age, ou apodrece.
      </p>
    </div>
  );
}