import React, { useState, useEffect } from 'react';
import { ChevronRight, Loader2 } from 'lucide-react';

interface Page11Props {
  onNext: () => void;
  gainXp: (amount: number, reason?: string) => void;
  answers: Record<string, any>;
  playSound: () => void;
}

export function Page11Diagnosis({ onNext, gainXp, answers, playSound }: Page11Props) {
  const [currentStep, setCurrentStep] = useState(0);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [agree1, setAgree1] = useState(false);
  const [agree2, setAgree2] = useState(false);

  useEffect(() => {
    // Tocar som de carregamento quando a página carrega
    const loadingAudio = new Audio('/Loading Sound Effect (Royalty free Sound)#shorts.mp3');
    loadingAudio.volume = 0.3;
    loadingAudio.play().catch(() => {});
    
    const timer1 = setTimeout(() => setCurrentStep(1), 2000);
    const timer2 = setTimeout(() => setCurrentStep(2), 4000);
    const timer3 = setTimeout(() => setCurrentStep(3), 6000);
    const timer4 = setTimeout(() => setCurrentStep(4), 8000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, []);

  const handleSubmit = () => {
    playSound();
    gainXp(10, "p11_diagnosis");
    onNext();
  };

  return (
    <div className="rounded-3xl p-6 md:p-8 ring-1 ring-white/10 shadow-[0_20px_60px_rgba(0,0,0,.35)] bg-gradient-to-b from-[#2b1a4e] via-[#3c2569] to-[#4B2E83] text-[#FCEEE3]">
      
      {/* Step 0 - Initial loading */}
      {currentStep === 0 && (
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 text-sm opacity-90 mb-4">
            <Loader2 className="size-4 animate-spin" />
            <span>🔄 Estamos avaliando suas respostas e preparando o diagnóstico personalizado para você…</span>
          </div>
        </div>
      )}

      {/* Step 1 - Processamento Neural */}
      {currentStep >= 1 && (
        <div className="mb-6">
          <h3 className="text-xl md:text-2xl font-extrabold tracking-tight text-white mb-4">
            Processamento Neural
          </h3>
          <div className="rounded-2xl p-5 ring-1 ring-white/10 bg-gradient-to-br from-[#6a3a38] to-[#3a1f1e] mb-4">
            <p className="text-sm font-bold text-red-300 mb-3">🚨 A verdade é dura:</p>
            <p className="text-sm mb-4">
              Se você continuar permitindo que a procrastinação controle sua vida, não vai ser apenas o seu tempo que será roubado…
            </p>
            <p className="text-lg font-bold text-red-400">👉 Sua vida inteira vai ser engolida.</p>
          </div>
        </div>
      )}

      {/* Step 2 - Consequências */}
      {currentStep >= 2 && (
        <div className="mb-6">
          <div className="grid gap-3">
            <div className="flex items-start gap-3 p-3 rounded-xl bg-red-900/30 ring-1 ring-red-500/30">
              <span className="text-red-400 font-bold">❌</span>
              <span className="text-sm">Sua carreira continuará travada e sem progressos.</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-xl bg-red-900/30 ring-1 ring-red-500/30">
              <span className="text-red-400 font-bold">❌</span>
              <span className="text-sm">Seu dinheiro vai escorrer pelos dedos, sem saber como retomar o controle.</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-xl bg-red-900/30 ring-1 ring-red-500/30">
              <span className="text-red-400 font-bold">❌</span>
              <span className="text-sm">Seus relacionamentos vão se enfraquecer, e você vai se afastar daquilo que importa.</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-xl bg-red-900/30 ring-1 ring-red-500/30">
              <span className="text-red-400 font-bold">❌</span>
              <span className="text-sm">Sua confiança vai pro lixo, deixando você se sentindo incapaz de mudar.</span>
            </div>
          </div>
          <p className="text-sm mt-4 text-[#C39BD3]">
            E o pior de tudo: as respostas que você forneceu até agora já revelam os pontos exatos onde você está se sabotando.
          </p>
        </div>
      )}

      {/* Step 3 - Warning */}
      {currentStep >= 3 && (
        <div className="mb-6">
          <div className="rounded-2xl p-5 ring-1 ring-white/10 bg-gradient-to-br from-[#1f1f1f] to-[#0a0a0a] text-center">
            <p className="text-lg font-black text-red-400 mb-3">💀 "Se você não tomar uma atitude agora, daqui a 1 ano sua vida será a mesma."</p>
            <p className="text-sm text-gray-300">
              E em 5 anos, talvez você nem se reconheça mais: cansado, frustrado, arrependido, enterrando sonhos que poderiam ser sua realidade.
            </p>
          </div>
        </div>
      )}

      {/* Step 4 - Call to Action */}
      {currentStep >= 4 && (
        <div>
          <div className="text-center mb-6">
            <p className="text-xl font-black text-[#FFCC48] mb-2">⚡ É agora ou nunca.</p>
            <p className="text-lg font-bold text-white">⏳ Agora é a hora de agir.</p>
          </div>

          <div className="space-y-4 mb-6">
            <label className="flex items-start gap-3 text-sm">
              <input 
                type="checkbox" 
                className="accent-[#F25C54] mt-1" 
                checked={agree1} 
                onChange={() => setAgree1(!agree1)} 
              />
              <span>📈 Concordo em aplicar <b>5–15 min/dia</b> do plano e quero dar o primeiro passo para a mudança.</span>
            </label>
            
            <label className="flex items-start gap-3 text-sm">
              <input 
                type="checkbox" 
                className="accent-[#F25C54] mt-1" 
                checked={agree2} 
                onChange={() => setAgree2(!agree2)} 
              />
              <span>✔️ Quero receber apenas o <b>essencial</b> e focar no que vai me transformar.</span>
            </label>
          </div>

          <div className="grid md:grid-cols-2 gap-3 mb-6">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Seu e-mail"
              className="rounded-xl bg-white/5 ring-1 ring-white/10 px-4 py-3 text-sm placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#F25C54]"
            />
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Seu WhatsApp"
              className="rounded-xl bg-white/5 ring-1 ring-white/10 px-4 py-3 text-sm placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#F25C54]"
            />
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleSubmit}
              disabled={!email || !agree1 || !agree2}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-bold bg-[#F25C54] hover:bg-[#ff6f68] transition shadow-[0_10px_30px_rgba(242,92,84,.35)] disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Continuar <ChevronRight className="size-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}