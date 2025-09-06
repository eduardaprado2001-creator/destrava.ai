import React from 'react';
import { ChevronRight } from 'lucide-react';

interface Page17Props {
  onNext: () => void;
  gainXp: (amount: number, reason?: string) => void;
  setAnswer: (key: string, value: any) => void;
}

export function Page17RealityCheck({ onNext, gainXp, setAnswer }: Page17Props) {
  // Função para calcular a data 7 dias a partir de hoje
  const getDateIn7Days = () => {
    const today = new Date();
    const futureDate = new Date(today);
    futureDate.setDate(today.getDate() + 7);
    
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    };
    
    return futureDate.toLocaleDateString('pt-BR', options);
  };

  const options = [
    "SIM, eu quero",
    "SIM, é isso que preciso"
  ];

  const handleSelect = (value: string) => {
    setAnswer("commitment", value);
    gainXp(10, "p17_reality_check");
    onNext();
  };

  return (
    <div className="rounded-3xl p-6 md:p-8 ring-1 ring-white/10 shadow-[0_20px_60px_rgba(0,0,0,.35)] bg-gradient-to-b from-[#2b1a4e] via-[#3c2569] to-[#4B2E83] text-[#FCEEE3]">
      
      <div className="space-y-6">
        {/* A real é essa */}
        <div className="rounded-2xl p-6 ring-1 ring-red-500/30 bg-gradient-to-br from-[#6a3a38] to-[#3a1f1e]">
          <p className="text-lg font-bold text-red-300 mb-4">💀 A real é essa:</p>
          <p className="text-lg text-white mb-4">
            Se você não agir AGORA, sua vida vai continuar exatamente como está:
          </p>
          
          <div className="space-y-3">
            <p className="text-lg flex items-center gap-2">
              <span className="text-red-400 font-bold">❌</span>
              <span>Sem dinheiro.</span>
            </p>
            <p className="text-lg flex items-center gap-2">
              <span className="text-red-400 font-bold">❌</span>
              <span>Sem resultados.</span>
            </p>
            <p className="text-lg flex items-center gap-2">
              <span className="text-red-400 font-bold">❌</span>
              <span>Sem confiança.</span>
            </p>
            <p className="text-lg flex items-center gap-2">
              <span className="text-red-400 font-bold">❌</span>
              <span>Vendo os outros avançarem enquanto você fica parado.</span>
            </p>
          </div>
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

        {/* Diagnóstico e solução */}
        <div className="space-y-4">
          <div className="rounded-2xl p-5 ring-1 ring-white/10 bg-gradient-to-br from-[#1f3550] to-[#0f1c2b]">
            <p className="text-lg mb-4">
              <span className="text-blue-300 font-bold">📊</span> Seu diagnóstico mostrou: <span className="font-bold text-red-400">seus níveis de procrastinação estão ALTOS DEMAIS</span>.
            </p>
            
            <p className="text-lg mb-4">
              <span className="text-yellow-400 font-bold">⚡</span> Se nada mudar, daqui a 1 ano você vai olhar pra trás e sentir o gosto amargo de mais 12 meses jogados fora.
            </p>
            
            <p className="text-lg mb-4">
              <span className="text-green-400 font-bold">👉</span> Mas existe um único plano — feito pra cortar essa corrente no pescoço e te colocar em movimento imediato.
            </p>
            
            <p className="text-lg">
              <span className="text-green-400 font-bold">👉</span> E se você aplicar, até <span className="font-bold text-yellow-400">{getDateIn7Days()}</span>, já vai sentir a diferença.
            </p>
          </div>

          {/* Pergunta de compromisso */}
          <div className="rounded-2xl p-6 ring-1 ring-white/10 bg-gradient-to-br from-[#5e348f] to-[#3d225e]">
            <p className="text-xl font-bold text-white mb-6 italic leading-relaxed">
              💥 <em>"Se eu te mostrasse um passo a passo simples e direto pra destruir a procrastinação e assumir o controle da sua vida… você aplicaria?"</em>
            </p>
            
            <div className="grid gap-3">
              {options.map((label) => (
                <button
                  key={label}
                  onClick={() => handleSelect(label)}
                  className="flex items-center justify-between w-full rounded-2xl p-4 ring-1 ring-white/10 transition shadow-[0_20px_60px_rgba(0,0,0,.35)] bg-gradient-to-br from-[#1f3550] to-[#0f1c2b] hover:scale-[1.02]"
                >
                  <span className="text-left text-[15px] font-medium">{label}</span>
                  <ChevronRight className="size-5 opacity-80" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}