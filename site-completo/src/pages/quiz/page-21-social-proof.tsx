import React from 'react';
import { ChevronRight } from 'lucide-react';

interface Page21Props {
  onNext: () => void;
  gainXp: (amount: number, reason?: string) => void;
  setAnswer: (key: string, value: any) => void;
}

export function Page21SocialProof({ onNext, gainXp, setAnswer }: Page21Props) {
  const testimonials = [
    {
      name: "João, 32 anos",
      text: "Eu enrolava tanto que perdi clientes. Em 2 semanas com o plano, fechei mais do que em 3 meses.",
      color: "bg-[#4B2E83]"
    },
    {
      name: "Larissa, 27 anos", 
      text: "Eu travava até pra estudar. Hoje tô terminando meu TCC com orgulho.",
      color: "bg-[#1d3a2b]"
    },
    {
      name: "Rafael, 40 anos",
      text: "Adiei projetos por anos. Agora concluo tudo no prazo.",
      color: "bg-[#3b173b]"
    }
  ];

  const options = [
    "SIM, eu acredito",
    "SIM, estou pronto"
  ];

  const handleSelect = (value: string) => {
    setAnswer("socialProofConfidence", value);
    gainXp(12, "p21_social_proof");
    onNext();
  };

  return (
    <div className="rounded-3xl p-6 md:p-8 ring-1 ring-white/10 shadow-[0_20px_60px_rgba(0,0,0,.35)] bg-gradient-to-b from-[#2b1a4e] via-[#3c2569] to-[#4B2E83] text-[#FCEEE3]">
      
      <div className="text-center mb-8">
        <div className="flex justify-center mb-6">
          <div className="size-16 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 grid place-items-center shadow-[0_20px_60px_rgba(34,197,94,.6)] ring-2 ring-green-400/30">
            <span className="text-3xl">🏆</span>
          </div>
        </div>

        <h3 className="text-2xl md:text-3xl font-black tracking-tight text-white mb-6 leading-tight">
          Provas reais: funciona
        </h3>
      </div>

      {/* Depoimentos */}
      <div className="grid gap-4 mb-8">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className={`rounded-2xl p-5 ring-1 ring-white/10 ${testimonial.color} shadow-[0_15px_40px_rgba(0,0,0,.3)]`}
          >
            <div className="flex items-start gap-3">
              <span className="text-lg">📢</span>
              <div>
                <p className="text-sm font-medium mb-2">{testimonial.text}</p>
                <div className="text-xs opacity-80 font-medium">
                  <span className="text-white">{testimonial.name}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Destaque */}
      <div className="text-center mb-6">
        <p className="text-xl md:text-2xl font-bold text-white mb-4">
          👉 Se essas pessoas conseguiram, você também consegue.
        </p>
        
        <div className="rounded-2xl p-4 ring-1 ring-white/10 bg-gradient-to-br from-[#1f3550] to-[#0f1c2b] mb-6">
          <p className="text-sm text-[#C39BD3]">
            👤 Aplicativo Destrava Aí, usado por mais de 1 milhão de pessoas no mundo. Esse plano foi aplicado, testado e comprovado.
          </p>
        </div>
      </div>

      {/* Pergunta de confirmação */}
      <div className="mb-6">
        <p className="text-lg md:text-xl text-white font-medium mb-6 leading-relaxed">
          👉 "Se tantas pessoas conseguiram, você também pode. Você confia que, seguindo esse método, pode mudar sua vida em poucas semanas?"
        </p>
        
        <div className="grid gap-3">
          {options.map((label) => (
            <button
              key={label}
              onClick={() => handleSelect(label)}
              className="flex items-center justify-between w-full rounded-2xl p-4 ring-1 ring-white/10 transition shadow-[0_20px_60px_rgba(0,0,0,.35)] bg-gradient-to-br from-[#5e348f] to-[#3d225e] hover:scale-[1.02]"
            >
              <span className="text-left text-[15px] font-medium">{label}</span>
              <ChevronRight className="size-5 opacity-80" />
            </button>
          ))}
        </div>
      </div>

      <div className="text-center">
        <div className="rounded-2xl p-4 ring-1 ring-green-500/30 bg-gradient-to-br from-[#1d3a2b] to-[#0f1c15]">
          <p className="text-sm text-green-300 italic">
            ⚡ A confiança é o primeiro passo para a transformação.
          </p>
        </div>
      </div>
    </div>
  );
}