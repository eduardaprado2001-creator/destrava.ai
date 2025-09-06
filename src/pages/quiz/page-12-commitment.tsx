import React from 'react';
import { ChevronRight, Timer } from 'lucide-react';

interface Page08Props {
  onNext: () => void;
  gainXp: (amount: number, reason?: string) => void;
  setAnswer: (key: string, value: any) => void;
}

export function Page08Commitment({ onNext, gainXp, setAnswer }: Page08Props) {
  const options = [
    { v: "5", t: "5 min/dia — Começar agora" },
    { v: "10", t: "10 min/dia — Pronto pra mudar" },
    { v: "15", t: "15 min/dia — Compromisso de verdade" },
    { v: "20+", t: "20+ min/dia — Vou dar tudo" },
  ];

  const handleSelect = (value: string) => {
    setAnswer("commitment", value);
    gainXp(9, "p8_commit");
    onNext();
  };

  return (
    <div className="rounded-3xl p-6 md:p-8 ring-1 ring-white/10 shadow-[0_20px_60px_rgba(0,0,0,.35)] bg-gradient-to-b from-[#2b1a4e] via-[#3c2569] to-[#4B2E83] text-[#FCEEE3]">
      <h3 className="text-xl md:text-2xl font-extrabold tracking-tight text-white mb-3">
        Compromisso de tempo diário
      </h3>
      <p className="text-sm text-[#C39BD3] mb-4">
        Quanto tempo por dia você vai investir para sair do ciclo?
      </p>
      
      <div className="grid md:grid-cols-2 gap-3">
        {options.map((o) => (
          <button
            key={o.v}
            onClick={() => handleSelect(o.v)}
            className="flex items-center justify-between w-full rounded-2xl p-4 ring-1 ring-white/10 transition bg-gradient-to-br from-[#5e348f] to-[#3d225e] hover:scale-[1.02] shadow-[0_20px_60px_rgba(0,0,0,.35)]"
          >
            <span className="text-left text-[15px]">{o.t}</span>
            <Timer className="size-5 opacity-80" />
          </button>
        ))}
      </div>
      
      <p className="mt-4 text-xs opacity-80 italic text-center">
        O futuro pune quem hesita.
      </p>
    </div>
  );
}