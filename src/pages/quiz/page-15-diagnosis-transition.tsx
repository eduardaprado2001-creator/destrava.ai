import React from 'react';
import { ChevronRight } from 'lucide-react';

interface Page15Props {
  onNext: () => void;
  gainXp: (amount: number, reason?: string) => void;
}

export function Page15DiagnosisTransition({ onNext, gainXp }: Page15Props) {
  const handleContinue = () => {
    gainXp(10, "p15_diagnosis_transition");
    onNext();
  };

  return (
    <div className="rounded-3xl p-6 md:p-8 ring-1 ring-white/10 shadow-[0_20px_60px_rgba(0,0,0,.35)] bg-gradient-to-b from-[#2b1a4e] via-[#3c2569] to-[#4B2E83] text-[#FCEEE3]">
      
      <div className="text-center mb-8">
        <div className="rounded-2xl p-6 ring-1 ring-white/10 bg-gradient-to-br from-[#1f3550] to-[#0f1c2b] mb-6">
          <p className="text-lg font-bold text-white mb-4">
            📊 Mais de 1 milhão de pessoas já fizeram esse diagnóstico e começaram a mudar.
          </p>
          <p className="text-lg font-bold text-red-400">
            E você? Vai ser mais um que reconhece os sabotadores… mas continua enrolando?
          </p>
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-8"></div>

        <div className="space-y-6">
          <div className="rounded-2xl p-6 ring-1 ring-white/10 bg-gradient-to-br from-[#5e348f] to-[#3d225e]">
            <p className="text-lg font-bold text-white mb-4">
              ⚡ Com base nas suas escolhas, já sabemos exatamente o que tá sugando sua energia e te impedindo de viver de verdade.
            </p>
            <p className="text-lg text-[#C39BD3]">
              No próximo passo você vai receber seu diagnóstico exato — e um plano feito sob medida pra você começar a destruir a procrastinação ainda esta semana.
            </p>
          </div>

          <div className="rounded-2xl p-6 ring-1 ring-red-500/30 bg-gradient-to-br from-[#6a3a38] to-[#3a1f1e]">
            <p className="text-lg font-bold text-red-300 mb-4">
              💀 Mas se você fechar essa tela agora, nada muda.
            </p>
            <p className="text-lg text-red-200 mb-4">
              Daqui a 1 ano você vai estar exatamente igual: travado, sem dinheiro, sem orgulho.
            </p>
            <p className="text-lg font-bold text-red-400">
              E o pior: sabendo que perdeu a chance de virar o jogo quando ela tava na sua frente.
            </p>
          </div>
        </div>

        <div className="mt-8">
          <button
            onClick={handleContinue}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-extrabold text-lg bg-gradient-to-r from-[#F25C54] to-[#FF3B3B] hover:from-[#ff6f68] hover:to-[#ff5555] transition shadow-[0_20px_60px_rgba(242,92,84,.6)] text-white"
          >
            CONTINUAR PARA MEU DIAGNÓSTICO <ChevronRight className="size-6" />
          </button>
          
          <p className="mt-4 text-sm text-[#C39BD3] italic">
            📌 Seu eu do futuro vai agradecer.
          </p>
        </div>
      </div>
    </div>
  );
}