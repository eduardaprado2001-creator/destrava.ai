import React, { useState, useEffect } from 'react';
import { ChevronRight, Check } from 'lucide-react';

interface Page13Props {
  onNext: () => void;
  gainXp: (amount: number, reason?: string) => void;
  setAnswer: (key: string, value: any) => void;
}

export function Page13MentalShift({ onNext, gainXp, setAnswer }: Page13Props) {
  const [currentStep, setCurrentStep] = useState(0);
  const [selected, setSelected] = useState<string[]>([]);

  const options = [
    { value: "quebra_cabecas", label: "🤔 Quebra-cabeças (treinar sua mente pra ficar afiada)" },
    { value: "aumento_qi", label: "🧠 Aumento do QI (pensar mais rápido e melhor)" },
    { value: "definicao_metas", label: "🎯 Definição de metas (clareza brutal no que fazer)" },
    { value: "relaxamento", label: "🧘🏻 Relaxamento (parar de travar por ansiedade)" },
    { value: "desintoxicacao_dopamina", label: "🧎🏻 Desintoxicação de dopamina (libertar-se do vício do celular)" },
    { value: "rede", label: "🌐 Rede (construir conexões de alto nível)" },
    { value: "melhorar_memoria", label: "💡 Melhorando a memória (lembrar do que importa, não do lixo)" },
    { value: "analise_sonhos", label: "💭 Análise de sonhos (entender o que sua mente tá gritando)" },
    { value: "logica", label: "🧩 Lógica (resolver problemas sem enrolar)" },
    { value: "gestao_tempo", label: "⌛ Gestão de tempo (finalmente dominar suas horas)" },
    { value: "autocuidado", label: "💖 Autocuidado (cuidar de você antes que o mundo te destrua)" }
  ];

  useEffect(() => {
    const timer1 = setTimeout(() => setCurrentStep(1), 2000);
    const timer2 = setTimeout(() => setCurrentStep(2), 4000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  const toggle = (value: string) => {
    setSelected(prev => {
      if (prev.includes(value)) {
        return prev.filter(item => item !== value);
      } else {
        return [...prev, value];
      }
    });
  };

  const handleContinue = () => {
    setAnswer("mentalShiftTopics", selected);
    gainXp(5, "p13_mental_shift");
    onNext();
  };

  return (
    <div className="rounded-3xl p-6 md:p-8 ring-1 ring-white/10 shadow-[0_20px_60px_rgba(0,0,0,.35)] bg-gradient-to-b from-[#2b1a4e] via-[#3c2569] to-[#4B2E83] text-[#FCEEE3]">
      
      {/* Step 0 - Initial content */}
      <div className="mb-6">
        <h3 className="text-2xl md:text-3xl font-black tracking-tight text-white mb-6 leading-tight">
          Virada mental: a última chamada
        </h3>
        
        <div className="rounded-2xl p-5 ring-1 ring-white/10 bg-gradient-to-br from-[#6a3a38] to-[#3a1f1e] mb-6">
          <p className="text-sm font-bold text-red-300 mb-3">🚨 Chega de dicas soltas que não funcionam.</p>
          <p className="text-sm">
            O que você precisa é de um plano brutalmente claro, feito só pra você.
          </p>
        </div>
      </div>

      {/* Step 1 - A real é simples */}
      {currentStep >= 1 && (
        <div className="mb-6">
          <div className="rounded-2xl p-5 ring-1 ring-white/10 bg-gradient-to-br from-[#1f3550] to-[#0f1c2b]">
            <p className="text-lg font-bold text-white mb-4">A real é simples:</p>
            
            <div className="space-y-3 mb-4">
              <p className="text-sm flex items-start gap-2">
                <span className="text-red-400 font-bold">👉</span>
                <span>Seus próprios pensamentos estão te sabotando.</span>
              </p>
              <p className="text-sm flex items-start gap-2">
                <span className="text-red-400 font-bold">👉</span>
                <span>Eles te fazem enrolar, perder tempo e desperdiçar ANOS da sua vida.</span>
              </p>
            </div>

            <p className="text-sm mb-3">
              <span className="text-yellow-400 font-bold">⚡</span> Mas quando você acerta a mente, a procrastinação desmorona.
            </p>
            <p className="text-sm mb-4">
              No lugar dela nasce a versão sua que faz, termina e conquista.
            </p>
            
            <div className="space-y-2">
              <p className="text-sm">
                Isso não é teoria de coach. <span className="text-red-400 font-bold">👉</span> É sobrevivência.
              </p>
              <p className="text-sm">
                <span className="text-red-400 font-bold">👉</span> Ou você muda agora, ou daqui a 1 ano sua vida vai estar exatamente igual — ou pior.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Step 2 - Última chance + seleção */}
      {currentStep >= 2 && (
        <div>
          <div className="rounded-2xl p-5 ring-1 ring-white/10 bg-gradient-to-br from-[#3b173b] to-[#2a0f2a] mb-6 text-center">
            <p className="text-lg font-black text-red-400 mb-3">💀 Essa pode ser sua última chance de virar o jogo.</p>
          </div>

          <div className="mb-6">
            <p className="text-sm text-[#C39BD3] mb-4">
              📌 "Pra montar seu plano personalizado, marque os tópicos que mais fazem sentido pra você — e que vão se tornar sua arma contra a procrastinação."
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

          <div className="flex justify-end mb-4">
            <button
              onClick={handleContinue}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-bold bg-[#F25C54] hover:bg-[#ff6f68] transition shadow-[0_10px_30px_rgba(242,92,84,.35)]"
            >
              Continuar ({selected.length} selecionados) <ChevronRight className="size-4" />
            </button>
          </div>

          <p className="text-xs opacity-80 italic text-center">
            Clareza sem ação é autoengano.
          </p>
        </div>
      )}
    </div>
  );
}