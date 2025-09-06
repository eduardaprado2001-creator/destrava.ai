import React from 'react';
import { ChevronRight } from 'lucide-react';

interface Page19Props {
  onNext: () => void;
  gainXp: (amount: number, reason?: string) => void;
  setAnswer: (key: string, value: any) => void;
}

export function Page19Consequences({ onNext, gainXp, setAnswer }: Page19Props) {
  const options = [
    "Minha carreira vai continuar travada",
    "Vou continuar sem dinheiro",
    "Meus relacionamentos vão piorar",
    "Minha saúde/confiança vão desmoronar",
    "Tudo isso junto — o cenário real se eu não mudar"
  ];

  const handleSelect = (value: string) => {
    setAnswer("consequences", value);
    gainXp(8, "p19_consequences");
    onNext();
  };

  return (
    <div className="rounded-3xl p-6 md:p-8 ring-1 ring-white/10 shadow-[0_20px_60px_rgba(0,0,0,.35)] bg-gradient-to-b from-[#2b1a4e] via-[#3c2569] to-[#4B2E83] text-[#FCEEE3]">
      
      <div className="text-center mb-6">
        <p className="text-xs text-[#C39BD3] opacity-80 mb-4">
          Calma, você está quase lá!
        </p>
        
        <h3 className="text-xl md:text-2xl font-extrabold tracking-tight text-white mb-6 leading-tight">
          🚨 Se você NÃO agir hoje, como você acha que sua vida vai estar daqui a 1 ano?
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
                  ? "bg-gradient-to-br from-[#6a3a38] to-[#3a1f1e]" 
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
        <div className="rounded-2xl p-4 ring-1 ring-red-500/30 bg-gradient-to-br from-[#2a0f0f] to-[#1a0505]">
          <p className="text-sm text-red-300 italic">
            💀 A procrastinação não perdoa. Cada dia que passa sem ação é um dia a menos para virar o jogo.
          </p>
        </div>
      </div>
    </div>
  );
}