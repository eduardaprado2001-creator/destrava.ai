import React, { useState } from 'react';
import { ChevronRight, Check } from 'lucide-react';

interface Page03Props {
  onNext: () => void;
  gainXp: (amount: number, reason?: string) => void;
  setAnswer: (key: string, value: any) => void;
}

export function Page03Scroll({ onNext, gainXp, setAnswer }: Page03Props) {
  const [scroll, setScroll] = useState(5);
  const [delay, setDelay] = useState<string>("");
  
  const legend = [
    "Nada", "Quase nada", "Pouco", "Moderado", "Considerável", "Frequente",
    "Muito", "Quase todo dia", "Todo dia", "Destrói meu foco", "Acaba comigo",
  ];

  const handleSubmit = () => {
    setAnswer("scroll", scroll);
    setAnswer("delay", delay);
    gainXp(6, "p3_combo");
    onNext();
  };

  return (
    <div className="rounded-3xl p-6 md:p-8 ring-1 ring-white/10 shadow-[0_20px_60px_rgba(0,0,0,.35)] bg-gradient-to-b from-[#2b1a4e] via-[#3c2569] to-[#4B2E83] text-[#FCEEE3]">
      <h3 className="text-xl md:text-2xl font-extrabold tracking-tight text-white mb-3">
        Prisão Digital + Adiamento
      </h3>
      <p className="text-sm text-[#C39BD3] mb-6">
        Quanto o scroll te destrói? Depois, com que frequência você adia o que importa.
      </p>

      <div className="rounded-2xl p-5 ring-1 ring-white/10 bg-gradient-to-br from-[#5e348f] to-[#3d225e]">
        <label className="text-sm opacity-90">Scroll no celular</label>
        <input
          type="range"
          min={0}
          max={10}
          value={scroll}
          onChange={(e) => setScroll(Number(e.target.value))}
          className="w-full mt-3 accent-[#F25C54]"
        />
        <div className="mt-2 text-xs opacity-80">{legend[scroll]}</div>
      </div>

      <div className="grid gap-3 mt-4">
        {["Sempre", "Frequentemente", "Às vezes", "Raramente"].map((opt) => (
          <button
            key={opt}
            onClick={() => setDelay(opt)}
            className={`flex items-center justify-between w-full rounded-2xl p-4 ring-1 ring-white/10 transition shadow-[0_20px_60px_rgba(0,0,0,.35)] ${
              delay === opt ? "bg-gradient-to-br from-[#6a3a38] to-[#3a1f1e] scale-[1.02]" : "bg-gradient-to-br from-[#1f3550] to-[#0f1c2b]"
            }`}
          >
            <span className="text-left text-[15px]">{opt}</span>
            {delay === opt ? <Check className="size-5 text-[#FFCC48]" /> : <span className="size-5" />}
          </button>
        ))}
      </div>

      <div className="mt-5 flex justify-end">
        <button
          onClick={handleSubmit}
          disabled={!delay}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl font-bold bg-[#F25C54] hover:bg-[#ff6f68] transition shadow-[0_10px_30px_rgba(242,92,84,.35)] disabled:opacity-40"
        >
          Continuar <ChevronRight className="size-4" />
        </button>
      </div>

      <p className="mt-4 text-xs opacity-80 italic text-center">
        Teu polegar é o carrasco dos teus objetivos.
      </p>
    </div>
  );
}