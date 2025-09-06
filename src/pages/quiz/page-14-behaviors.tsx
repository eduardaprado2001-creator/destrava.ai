import React, { useState } from 'react';
import { ChevronRight, Check } from 'lucide-react';

interface Page14Props {
  onNext: () => void;
  gainXp: (amount: number, reason?: string) => void;
  setAnswer: (key: string, value: any) => void;
  playSound: () => void;
}

export function Page14Behaviors({ onNext, gainXp, setAnswer, playSound }: Page14Props) {
  const [selected, setSelected] = useState<string[]>([]);

  const options = [
    { value: "dormir_demais", label: "😴 Dormir demais (fugindo da realidade)" },
    { value: "jogar_jogos", label: "🎮 Jogar jogos (se escondendo em mundos que não existem)" },
    { value: "comer_sem_parar", label: "🧁 Comer sem parar (buscando prazer rápido que cobra caro depois)" },
    { value: "nao_fazer_nada", label: "🤸🏻 Não fazer nada (vendo os dias sumirem, impotente)" },
    { value: "comprar_online", label: "🛍️ Comprar coisas online (tampando buracos com dívidas e arrependimento)" },
    { value: "assistir_tv", label: "📺 Assistir TV (entretendo-se enquanto a vida real passa)" },
    { value: "videos_engracados", label: "🤣 Ver vídeos engraçados (rir enquanto sua vida desmorona)" },
    { value: "rolar_celular", label: "📱 Ficar rolando no celular (a pior prisão invisível do século)" }
  ];

  const toggle = (value: string) => {
    setSelected(prev => {
      if (prev.includes(value)) {
        return prev.filter(item => item !== value);
      } else {
        return [...prev, value];
      }
    });
    playSound();
  };

  const handleContinue = () => {
    playSound();
    setAnswer("procrastinationBehaviors", selected);
    gainXp(8, "p14_behaviors");
    onNext();
  };

  return (
    <div className="rounded-3xl p-6 md:p-8 ring-1 ring-white/10 shadow-[0_20px_60px_rgba(0,0,0,.35)] bg-gradient-to-b from-[#2b1a4e] via-[#3c2569] to-[#4B2E83] text-[#FCEEE3]">
      
      <div className="mb-6">
        <p className="text-lg md:text-xl text-[#C39BD3] mb-6 leading-relaxed italic">
          📌 <em>"Agora seja honesto: o que você faz quando tá procrastinando — e que já tá roubando sua vida sem você perceber?"</em>
        </p>
        <p className="text-sm font-bold text-white mb-4">Selecione todas as opções aplicáveis:</p>
      </div>

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
                  : "bg-gradient-to-br from-[#5e348f] to-[#3d225e] hover:scale-[1.02]"
              }`}
            >
              <span className="text-left text-[15px] font-medium">{option.label}</span>
              {isSelected ? (
                <Check className="size-5 text-[#FFCC48]" />
              ) : (
                <span className="size-5" />
              )}
            </button>
          );
        })}
      </div>

      <div className="flex justify-end mb-4">
        <button
          onClick={handleContinue}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-bold bg-[#F25C54] hover:bg-[#ff6f68] transition shadow-[0_10px_30px_rgba(242,92,84,.35)]"
        >
          Continuar ({selected.length} selecionados) <ChevronRight className="size-4" />
        </button>
      </div>

      <p className="text-xs opacity-80 italic text-center">
        Reconhecer os padrões é o primeiro passo para quebrá-los.
      </p>
    </div>
  );
}