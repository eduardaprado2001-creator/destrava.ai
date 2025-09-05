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
    insight: "A dor de agora é a conta do que adiou.",
    question: ""
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
    insight: "Ou você ri da procrastinação hoje, ou ela ri de você amanhã.",
    question: ""
  }
];

export default function QuizDestravaAi() {
  const [currentStep, setCurrentStep] = useState(1);
  const [xp, setXp] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});

  const playSound = (soundId: string) => {
    try {
      const sound = document.getElementById(soundId) as HTMLAudioElement;
      if (sound) {
        sound.volume = 0.25;
        sound.play().catch(() => {});
      }
    } catch (e) {}
  };

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
    const progress = progressMap[currentStep] || 0;
    const progressFill = document.getElementById('progress-fill');
    const progressPercent = document.getElementById('progress-percent');
    if (progressFill) progressFill.style.width = progress + '%';
    if (progressPercent) progressPercent.textContent = progress + '%';
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const renderRadioStep = (step: Step) => {
    return (
      <div>
        <p className="text-lg mb-6 text-[#C39BD3] leading-relaxed">{step.question}</p>
        <div className="space-y-3">
          {step.choices?.map((choice, index) => (
            <motion.button
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="w-full p-4 bg-gradient-to-r from-[#5e348f] to-[#3d225e] rounded-2xl text-left text-[#FCEEE3] font-medium hover:from-[#6a3a38] hover:to-[#3a1f1e] transition-all duration-300 border border-white/10"
              onClick={() => {
                playSound('ping-sound');
                setAnswers(prev => ({ ...prev, [`step_${step.id}`]: choice.value }));
                giveXp(step.reward);
                setTimeout(nextStep, 500);
              }}
            >
              {choice.label}
            </motion.button>
          ))}
        </div>
      </div>
    );
  };

  const renderCheckboxStep = (step: Step) => {
    const [selected, setSelected] = useState<string[]>([]);
    
    return (
      <div>
        <p className="text-lg mb-6 text-[#C39BD3] leading-relaxed">{step.question}</p>
        <div className="space-y-3 mb-6">
          {step.choices?.map((choice, index) => (
            <motion.button
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`w-full p-4 rounded-2xl text-left text-[#FCEEE3] font-medium transition-all duration-300 border border-white/10 ${
                selected.includes(choice.value)
                  ? 'bg-gradient-to-r from-[#6a3a38] to-[#3a1f1e]'
                  : 'bg-gradient-to-r from-[#5e348f] to-[#3d225e] hover:from-[#6a3a38] hover:to-[#3a1f1e]'
              }`}
              onClick={() => {
                playSound('ping-sound');
                setSelected(prev => {
                  if (prev.includes(choice.value)) {
                    return prev.filter(v => v !== choice.value);
                  } else if (prev.length < (step.maxSelections || 999)) {
                    return [...prev, choice.value];
                  }
                  return prev;
                });
              }}
            >
              {choice.label}
            </motion.button>
          ))}
        </div>
        <button
          className="w-full p-4 bg-[#F25C54] hover:bg-[#ff6f68] rounded-2xl text-white font-bold transition-all duration-300"
          onClick={() => {
            if (selected.length > 0) {
              setAnswers(prev => ({ ...prev, [`step_${step.id}`]: selected }));
              giveXp(step.reward);
              nextStep();
            }
          }}
        >
          Continuar
        </button>
      </div>
    );
  };

  const renderLoadingStep = (step: Step) => {
    return (
      <div>
        <div className="text-center mb-8">
          <div className="w-10 h-10 border-3 border-white/20 border-t-[#F25C54] rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg text-[#C39BD3]">Processamento Neural: analisando suas respostas...</p>
          <p className="text-sm text-white/80 mt-4">Na última semana, <strong>1.024 pessoas</strong> começaram exatamente como você… e já sentiram mudança.</p>
        </div>
        
        <div className="space-y-4 mb-6">
          <div className="flex items-center gap-3 text-sm">
            <input type="checkbox" id="agree1" className="w-4 h-4" />
            <label htmlFor="agree1" className="text-[#FCEEE3]">Concordo em aplicar <strong>5–15 min/dia</strong> do plano.</label>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <input type="checkbox" id="agree2" className="w-4 h-4" />
            <label htmlFor="agree2" className="text-[#FCEEE3]">Quero receber apenas o <strong>essencial</strong>.</label>
          </div>
          <input
            type="email"
            id="email"
            placeholder="Seu e-mail"
            className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-[#FCEEE3] placeholder-white/50"
            required
          />
          <input
            type="tel"
            id="phone"
            placeholder="Seu WhatsApp"
            className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-[#FCEEE3] placeholder-white/50"
          />
        </div>
        
        <button
          className="w-full p-4 bg-[#F25C54] hover:bg-[#ff6f68] rounded-2xl text-white font-bold transition-all duration-300"
          onClick={() => {
            const email = (document.getElementById('email') as HTMLInputElement)?.value;
            const phone = (document.getElementById('phone') as HTMLInputElement)?.value;
            const agree1 = (document.getElementById('agree1') as HTMLInputElement)?.checked;
            const agree2 = (document.getElementById('agree2') as HTMLInputElement)?.checked;

            if (email && agree1 && agree2) {
              setAnswers(prev => ({ ...prev, email, phone }));
              giveXp(step.reward);
              nextStep();
            } else {
              alert('Por favor, preencha todos os campos obrigatórios.');
            }
          }}
        >
          Continuar
        </button>
      </div>
    );
  };

  const renderDiagnosisStep = (step: Step) => {
    // Calcular severidade baseado nas respostas
    let severityScore = 0;
    
    // Scroll level (0-10)
    const scrollAnswer = answers.step_3 || '0-2';
    const scrollLevel = parseInt(scrollAnswer.split('-')[1]) || 2;
    severityScore += scrollLevel;
    
    // Espelho (sempre/muitas/às vezes = 3/2/1)
    const mirrorAnswer = answers.step_4 || 'asvezes';
    if (mirrorAnswer === 'sempre') severityScore += 3;
    else if (mirrorAnswer === 'muitas') severityScore += 2;
    else severityScore += 1;
    
    // Desistências (muitas/algumas/raro/nunca = 3/2/1/0)
    const quitAnswer = answers.step_9 || 'algumas';
    if (quitAnswer === 'muitas') severityScore += 3;
    else if (quitAnswer === 'algumas') severityScore += 2;
    else if (quitAnswer === 'raro') severityScore += 1;
    
    // Determinar nível
    let level = "CONTROLADO";
    let levelColor = "text-green-400";
    if (severityScore >= 12) {
      level = "EXTREMO";
      levelColor = "text-red-400";
    } else if (severityScore >= 8) {
      level = "ALTO";
      levelColor = "text-orange-400";
    } else if (severityScore >= 5) {
      level = "MÉDIO";
      levelColor = "text-yellow-400";
    }
    
    // Gerar insights personalizados
    const insights = [];
    const damages = answers.step_5 || ['carreira'];
    const age = answers.step_2 || '21-29';
    const priority = answers.step_6 || 'carreira';
    
    if (damages.length > 0) {
      insights.push(`🎯 Área mais afetada: ${Array.isArray(damages) ? damages.join(' e ') : damages}`);
    }
    
    if (scrollLevel >= 7) {
      insights.push(`📱 Vício digital severo: ${scrollLevel}/10 no scroll`);
    }
    
    if (age.includes('40') || age.includes('50')) {
      insights.push(`⏰ Urgência temporal: cada ano perdido pesa mais`);
    }
    
    if (quitAnswer === 'muitas') {
      insights.push(`🔄 Padrão crônico: histórico de projetos abandonados`);
    }
    
    if (mirrorAnswer === 'sempre') {
      insights.push(`💔 Autoestima comprometida: rejeição da própria imagem`);
    }
    
    if (priority === 'tudo') {
      insights.push(`❌ Falta de foco: quer fazer tudo ao mesmo tempo`);
    }

    return (
      <div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-[#1f3550] to-[#0f1c2b] rounded-2xl p-6 border border-white/10 mb-6"
        >
          <div className="text-sm opacity-90 mb-2">Seu nível de procrastinação:</div>
          <div className={`text-4xl font-black mb-3 ${levelColor}`}>
            {level}
          </div>
          <p className="text-[#C39BD3] mb-4 leading-relaxed">
            {level === "EXTREMO" ? "Você está na beira do abismo. Ou muda, ou afunda." :
             level === "ALTO" ? "Piloto automático comendo tua energia e confiança." :
             level === "MÉDIO" ? "Você tenta, mas se sabota mais do que avança." :
             "Você tem controle, mas pode melhorar ainda mais."}
          </p>
          
          <div className="space-y-2">
            {insights.slice(0, 4).map((insight, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
                className="bg-white/5 rounded-lg p-3 text-sm border border-white/10"
              >
                {insight}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Seção de Aviso */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="space-y-4 mb-6"
        >
          {/* Aviso Principal */}
          <div className="bg-gradient-to-r from-red-600/20 to-red-800/20 rounded-2xl p-6 border border-red-500/30">
            <div className="text-2xl mb-3">💀</div>
            <p className="text-[#FCEEE3] leading-relaxed">
              "Você está preso num ciclo de adiamento que já tá roubando sua energia, destruindo sua autoconfiança e atrasando seus maiores sonhos.
              E se você continuar assim, sua vida não vai só ficar parada… ela vai andar pra trás."
            </p>
          </div>

          {/* Consequências */}
          <div className="bg-gradient-to-r from-gray-700/20 to-gray-900/20 rounded-2xl p-6 border border-gray-500/30">
            <div className="text-2xl mb-3">❌</div>
            <p className="text-[#FCEEE3] font-semibold mb-3">Se nada mudar, daqui a meses você vai:</p>
            <ul className="space-y-2 text-[#C39BD3]">
              <li>• Perder oportunidades que nunca mais voltam.</li>
              <li>• Ver sua carreira e seu dinheiro travados.</li>
              <li>• Se sentir cada vez mais frustrado, pesado e arrependido.</li>
              <li>• Olhar pro espelho e odiar a pessoa que deixou tudo escapar.</li>
            </ul>
          </div>

          {/* Esperança */}
          <div className="bg-gradient-to-r from-green-600/20 to-emerald-800/20 rounded-2xl p-6 border border-green-500/30">
            <div className="text-2xl mb-3">✨</div>
            <p className="text-[#FCEEE3] font-semibold mb-3">Mas há esperança:</p>
            <p className="text-[#FCEEE3] leading-relaxed mb-4">
              ⚡ "Se você agir HOJE, pode reverter esse ciclo em poucas semanas e conquistar foco, disciplina e orgulho real — mesmo que já tenha tentado antes sem sucesso."
            </p>
            <p className="text-[#FCEEE3] leading-relaxed">
              👉 Não importa quantas vezes você fracassou, o plano certo vai virar sua mente e transformar sua vida.
            </p>
          </div>
        </motion.div>

        <button
          className="w-full p-4 bg-[#F25C54] hover:bg-[#ff6f68] rounded-2xl text-white font-bold transition-all duration-300"
          onClick={() => {
            giveXp(step.reward);
            nextStep();
          }}
        >
          Continuar
        </button>
      </div>
    );
  };

  const renderOfferStep = (step: Step) => {
    return (
      <div>
        <div className="mb-6 p-6 bg-gradient-to-r from-[#1f3550] to-[#0f1c2b] rounded-2xl border border-white/10">
          <p className="text-sm text-[#FCEEE3]">✨ Em <strong>5 dias</strong> você sente tração. Em <strong>14 dias</strong>, rotina disciplinada — mesmo se já fracassou antes.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div className="p-4 bg-[#4B2E83] rounded-2xl border border-white/10">
            <p className="text-sm text-[#FCEEE3]">"Perdia cliente. Em 2 semanas fechei mais que em 3 meses."</p>
            <div className="mt-2 text-xs opacity-80">João — vendedor</div>
          </div>
          <div className="p-4 bg-[#1d3a2b] rounded-2xl border border-white/10">
            <p className="text-sm text-[#FCEEE3]">"Travava no celular. Hoje termino o TCC e cumpro rotina."</p>
            <div className="mt-2 text-xs opacity-80">Larissa — estudante</div>
          </div>
          <div className="p-4 bg-[#3b173b] rounded-2xl border border-white/10">
            <p className="text-sm text-[#FCEEE3]">"Não era preguiça; era falta de clareza. Faturei mais."</p>
            <div className="mt-2 text-xs opacity-80">Camila — empreendedora</div>
          </div>
        </div>

        <div className="p-4 bg-gradient-to-r from-[#6a3a38] to-[#3a1f1e] rounded-2xl border border-white/10 mb-6">
          <p className="text-sm text-[#FCEEE3]">A cada hora, dezenas entram. <strong>Bônus Técnica X</strong> limitado. Se voltar amanhã, pode não ter.</p>
        </div>

        <div className="flex items-center justify-between p-6 bg-black/20 rounded-2xl border border-white/10">
          <div>
            <div className="text-sm opacity-90">Plano personalizado vitalício</div>
            <div className="text-3xl font-black text-[#FFCC48]">R$ 37</div>
            <div className="text-xs opacity-80">Acesso imediato + Bônus Técnica X (limitado)</div>
          </div>
          <button
            className="px-6 py-3 bg-[#39FF88] hover:bg-[#2dd477] text-black font-bold rounded-2xl transition-all duration-300"
            onClick={() => {
              playSound('boom-sound');
              giveXp(50);
              alert("Redirecionando para pagamento...");
            }}
          >
            QUERO ESMAGAR A PROCRASTINAÇÃO
          </button>
        </div>
      </div>
    );
  };

  const renderStep = () => {
    const step = steps[currentStep - 1];
    if (!step) return null;

    if (step.type === 'loading') {
      return renderLoadingStep(step);
    } else if (step.type === 'diagnosis') {
      return renderDiagnosisStep(step);
    } else if (step.type === 'offer') {
      return renderOfferStep(step);
    } else if (step.type === 'checkbox') {
      return renderCheckboxStep(step);
    } else {
      return renderRadioStep(step);
    }
  };

  useEffect(() => {
    updateProgress();
  }, [currentStep]);

  const step = steps[currentStep - 1];

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-gradient-to-br from-[#2b1a4e]/70 to-[#4B2E83]/70 backdrop-blur-lg rounded-3xl p-8 border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,.35)]">
        {/* HUD */}
        <div className="flex items-center justify-between mb-6 text-xs">
          <div className="flex gap-3">
            <span className="bg-white/10 px-2 py-1 rounded-xl">XP {xp}/140</span>
            <span className="bg-white/10 px-2 py-1 rounded-xl">Avatar: {step?.avatar}</span>
          </div>
          <div className="flex items-center gap-3 flex-1 mx-4">
            <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
              <div id="progress-fill" className="h-full bg-gradient-to-r from-[#F25C54] to-[#FF3B3B] rounded-full transition-all duration-500"></div>
            </div>
            <span id="progress-percent">0%</span>
          </div>
        </div>

        {/* Content */}
        <h1 className="text-2xl font-black text-white mb-6 text-center">{step?.title}</h1>
        
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>

        {step?.insight && (
          <div className="mt-6 text-center text-xs italic opacity-80 text-[#C39BD3]">
            {step.insight}
          </div>
        )}
      </div>

      {/* Audio elements */}
      <audio id="ping-sound" preload="auto">
        <source src="data:audio/mp3;base64,//uQZAAAAAAAAAAAAAAAAAAAAAAAWGluZwAAAA8AAAACAAACcQAA..." type="audio/mpeg" />
      </audio>
      <audio id="boom-sound" preload="auto">
        <source src="data:audio/mp3;base64,//uQZAAAAAAAAAAAAAAABvb20tYm9vbS0t..." type="audio/mpeg" />
      </audio>
    </div>
  );
}