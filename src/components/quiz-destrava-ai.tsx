import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Step {
  id: number;
  title: string;
  question: string;
  choices?: { label: string; value: string }[];
  reward: number;
  avatar: string;
  insight: string;
  type?: string;
  maxSelections?: number;
}

const steps: Step[] = [
  {
    id: 1,
    title: "Estalo Brutal",
    question: "Daqui a 1 ano sua vida vai estar IGUAL — travada, sem dinheiro e sem orgulho. Bora encarar a verdade?",
    choices: [{ label: "COMEÇAR O DIAGNÓSTICO", value: "start" }],
    reward: 1,
    avatar: "Sombra, olhos cansados.",
    insight: "Quem foge da verdade, casa com a mentira."
  },
  {
    id: 2,
    title: "Idade: o tempo já era",
    question: "Quantos anos você tem?",
    choices: [
      { label: "Menos de 20 — Ainda dá tempo de virar tudo.", value: "<20" },
      { label: "21 a 29 — Agora ou perde os melhores anos.", value: "21-29" },
      { label: "30 a 39 — Ou muda, ou começa a enterrar sonhos.", value: "30-39" },
      { label: "40 a 49 — É hoje ou nunca.", value: "40-49" },
      { label: "50+ — Procrastinar agora é suicídio de futuro.", value: "50+" }
    ],
    reward: 2,
    avatar: "Foco leve nos olhos.",
    insight: "Cada década sem ação é um caixão pro teu potencial."
  },
  {
    id: 3,
    title: "Prisão Digital",
    question: "Quanto o scroll te destrói hoje? (seja honesto)",
    choices: [
      { label: "Nada ou quase nada", value: "0-2" },
      { label: "Pouco, mas incomoda", value: "3-4" },
      { label: "Moderado, me atrapalha", value: "5-6" },
      { label: "Muito, destrói meu foco", value: "7-8" },
      { label: "Extremo, acaba comigo", value: "9-10" }
    ],
    reward: 6,
    avatar: "Pescoço erguendo.",
    insight: "Teu polegar é o carrasco dos teus objetivos."
  },
  {
    id: 4,
    title: "Reflexo do fracasso",
    question: "No espelho, você tá matando sua melhor versão?",
    choices: [
      { label: "Sempre", value: "sempre" },
      { label: "Muitas vezes", value: "muitas" },
      { label: "Às vezes", value: "asvezes" }
    ],
    reward: 4,
    avatar: "Reflexo distorcido ao fundo.",
    insight: "O espelho não mente: ou age, ou apodrece."
  },
  {
    id: 5,
    title: "Prejuízo já causado",
    question: "O que a procrastinação já destruiu? (escolha até 2)",
    choices: [
      { label: "Carreira", value: "carreira" },
      { label: "Dinheiro", value: "dinheiro" },
      { label: "Relacionamentos", value: "relacionamentos" },
      { label: "Saúde", value: "saude" },
      { label: "Confiança", value: "confianca" }
    ],
    reward: 10,
    avatar: "Fendas de luz no peito.",
    insight: "Cada área fodida é um grito do teu eu que desistiu.",
    type: "checkbox",
    maxSelections: 2
  },
  {
    id: 6,
    title: "Foco total agora",
    question: "Se o foco total viesse HOJE, qual prioridade #1?",
    choices: [
      { label: "Carreira", value: "carreira" },
      { label: "Dinheiro", value: "dinheiro" },
      { label: "Saúde", value: "saude" },
      { label: "Projetos pessoais", value: "projetos" },
      { label: "Relacionamentos", value: "relacionamentos" },
      { label: "Tudo de uma vez", value: "tudo" }
    ],
    reward: 4,
    avatar: "Postura firme.",
    insight: "A prioridade que escolhe define a vida que constrói."
  },
  {
    id: 7,
    title: "Sua vida em 12 meses",
    question: "Daqui a 12 meses, como você quer se enxergar?",
    choices: [
      { label: "Resultados reais, projetos do papel.", value: "resultados" },
      { label: "Disciplina, confiança e orgulho.", value: "disciplina" },
      { label: "Rotina produtiva no controle.", value: "rotina" }
    ],
    reward: 6,
    avatar: "Luz no olhar.",
    insight: "A vida que quer não chega — é construída."
  },
  {
    id: 8,
    title: "Processamento Neural",
    question: "Seu diagnóstico está chegando...",
    type: "loading",
    reward: 5,
    avatar: "Olhos fechados, download de consciência.",
    insight: "Quem assume o compromisso, colhe o resultado."
  },
  {
    id: 9,
    title: "O futuro sem ação",
    question: "Quantas vezes você começou com energia e largou no meio?",
    choices: [
      { label: "Muitas (padrão)", value: "muitas" },
      { label: "Algumas (dói)", value: "algumas" },
      { label: "Raramente", value: "raro" },
      { label: "Nunca (😈)", value: "nunca" }
    ],
    reward: 5,
    avatar: "Rosto meio luz/meio sombra.",
    insight: "Cada desistência é uma mini‑morte."
  },
  {
    id: 10,
    title: "Virada mental: a última chamada",
    question: "Ou você controla a mente, ou a procrastinação te controla. Quer ver seu diagnóstico personalizado agora?",
    choices: [{ label: "VER MEU DIAGNÓSTICO PERSONALIZADO", value: "cta" }],
    reward: 5,
    avatar: "Armadura psíquica ativando (nível 5).",
    insight: "Clareza sem ação é autoengano."
  },
  {
    id: 11,
    title: "Diagnóstico Final: a verdade nua",
    type: "diagnosis",
    reward: 10,
    avatar: "Armadura 7/10.",
    insight: "A dor de agora é a conta do que adiou."
  },
  {
    id: 12,
    title: "Compromisso de tempo diário",
    question: "Quanto tempo por dia você vai investir para sair do ciclo?",
    choices: [
      { label: "5 min/dia — Começar agora", value: "5" },
      { label: "10 min/dia — Pronto pra mudar", value: "10" },
      { label: "15 min/dia — Compromisso de verdade", value: "15" },
      { label: "20+ min/dia — Vou dar tudo", value: "20+" }
    ],
    reward: 9,
    avatar: "9/10, olhos em brasa.",
    insight: "O futuro pune quem hesita."
  },
  {
    id: 13,
    title: "Oferta Final",
    type: "offer",
    reward: 5,
    avatar: "10/10, armadura completa.",
    insight: "Ou você ri da procrastinação hoje, ou ela ri de você amanhã."
  }
];

export default function QuizDestravaAi() {
  const [currentStep, setCurrentStep] = useState(1);
  const [xp, setXp] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});

  const step = steps[currentStep - 1];

  const giveXp = (amount: number) => {
    setXp(prev => prev + amount);
    if ((window as any).__ga) {
      (window as any).__ga.gainXp(amount, `step_${currentStep}`);
    }
  };

  const updateProgress = () => {
    const progressMap: Record<number, number> = {
      1: 8, 2: 16, 3: 24, 4: 32, 5: 40, 6: 48, 7: 56, 
      8: 64, 9: 72, 10: 80, 11: 88, 12: 96, 13: 100
    };
    return progressMap[currentStep] || 0;
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleChoice = (value: string) => {
    setAnswers(prev => ({ ...prev, [`step_${step.id}`]: value }));
    giveXp(step.reward);
    nextStep();
  };

  const renderRadioStep = () => (
    <div className="space-y-4">
      <p className="text-lg text-[#C39BD3] leading-relaxed">{step.question}</p>
      <div className="space-y-3">
        {step.choices?.map((choice, index) => (
          <motion.button
            key={index}
            onClick={() => handleChoice(choice.value)}
            className="w-full p-4 text-left rounded-2xl bg-gradient-to-r from-[#5e348f] to-[#3d225e] text-[#FCEEE3] font-semibold border border-white/10 hover:scale-[1.02] transition-all duration-300"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {choice.label}
          </motion.button>
        ))}
      </div>
    </div>
  );

  const renderCheckboxStep = () => {
    const [selected, setSelected] = useState<string[]>([]);

    const toggleSelection = (value: string) => {
      setSelected(prev => {
        if (prev.includes(value)) {
          return prev.filter(v => v !== value);
        } else if (prev.length < (step.maxSelections || 2)) {
          return [...prev, value];
        }
        return prev;
      });
    };

    const handleContinue = () => {
      if (selected.length > 0) {
        setAnswers(prev => ({ ...prev, [`step_${step.id}`]: selected }));
        giveXp(step.reward);
        nextStep();
      }
    };

    return (
      <div className="space-y-4">
        <p className="text-lg text-[#C39BD3] leading-relaxed">{step.question}</p>
        <div className="space-y-3">
          {step.choices?.map((choice, index) => (
            <button
              key={index}
              onClick={() => toggleSelection(choice.value)}
              className={`w-full p-4 text-left rounded-2xl font-semibold border border-white/10 transition-all duration-300 ${
                selected.includes(choice.value)
                  ? 'bg-gradient-to-r from-[#6a3a38] to-[#3a1f1e] text-white'
                  : 'bg-gradient-to-r from-[#5e348f] to-[#3d225e] text-[#FCEEE3] hover:scale-[1.02]'
              }`}
            >
              {choice.label}
            </button>
          ))}
        </div>
        <button
          onClick={handleContinue}
          disabled={selected.length === 0}
          className="w-full mt-6 p-4 rounded-2xl bg-[#F25C54] text-white font-bold hover:bg-[#ff6f68] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continuar
        </button>
      </div>
    );
  };

  const renderLoadingStep = () => (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-12 h-12 border-3 border-white/20 border-t-[#F25C54] rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-lg text-[#C39BD3]">Processamento Neural: analisando suas respostas...</p>
        <p className="mt-4 text-sm text-white/80">
          Na última semana, <strong>1.024 pessoas</strong> começaram exatamente como você… e já sentiram mudança.
        </p>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center gap-3 text-sm">
          <input type="checkbox" id="agree1" className="w-4 h-4" />
          <label htmlFor="agree1" className="text-[#FCEEE3]">
            Concordo em aplicar <strong>5–15 min/dia</strong> do plano.
          </label>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <input type="checkbox" id="agree2" className="w-4 h-4" />
          <label htmlFor="agree2" className="text-[#FCEEE3]">
            Quero receber apenas o <strong>essencial</strong>.
          </label>
        </div>
        <input
          type="email"
          placeholder="Seu e-mail"
          className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-[#FCEEE3] placeholder-white/50"
        />
        <input
          type="tel"
          placeholder="Seu WhatsApp"
          className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-[#FCEEE3] placeholder-white/50"
        />
        <button
          onClick={() => {
            giveXp(step.reward);
            nextStep();
          }}
          className="w-full p-4 rounded-2xl bg-[#F25C54] text-white font-bold hover:bg-[#ff6f68] transition-colors"
        >
          Continuar
        </button>
      </div>
    </div>
  );

  const renderDiagnosisStep = () => {
    const scrollLevel = parseInt(answers.step_3?.split('-')[1]) || 5;
    
    let level = "MÉDIO";
    let levelColor = "text-yellow-400";
    if (scrollLevel >= 8) {
      level = "EXTREMO";
      levelColor = "text-red-400";
    } else if (scrollLevel >= 5) {
      level = "ALTO";
      levelColor = "text-orange-400";
    }

    const damages = answers.step_5 || ['carreira'];
    const bullets = [
      `Área mais afetada: ${damages[0]}${damages[1] ? ` e ${damages[1]}` : ''}.`,
      `Gatilho de fuga: ${scrollLevel > 6 ? 'celular' : 'adiamento/ansiedade'}.`,
      `Quebra de foco: pico no período atual.`
    ];

    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-br from-[#1f3550] to-[#0f1c2b] rounded-2xl p-6 border border-white/10">
          <div className="text-sm opacity-90 mb-2">Seu nível de procrastinação:</div>
          <div className={`text-4xl font-black mb-3 ${levelColor}`}>
            {level}
          </div>
          <p className="text-[#C39BD3] mb-4">
            {level === "EXTREMO" ? "Você está na beira do abismo. Ou muda, ou afunda." :
             level === "ALTO" ? "Piloto automático comendo tua energia e confiança." :
             "Você tenta, mas se sabota mais do que avança."}
          </p>
          <ul className="space-y-2 text-sm">
            {bullets.map((bullet, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-[#F25C54] mt-1">•</span>
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <button
          onClick={() => {
            giveXp(step.reward);
            nextStep();
          }}
          className="w-full p-4 rounded-2xl bg-[#F25C54] text-white font-bold hover:bg-[#ff6f68] transition-colors"
        >
          Continuar
        </button>
      </div>
    );
  };

  const renderOfferStep = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-[#1f3550] to-[#0f1c2b] rounded-2xl p-6 border border-white/10">
        <p className="text-sm text-[#FCEEE3]">
          ✨ Em <strong>5 dias</strong> você sente tração. Em <strong>14 dias</strong>, rotina disciplinada — mesmo se já fracassou antes.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {[
          { text: "Perdia cliente. Em 2 semanas fechei mais que em 3 meses.", author: "João — vendedor", bg: "bg-[#4B2E83]" },
          { text: "Travava no celular. Hoje termino o TCC e cumpro rotina.", author: "Larissa — estudante", bg: "bg-[#1d3a2b]" },
          { text: "Não era preguiça; era falta de clareza. Faturei mais.", author: "Camila — empreendedora", bg: "bg-[#3b173b]" }
        ].map((testimonial, index) => (
          <div key={index} className={`${testimonial.bg} rounded-2xl p-4 border border-white/10`}>
            <p className="text-sm text-[#FCEEE3] mb-2">"{testimonial.text}"</p>
            <div className="text-xs opacity-80">{testimonial.author}</div>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-r from-[#6a3a38] to-[#3a1f1e] rounded-2xl p-4 border border-white/10">
        <p className="text-sm text-[#FCEEE3]">
          A cada hora, dezenas entram. <strong>Bônus Técnica X</strong> limitado. Se voltar amanhã, pode não ter.
        </p>
      </div>

      <div className="flex items-center justify-between bg-black/20 rounded-2xl p-6 border border-white/10">
        <div>
          <div className="text-sm opacity-90">Plano personalizado vitalício</div>
          <div className="text-3xl font-black text-[#FFCC48]">R$ 37</div>
          <div className="text-xs opacity-80">Acesso imediato + Bônus Técnica X (limitado)</div>
        </div>
        <button
          onClick={() => {
            giveXp(50);
            alert("Redirecionando para pagamento...");
          }}
          className="px-6 py-3 bg-[#39FF88] text-black font-bold rounded-2xl hover:bg-[#2ee077] transition-colors"
        >
          QUERO ESMAGAR A PROCRASTINAÇÃO
        </button>
      </div>
    </div>
  );

  const renderStep = () => {
    if (step.type === 'loading') return renderLoadingStep();
    if (step.type === 'diagnosis') return renderDiagnosisStep();
    if (step.type === 'offer') return renderOfferStep();
    if (step.type === 'checkbox') return renderCheckboxStep();
    return renderRadioStep();
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* HUD */}
        <div className="flex items-center justify-between mb-6 text-sm">
          <div className="flex gap-3">
            <span className="bg-white/10 px-3 py-1 rounded-full">
              XP <span className="text-[#FFCC48]">{xp}</span>/140
            </span>
            <span className="bg-white/10 px-3 py-1 rounded-full">
              Avatar: {step.avatar}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-32 h-2 bg-white/10 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-[#F25C54] to-[#FF3B3B] rounded-full transition-all duration-500"
                style={{ width: `${updateProgress()}%` }}
              />
            </div>
            <span>{updateProgress()}%</span>
          </div>
        </div>

        {/* Main Content */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-br from-[#2b1a4e]/70 to-[#4B2E83]/70 rounded-3xl p-8 border border-white/10 shadow-2xl backdrop-blur-sm"
        >
          <h1 className="text-2xl font-black text-white mb-6 text-center">
            {step.title}
          </h1>
          
          {renderStep()}
          
          {step.insight && (
            <p className="mt-6 text-xs text-center opacity-80 italic">
              {step.insight}
            </p>
          )}
        </motion.div>
      </div>
    </div>
  );
}