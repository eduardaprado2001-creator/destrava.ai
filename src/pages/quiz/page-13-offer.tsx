import React from 'react';
import { ChevronRight, Sparkles } from 'lucide-react';

interface Page13Props {
  onNext: () => void;
  gainXp: (amount: number, reason?: string) => void;
}

export function Page13Offer({ onNext, gainXp }: Page13Props) {
  const handlePurchase = () => {
    gainXp(50, "p13_offer");
    // Aqui você adicionaria a integração com o sistema de pagamento
    alert("Redirecionando para pagamento...");
  };

  return (
    <div className="rounded-3xl p-6 md:p-8 ring-1 ring-white/10 shadow-[0_20px_60px_rgba(0,0,0,.35)] bg-gradient-to-b from-[#2b1a4e] via-[#3c2569] to-[#4B2E83] text-[#FCEEE3]">
      <h3 className="text-xl md:text-2xl font-extrabold tracking-tight text-white mb-4">
        Oferta Final
      </h3>
      
      <div className="grid gap-4">
        <div className="rounded-2xl p-5 ring-1 ring-white/10 bg-gradient-to-br from-[#1f3550] to-[#0f1c2b]">
          <div className="flex items-center gap-2 text-sm opacity-90">
            <Sparkles className="size-4"/>
            Em <b>5 dias</b> você sente tração. Em <b>14 dias</b>, rotina disciplinada — mesmo se já fracassou antes.
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-3">
          <div className="rounded-2xl p-4 ring-1 ring-white/10 bg-[#4B2E83]">
            <p className="text-sm">"Perdia cliente. Em 2 semanas fechei mais que em 3 meses."</p>
            <div className="mt-2 text-xs opacity-80">João — vendedor</div>
          </div>
          <div className="rounded-2xl p-4 ring-1 ring-white/10 bg-[#1d3a2b]">
            <p className="text-sm">"Travava no celular. Hoje termino o TCC e cumpro rotina."</p>
            <div className="mt-2 text-xs opacity-80">Larissa — estudante</div>
          </div>
          <div className="rounded-2xl p-4 ring-1 ring-white/10 bg-[#3b173b]">
            <p className="text-sm">"Não era preguiça; era falta de clareza. Faturei mais."</p>
            <div className="mt-2 text-xs opacity-80">Camila — empreendedora</div>
          </div>
        </div>

        <div className="rounded-2xl p-4 ring-1 ring-white/10 bg-gradient-to-br from-[#6a3a38] to-[#3a1f1e]">
          <p className="text-sm">
            A cada hora, dezenas entram. <b>Bônus Técnica X</b> limitado. Se voltar amanhã, pode não ter.
          </p>
        </div>

        <div className="flex items-center justify-between rounded-2xl p-5 ring-1 ring-white/10 bg-black/20">
          <div>
            <div className="text-sm opacity-90">Plano personalizado vitalício</div>
            <div className="text-2xl font-black text-[#FFCC48]">R$ 37</div>
            <div className="text-xs opacity-80">Acesso imediato + Bônus Técnica X (limitado)</div>
          </div>
          <button
            onClick={handlePurchase}
            className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl font-extrabold text-black bg-[#39FF88] hover:brightness-95 transition shadow-[0_20px_60px_rgba(57,255,136,.35)]"
          >
            QUERO ESMAGAR A PROCRASTINAÇÃO <ChevronRight className="size-5" />
          </button>
        </div>
      </div>

      <p className="mt-5 text-xs opacity-80 italic text-center">
        Ou você ri da procrastinação hoje, ou ela ri de você amanhã.
      </p>
    </div>
  );
}