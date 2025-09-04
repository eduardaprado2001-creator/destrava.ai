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

const QuizDestravaAi: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [xp, setXp] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});

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
    return progress;
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const renderRadioStep = (step: Step) => {
    return (
      <div className="space-y-4">
        <p className="text-lg text-[#C39BD3] leading-relaxed">{step.question}</p>
        <div className="space-y-3">
          {step.choices?.map((choice, index) => (
            <motion.button
              key={index}
              className="w-full p-4 text-left rounded-2xl bg-gradient-to-r from-[#5e348f] to-[#3d225e] text-[#FCEEE3] font-medium hover:from-[#6a3a38] hover:to-[#3a1f1e] transition-all duration-300 border border-white/10"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
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
      <div className="space-y-4">
        <p className="text-lg text-[#C39BD3] leading-relaxed">{step.question}</p>
        <div className="space-y-3">
          {step.choices?.map((choice, index) => (
            <motion.button
              key={index}
              className={`w-full p-4 text-left rounded-2xl font-medium transition-all duration-300 border border-white/10 ${
                selected.includes(choice.value)
                  ? 'bg-gradient-to-r from-[#6a3a38] to-[#3a1f1e] text-white'
                  : 'bg-gradient-to-r from-[#5e348f] to-[#3d225e] text-[#FCEEE3] hover:from-[#6a3a38] hover:to-[#3a1f1e]'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                if (selected.includes(choice.value)) {
                  setSelected(prev => prev.filter(v => v !== choice.value));
                } else if (selected.length < (step.maxSelections || 1)) {
                  setSelected(prev => [...prev, choice.value]);
                }
              }}
            >
              {choice.label}
            </motion.button>
          ))}
        </div>
        
        {selected.length > 0 && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full p-4 rounded-2xl bg-[#F25C54] hover:bg-[#ff6f68] text-white font-bold transition-all duration-300"
            onClick={() => {
              setAnswers(prev => ({ ...prev, [`step_${step.id}`]: selected }));
              giveXp(step.reward);
              setTimeout(nextStep, 500);
            }}
          >
            Continuar
          </motion.button>
        )}
      </div>
    );
  };

  const renderLoadingStep = (step: Step) => {
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [agree1, setAgree1] = useState(false);
    const [agree2, setAgree2] = useState(false);

    return (
      <div className="space-y-6">
        <div className="text-center">
          <div className="w-12 h-12 border-3 border-[#F25C54] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg text-[#C39BD3] mb-4">Processamento Neural: analisando suas respostas...</p>
          <p className="text-sm text-white/80">Na última semana, <strong>1.024 pessoas</strong> começaram exatamente como você… e já sentiram mudança.</p>
        </div>

        <div className="space-y-4">
          <label className="flex items-center gap-3 text-sm text-[#FCEEE3]">
            <input
              type="checkbox"
              checked={agree1}
              onChange={(e) => setAgree1(e.target.checked)}
              className="w-4 h-4 rounded border-white/20 bg-white/10"
            />
            <span>Concordo em aplicar <strong>5–15 min/dia</strong> do plano.</span>
          </label>

          <label className="flex items-center gap-3 text-sm text-[#FCEEE3]">
            <input
              type="checkbox"
              checked={agree2}
              onChange={(e) => setAgree2(e.target.checked)}
              className="w-4 h-4 rounded border-white/20 bg-white/10"
            />
            <span>Quero receber apenas o <strong>essencial</strong>.</span>
          </label>

          <input
            type="email"
            placeholder="Seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-[#FCEEE3] placeholder-white/50"
            required
          />

          <input
            type="tel"
            placeholder="Seu WhatsApp"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-[#FCEEE3] placeholder-white/50"
          />

          <motion.button
            className="w-full p-4 rounded-2xl bg-[#F25C54] hover:bg-[#ff6f68] text-white font-bold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!email || !agree1 || !agree2}
            onClick={() => {
              setAnswers(prev => ({ ...prev, email, phone }));
              giveXp(step.reward);
              setTimeout(nextStep, 1000);
            }}
            whileHover={{ scale: !email || !agree1 || !agree2 ? 1 : 1.02 }}
            whileTap={{ scale: !email || !agree1 || !agree2 ? 1 : 0.98 }}
          >
            Continuar
          </motion.button>
        </div>
      </div>
    );
  };

  const renderDiagnosisStep = (step: Step) => {
    const scrollLevel = parseInt(answers.step_3?.split('-')[1]) || 5;
    const delayFreq = answers.step_3 || '';
    
    let level = "MÉDIO";
    if (scrollLevel >= 8 || delayFreq.includes('9-10')) level = "EXTREMO";
    else if (scrollLevel >= 5) level = "ALTO";

    const damages = answers.step_5 || ['carreira'];
    const bullets = [
      `Área mais afetada: ${damages[0]}${damages[1] ? ` e ${damages[1]}` : ''}.`,
      `Gatilho de fuga: ${scrollLevel > 6 ? 'celular' : 'adiamento/ansiedade'}.`,
      `Quebra de foco: pico no período atual.`
    ];

    return (
      <div className="space-y-6">
        {/* Diagnóstico Principal */}
        <div className="rounded-2xl bg-gradient-to-br from-[#1f3550] to-[#0f1c2b] p-6 border border-white/10">
          <div className="text-sm opacity-90 mb-2">Seu nível de procrastinação:</div>
          <div className={`text-4xl font-black mb-3 ${
            level === "EXTREMO" ? "text-red-500" :
            level === "ALTO" ? "text-orange-500" :
            "text-yellow-500"
          }`}>
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

        {/* Ciclo de Adiamento */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-2xl bg-gradient-to-br from-gray-700 to-gray-800 p-6 border border-white/10"
        >
          <div className="text-center">
            <div className="text-2xl mb-3">💀</div>
            <p className="text-white/90 italic leading-relaxed">
              "Você está preso num ciclo de adiamento que já tá roubando sua energia, destruindo sua autoconfiança e atrasando seus maiores sonhos. E se você continuar assim, sua vida não vai só ficar parada… ela vai andar pra trás."
            </p>
          </div>
        </motion.div>

        <div className="border-t border-white/20 my-6"></div>

        {/* Consequências Negativas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="rounded-2xl bg-gradient-to-br from-red-900/50 to-red-800/50 p-6 border border-red-500/30"
        >
          <h3 className="text-xl font-bold text-red-400 mb-4 flex items-center gap-2">
            <span>❌</span>
            Se nada mudar, daqui a meses você vai:
          </h3>
          <ul className="space-y-3 text-white/90">
            <li className="flex items-start gap-3">
              <span className="text-red-400 mt-1">•</span>
              <span>Perder oportunidades que nunca mais voltam.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-red-400 mt-1">•</span>
              <span>Ver sua carreira e seu dinheiro travados.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-red-400 mt-1">•</span>
              <span>Se sentir cada vez mais frustrado, pesado e arrependido.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-red-400 mt-1">•</span>
              <span>Olhar pro espelho e odiar a pessoa que deixou tudo escapar.</span>
            </li>
          </ul>
        </motion.div>

        <div className="border-t border-white/20 my-6"></div>

        {/* Mensagem de Esperança */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="rounded-2xl bg-gradient-to-br from-emerald-900/50 to-emerald-800/50 p-6 border border-emerald-500/30"
        >
          <h3 className="text-xl font-bold text-emerald-400 mb-4 flex items-center gap-2">
            <span>✨</span>
            Mas há esperança:
          </h3>
          <div className="space-y-4 text-white/90">
            <p className="flex items-start gap-3">
              <span className="text-emerald-400 mt-1">⚡</span>
              <span className="italic">
                "Se você agir HOJE, pode reverter esse ciclo em poucas semanas e conquistar foco, disciplina e orgulho real — mesmo que já tenha tentado antes sem sucesso."
              </span>
            </p>
            <p className="flex items-start gap-3">
              <span className="text-emerald-400 mt-1">👉</span>
              <span>
                Não importa quantas vezes você fracassou, o plano certo vai virar sua mente e transformar sua vida.
              </span>
            </p>
          </div>
        </motion.div>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="w-full p-4 rounded-2xl bg-[#F25C54] hover:bg-[#ff6f68] text-white font-bold transition-all duration-300 mt-6"
          onClick={() => {
            giveXp(step.reward);
            setTimeout(nextStep, 500);
          }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Continuar
        </motion.button>
      </div>
    );
  };

  const renderOfferStep = (step: Step) => {
    return (
      <div className="space-y-6">
        <div className="rounded-2xl bg-gradient-to-br from-[#1f3550] to-[#0f1c2b] p-6 border border-white/10">
          <p className="text-sm text-white/90">
            ✨ Em <strong>5 dias</strong> você sente tração. Em <strong>14 dias</strong>, rotina disciplinada — mesmo se já fracassou antes.
          </p>
        </div>

        <div className="grid gap-4">
          <div className="p-4 rounded-xl bg-[#4B2E83] border border-white/10">
            <p className="text-sm text-white/90">"Perdia cliente. Em 2 semanas fechei mais que em 3 meses."</p>
            <div className="text-xs text-white/60 mt-2">João — vendedor</div>
          </div>
          <div className="p-4 rounded-xl bg-[#1d3a2b] border border-white/10">
            <p className="text-sm text-white/90">"Travava no celular. Hoje termino o TCC e cumpro rotina."</p>
            <div className="text-xs text-white/60 mt-2">Larissa — estudante</div>
          </div>
          <div className="p-4 rounded-xl bg-[#3b173b] border border-white/10">
            <p className="text-sm text-white/90">"Não era preguiça; era falta de clareza. Faturei mais."</p>
            <div className="text-xs text-white/60 mt-2">Camila — empreendedora</div>
          </div>
        </div>

        <div className="rounded-2xl bg-gradient-to-br from-[#6a3a38] to-[#3a1f1e] p-4 border border-white/10">
          <p className="text-sm text-white/90">
            A cada hora, dezenas entram. <strong>Bônus Técnica X</strong> limitado. Se voltar amanhã, pode não ter.
          </p>
        </div>

        <div className="flex items-center justify-between p-6 rounded-2xl bg-black/20 border border-white/10">
          <div>
            <div className="text-sm text-white/90">Plano personalizado vitalício</div>
            <div className="text-3xl font-black text-[#FFCC48]">R$ 37</div>
            <div className="text-xs text-white/60">Acesso imediato + Bônus Técnica X (limitado)</div>
          </div>
          <motion.button
            className="px-6 py-3 rounded-xl bg-[#39FF88] hover:bg-[#2dd477] text-black font-bold transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              giveXp(50);
              alert("Redirecionando para pagamento...");
            }}
          >
            QUERO ESMAGAR A PROCRASTINAÇÃO
          </motion.button>
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

  const step = steps[currentStep - 1];
  const progress = updateProgress();

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* HUD */}
        <div className="flex items-center justify-between mb-6 text-xs text-[#FCEEE3]">
          <div className="flex gap-3">
            <span className="px-3 py-1 rounded-full bg-white/10">XP {xp}/140</span>
            <span className="px-3 py-1 rounded-full bg-white/10">Avatar: {step?.avatar}</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-32 h-2 bg-white/10 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-[#F25C54] to-[#FF3B3B] rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span>{progress}%</span>
          </div>
        </div>

        {/* Main Content */}
        <div className="rounded-3xl bg-gradient-to-br from-[#2b1a4e]/70 to-[#4B2E83]/70 backdrop-blur-lg p-8 border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,.35)]">
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
            <div className="mt-6 text-center text-xs text-white/60 italic">
              {step.insight}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizDestravaAi;