import React, { useState } from 'react';
import { ChevronRight, Loader2 } from 'lucide-react';

interface Page06Props {
  onNext: () => void;
  gainXp: (amount: number, reason?: string) => void;
  setAnswer: (key: string, value: any) => void;
}

export function Page06Loading({ onNext, gainXp, setAnswer }: Page06Props) {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [agree1, setAgree1] = useState(false);
  const [agree2, setAgree2] = useState(false);

  const handleSubmit = () => {
    setAnswer("email", email);
    setAnswer("phone", phone);
    gainXp(5, "p6_loading");
    onNext();
  };

  return (
    <div className="rounded-3xl p-6 md:p-8 ring-1 ring-white/10 shadow-[0_20px_60px_rgba(0,0,0,.35)] bg-gradient-to-b from-[#2b1a4e] via-[#3c2569] to-[#4B2E83] text-[#FCEEE3]">
      <div className="flex items-center gap-2 text-sm opacity-90 mb-2">
        <Loader2 className="size-4 animate-spin" />
        <span>Processamento Neural: analisando suas respostas…</span>
      </div>
      
      <h3 className="text-xl md:text-2xl font-extrabold tracking-tight text-white mb-3">
        Seu diagnóstico está chegando
      </h3>
      
      <p className="text-sm text-[#C39BD3] mb-6">
        Na última semana, <b>1.024 pessoas</b> começaram exatamente como você… e já sentiram mudança.
      </p>

      <label className="flex items-center gap-3 text-sm mb-2">
        <input 
          type="checkbox" 
          className="accent-[#F25C54]" 
          checked={agree1} 
          onChange={() => setAgree1(!agree1)} 
        />
        Concordo em aplicar <b>5–15 min/dia</b> do plano.
      </label>
      
      <label className="flex items-center gap-3 text-sm mb-4">
        <input 
          type="checkbox" 
          className="accent-[#F25C54]" 
          checked={agree2} 
          onChange={() => setAgree2(!agree2)} 
        />
        Quero receber apenas o <b>essencial</b>.
      </label>

      <div className="grid md:grid-cols-2 gap-3">
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Seu e-mail"
          className="rounded-xl bg-white/5 ring-1 ring-white/10 px-4 py-3 text-sm placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#F25C54]"
        />
        <input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Seu telefone (opcional)"
          className="rounded-xl bg-white/5 ring-1 ring-white/10 px-4 py-3 text-sm placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#F25C54]"
        />
      </div>

      <div className="mt-6 flex justify-end">
        <button
          onClick={handleSubmit}
          disabled={!email || !agree1 || !agree2}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl font-bold bg-[#F25C54] hover:bg-[#ff6f68] transition shadow-[0_10px_30px_rgba(242,92,84,.35)] disabled:opacity-40"
        >
          Continuar <ChevronRight className="size-4" />
        </button>
      </div>

      <p className="mt-4 text-xs opacity-80 italic text-center">
        Quem assume o compromisso, colhe o resultado.
      </p>
    </div>
  );
}