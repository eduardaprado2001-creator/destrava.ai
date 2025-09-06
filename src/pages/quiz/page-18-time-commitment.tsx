import React from 'react';
import { ChevronRight, Timer } from 'lucide-react';

interface Page18Props {
  onNext: () => void;
  gainXp: (amount: number, reason?: string) => void;
  setAnswer: (key: string, value: any) => void;
  playSound: () => void;
}

export function Page18TimeCommitment({ onNext, gainXp, setAnswer, playSound }: Page18Props) {
  const options = [
    { v: "5", t: "5 min/dia – quero começar agora" },
    { v: "10", t: "10 min/dia – tô pronto pra mudar" },
    { v: "15", t: "15 min/dia – vou me comprometer de verdade" },
    { v: "20+", t: "20+ min/dia – vou dar tudo pra virar o jogo" },
  ];

  const handleSelect = (value: string) => {
    playSound();
    setAnswer("timeCommitment", value);
    gainXp(12, "p18_time_commitment");
    onNext();
  };

  return (
    <div className="rounded-3xl p-6 md:p-8 ring-1 ring-white/10 shadow-[0_20px_60px_rgba(0,0,0,.35)] bg-gradient-to-b from-[#2b1a4e] via-[#3c2569] to-[#4B2E83] text-[#FCEEE3]">
      
      <div className="text-center mb-8">
        <div className="flex justify-center mb-6">
          <div className="size-16 rounded-2xl bg-gradient-to-br from-yellow-500 to-orange-500 grid place-items-center shadow-[0_20px_60px_rgba(255,165,0,.6)] ring-2 ring-yellow-400/30">
            <Timer className="size-8 text-white" />
          </div>
        </div>

        <h3 className="text-2xl md:text-3xl font-black tracking-tight text-white mb-6 leading-tight">
          ⏳ "Agora me diga: quanto tempo por dia você tá disposto(a) a investir em si mesmo(a) pra parar de se sabotar?"
        </h3>
      </div>
      
      <div className="grid gap-4">
        {options.map((o) => (
          <button
            key={o.v}
            onClick={() => handleSelect(o.v)}
            className="flex items-center justify-between w-full rounded-2xl p-5 ring-1 ring-white/10 transition bg-gradient-to-br from-[#5e348f] to-[#3d225e] hover:scale-[1.02] shadow-[0_20px_60px_rgba(0,0,0,.35)] group"
          >
            <span className="text-left text-[16px] font-medium">{o.t}</span>
            <div className="flex items-center gap-2">
              <Timer className="size-5 opacity-80 group-hover:text-yellow-400 transition" />
              <ChevronRight className="size-5 opacity-80 group-hover:translate-x-1 transition" />
            </div>
          </button>
        ))}
      </div>
      
      <div className="mt-8 text-center">
        <div className="rounded-2xl p-5 ring-1 ring-white/10 bg-gradient-to-br from-[#1f3550] to-[#0f1c2b]">
          <p className="text-sm text-[#C39BD3] italic">
            💡 "O tempo que você investe em si mesmo hoje é o que vai determinar a pessoa que você será amanhã."
          </p>
        </div>
      </div>
    </div>
  );
}