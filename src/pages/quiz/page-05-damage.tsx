import React, { useState } from 'react';
import { ChevronRight, Check } from 'lucide-react';

interface Page05Props {
  onNext: () => void;
  gainXp: (amount: number, reason?: string) => void;
  setAnswer: (key: string, value: any) => void;
  playSound: () => void;
}

export function Page05Damage({ onNext, gainXp, setAnswer, playSound }: Page05Props) {
  const [selected, setSelected] = useState<string[]>([]);

  const options = [
    { label: "Carreira", value: "carreira" },
    { label: "Dinheiro", value: "dinheiro" },
    { label: "Relacionamentos", value: "relacionamentos" },
    { label: "Saúde", value: "saude" },
    { label: "Confiança", value: "confianca" }
  ];

  const toggle = (value: string) => {
    playSound();
    setSelected(prev => {
      if (prev.includes(value)) {
        return prev.filter(item => item !== value);
      } else if (prev.length < 2) {
        return [...prev, value];
      }
      return prev;
    });
  };

  const handleContinue = () => {
    playSound();
    setAnswer("damages", selected);
    gainXp(10, "p5_damage");
    onNext();
  };

  return (
    <div className="rounded-3xl p-6 md:p-8 ring-1 ring-white/10 shadow-[0_20px_60px_rgba(0,0,0,.35)] bg-gradient-to-b from-[#2b1a4e] via-[#3c2569] to-[#4B2E83] text-[#FCEEE3]">
      <h3 className="text-xl md:text-2xl font-extrabold tracking-tight text-white mb-6">
        O que a procrastinação já destruiu? (máx 2)
      </h3>
      
      <div className="grid gap-3 mb-6">
        {options.map((option) => {
          const isSelected = selected.includes(option.value);
          return (
            <button
              key={option.value}
              onClick={() => toggle(option.value)}
              className={`flex items-center justify-between w-full rounded-2xl p-4 ring-1 ring-white/10 transition shadow-[0_20px_60px_rgba(0,0,0,.35)] ${
                isSelected 
                  ? "bg-gradient-to-br from-[#6a3a38] to-[#3a1f1e] scale-[1.02]" 
                  : "bg-gradient-to-br from-[#1f3550] to-[#0f1c2b] hover:scale-[1.02]"
              }`}
            >
              <span className="text-left text-[15px]">{option.label}</span>
              {isSelected ? (
                <Check className="size-5 text-[#FFCC48]" />
              ) : (
                <span className="size-5" />
              )}
            </button>
          );
        })}
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleContinue}
          disabled={selected.length === 0}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-bold bg-[#F25C54] hover:bg-[#ff6f68] transition shadow-[0_10px_30px_rgba(242,92,84,.35)] disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Continuar ({selected.length} selecionados) <ChevronRight className="size-4" />
        </button>
      </div>
      
      <p className="mt-4 text-xs opacity-80 italic text-center">
        Cada área fodida é um grito do teu eu que desistiu.
      </p>
    </div>
  );
}