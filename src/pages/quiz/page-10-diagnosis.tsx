import React, { useMemo } from 'react';
import { ChevronRight } from 'lucide-react';

interface Page10Props {
  onNext: () => void;
  gainXp: (amount: number, reason?: string) => void;
  answers: Record<string, any>;
}

export function Page10Diagnosis({ onNext, gainXp, answers }: Page10Props) {
  const level = useMemo<"ALTO" | "MÉDIO" | "EXTREMO">(() => {
    const s = typeof answers.scroll === "number" ? answers.scroll : 5;
    const d = String(answers.delayPattern || "");
    if (s >= 8 || d.includes("Sempre")) return "EXTREMO";
    if (s >= 5 || d.includes("Frequentemente")) return "ALTO";
    return "MÉDIO";
  }, [answers]);

  const bullets = [
    `Área mais afetada: ${answers.damages?.[0] ?? "carreira"}${answers.damages?.[1] ? ` e ${answers.damages?.[1]}` : ""}.`,
    `Gatilho de fuga: ${answers.scroll >= 7 ? 'celular' : 'adiamento/ansiedade'}.`,
    `Quebra de foco: pico no período atual.`
  ];

  const handleContinue = () => {
    gainXp(10, "p10_diagnosis");
    onNext();
  };

  return (
    <div className="rounded-3xl p-6 md:p-8 ring-1 ring-white/10 shadow-[0_20px_60px_rgba(0,0,0,.35)] bg-gradient-to-b from-[#2b1a4e] via-[#3c2569] to-[#4B2E83] text-[#FCEEE3]">
      <h3 className="text-xl md:text-2xl font-extrabold tracking-tight text-white mb-4">
        Diagnóstico Final
      </h3>
      
      <div className="rounded-2xl p-5 ring-1 ring-white/10 bg-gradient-to-br from-[#1f3550] to-[#0f1c2b]">
        <div className="text-sm opacity-90">Seu nível de procrastinação:</div>
        <div className={`mt-1 text-2xl font-black ${
          level === "EXTREMO" ? "text-red-400" : 
          level === "ALTO" ? "text-orange-300" : 
          "text-[#FFCC48]"
        }`}>
          {level}
        </div>
        <p className="mt-3 text-sm text-[#C39BD3]">
          {level === "EXTREMO"
            ? "Você está na beira do abismo. Ou muda, ou afunda."
            : level === "ALTO"
            ? "Piloto automático comendo tua energia e confiança."
            : "Você tenta, mas se sabota mais do que avança."}
        </p>
        <ul className="mt-4 grid gap-2 text-sm list-disc list-inside">
          {bullets.map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>
      </div>
      
      <div className="mt-6 flex justify-end">
        <button
          onClick={handleContinue}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl font-bold bg-[#F25C54] hover:bg-[#ff6f68] transition shadow-[0_10px_30px_rgba(242,92,84,.35)]"
        >
          Continuar <ChevronRight className="size-4" />
        </button>
      </div>
      
      <p className="mt-4 text-xs opacity-80 italic text-center">
        A dor de agora é a conta do que adiou.
      </p>
    </div>
  );
}