import React, { useState, useEffect, useMemo } from 'react';
import { ChevronRight } from 'lucide-react';

interface Page16Props {
  onNext: () => void;
  gainXp: (amount: number, reason?: string) => void;
  answers: Record<string, any>;
}

export function Page16Diagnosis({ onNext, gainXp, answers }: Page16Props) {
  const [showConsequences, setShowConsequences] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowConsequences(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Lógica para diagnóstico personalizado baseado nas respostas
  const diagnosis = useMemo(() => {
    const scrollLevel = answers.scroll || 5;
    const damages = answers.damages || [];
    const delayPattern = answers.delayPattern || '';
    const quitPattern = answers.quitPattern || '';
    const priority = answers.priority || '';

    // Determinar nível de procrastinação
    let level = "MÉDIO";
    let levelDescription = "Você tenta, mas se sabota mais do que avança. Está na hora de quebrar esse ciclo.";
    
    if (scrollLevel >= 8 || delayPattern.includes('Sempre')) {
      level = "EXTREMO";
      levelDescription = "Você está na beira do abismo. Ou muda, ou afunda.";
    } else if (scrollLevel >= 6 || delayPattern.includes('Frequentemente')) {
      level = "ALTO";
      levelDescription = "Piloto automático comendo tua energia e confiança.";
    }

    // Área mais prejudicada
    const mainDamage = damages[0] || 'relacionamentos';

    // Distração digital
    let digitalDistraction = "Distração digital moderada: precisa de controle";
    if (scrollLevel >= 8) {
      digitalDistraction = "Vício digital severo: celular dominando sua vida";
    } else if (scrollLevel >= 6) {
      digitalDistraction = "Distração digital alta: perdendo horas preciosas";
    } else if (scrollLevel <= 3) {
      digitalDistraction = "Distração digital baixa: foco é possível";
    }

    // Ciclo de desistência
    let quitCycle = "Ciclo de desistência: histórico de projetos abandonados";
    if (quitPattern.includes('Muitas')) {
      quitCycle = "Padrão crítico: desiste constantemente dos objetivos";
    } else if (quitPattern.includes('Algumas')) {
      quitCycle = "Ciclo de desistência: histórico de projetos abandonados";
    } else if (quitPattern.includes('Raramente')) {
      quitCycle = "Persistência moderada: às vezes desiste, mas tem potencial";
    }

    // Prioridade identificada
    const priorityText = priority || 'projetos';

    return {
      level,
      levelDescription,
      mainDamage,
      digitalDistraction,
      quitCycle,
      priority: priorityText
    };
  }, [answers]);

  const getLevelColor = () => {
    if (diagnosis.level === "EXTREMO") return "text-red-400";
    if (diagnosis.level === "ALTO") return "text-orange-300";
    return "text-yellow-300";
  };

  const handleContinue = () => {
    gainXp(15, "p16_diagnosis");
    onNext();
  };

  return (
    <div className="rounded-3xl p-6 md:p-8 ring-1 ring-white/10 shadow-[0_20px_60px_rgba(0,0,0,.35)] bg-gradient-to-b from-[#2b1a4e] via-[#3c2569] to-[#4B2E83] text-[#FCEEE3]">
      
      <h3 className="text-2xl md:text-3xl font-black tracking-tight text-white mb-6 leading-tight">
        Diagnóstico Final: a verdade nua
      </h3>

      {/* Diagnóstico Personalizado */}
      <div className="rounded-2xl p-6 ring-1 ring-white/10 bg-gradient-to-br from-[#1f3550] to-[#0f1c2b] mb-6">
        <div className="mb-4">
          <div className="text-sm opacity-90 mb-2">Seu nível de procrastinação:</div>
          <div className={`text-3xl font-black mb-3 ${getLevelColor()}`}>
            {diagnosis.level}
          </div>
          <p className="text-sm text-[#C39BD3] mb-6">
            {diagnosis.levelDescription}
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <span className="text-lg">🎯</span>
            <div>
              <div className="font-bold text-sm">Área mais prejudicada: {diagnosis.mainDamage}</div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <span className="text-lg">📱</span>
            <div>
              <div className="font-bold text-sm">{diagnosis.digitalDistraction}</div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <span className="text-lg">❌</span>
            <div>
              <div className="font-bold text-sm">{diagnosis.quitCycle}</div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <span className="text-lg">🎯</span>
            <div>
              <div className="font-bold text-sm">Prioridade identificada: {diagnosis.priority} precisa de atenção imediata</div>
            </div>
          </div>
        </div>
      </div>

      {/* Consequências (aparecem após 2 segundos) */}
      {showConsequences && (
        <div className="space-y-6">
          <div className="rounded-2xl p-6 ring-1 ring-red-500/30 bg-gradient-to-br from-[#6a3a38] to-[#3a1f1e]">
            <p className="text-lg font-bold text-red-300 mb-4 italic">
              💀 "Você está preso num ciclo de adiamento que já tá roubando sua energia, destruindo sua autoconfiança e atrasando seus maiores sonhos. E se você continuar assim, sua vida não vai só ficar parada… ela vai andar pra trás."
            </p>
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

          <div className="rounded-2xl p-6 ring-1 ring-white/10 bg-gradient-to-br from-[#2a0f2a] to-[#1a0a1a]">
            <h4 className="text-lg font-bold text-red-400 mb-4">❌ Se nada mudar, daqui a meses você vai:</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-red-400">•</span>
                <span>Perder oportunidades que nunca mais voltam.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400">•</span>
                <span>Ver sua carreira e seu dinheiro travados.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400">•</span>
                <span>Se sentir cada vez mais frustrado, pesado e arrependido.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400">•</span>
                <span>Olhar pro espelho e odiar a pessoa que deixou tudo escapar.</span>
              </li>
            </ul>
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

          <div className="rounded-2xl p-6 ring-1 ring-green-500/30 bg-gradient-to-br from-[#1d3a2b] to-[#0f1c15]">
            <h4 className="text-lg font-bold text-green-300 mb-4">✨ Mas há esperança:</h4>
            <div className="space-y-4 text-sm">
              <p>
                <span className="text-yellow-400 font-bold">⚡</span> "Se você agir HOJE, pode reverter esse ciclo em poucas semanas e conquistar foco, disciplina e orgulho real — mesmo que já tenha tentado antes sem sucesso."
              </p>
              <p>
                <span className="text-green-400 font-bold">👉</span> Não importa quantas vezes você fracassou, o plano certo pode virar sua mente e transformar sua vida.
              </p>
            </div>
          </div>

          <div className="text-center mt-8">
            <button
              onClick={handleContinue}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-extrabold text-lg bg-gradient-to-r from-[#F25C54] to-[#FF3B3B] hover:from-[#ff6f68] hover:to-[#ff5555] transition shadow-[0_20px_60px_rgba(242,92,84,.6)] text-white"
            >
              CONTINUAR PARA MEU PLANO <ChevronRight className="size-6" />
            </button>
            
            <p className="mt-4 text-sm text-[#C39BD3] italic">
              📌 A dor de agora é a conta do que adiou.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}