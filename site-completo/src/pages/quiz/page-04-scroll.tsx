import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';

interface Page04Props {
  onNext: () => void;
  gainXp: (amount: number, reason?: string) => void;
  setAnswer: (key: string, value: any) => void;
}

export function Page04Scroll({ onNext, gainXp, setAnswer }: Page04Props) {
  const [scroll, setScroll] = useState(5);

  const getScrollLevel = () => {
    if (scroll >= 8) return "EXTREMO";
    if (scroll >= 5) return "ALTO";
    if (scroll >= 3) return "MÉDIO";
    return "BAIXO";
  };

  const getLevelColor = () => {
    const level = getScrollLevel();
    if (level === "EXTREMO") return "text-red-400";
    if (level === "ALTO") return "text-orange-300";
    if (level === "MÉDIO") return "text-yellow-300";
    return "text-green-300";
  };

  const handleSubmit = () => {
    setAnswer("scroll", scroll);
    gainXp(6, "p4_scroll");
    onNext();
  };

  return (
    <div className="rounded-3xl p-6 md:p-8 ring-1 ring-white/10 shadow-[0_20px_60px_rgba(0,0,0,.35)] bg-gradient-to-b from-[#2b1a4e] via-[#3c2569] to-[#4B2E83] text-[#FCEEE3]">
      <h3 className="text-xl md:text-2xl font-extrabold tracking-tight text-white mb-3">
        Prisão Digital
      </h3>
      <p className="text-sm text-[#C39BD3] mb-6">
        Quanto o scroll (ato de rolar a tela) te destrói hoje? (0 = nada, 10 = quase todo dia me arregaça)
      </p>

      <div className="rounded-2xl p-6 ring-1 ring-white/10 bg-gradient-to-br from-[#5e348f] to-[#3d225e]">
        <div className="flex justify-between text-sm opacity-90 mb-4">
          <span>Nada (0)</span>
          <span>5</span>
          <span>Extremo (10)</span>
        </div>
        
        <input
          type="range"
          min={0}
          max={10}
          value={scroll}
          onChange={(e) => setScroll(Number(e.target.value))}
          className="w-full h-3 bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 rounded-lg appearance-none cursor-pointer"
        />
        
        <div className="mt-4 text-center">
          <div className={`text-2xl font-black ${getLevelColor()}`}>
            {getScrollLevel()}
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <button
          onClick={handleSubmit}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-bold bg-[#F25C54] hover:bg-[#ff6f68] transition shadow-[0_10px_30px_rgba(242,92,84,.35)]"
        >
          Continuar <ChevronRight className="size-4" />
        </button>
      </div>

      <p className="mt-4 text-xs opacity-80 italic text-center">
        Teu polegar é o carrasco dos teus objetivos.
      </p>

      <style jsx>{`
        input[type="range"]::-webkit-slider-thumb {
          appearance: none;
          height: 24px;
          width: 24px;
          border-radius: 50%;
          background: #F25C54;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        }
        
        input[type="range"]::-moz-range-thumb {
          height: 24px;
          width: 24px;
          border-radius: 50%;
          background: #F25C54;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        }
      `}</style>
    </div>
  );
}