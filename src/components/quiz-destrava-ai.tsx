import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Step {
  id: number;
  title: string;
  question: string;
  choices: { label: string; value: string }[];
  reward: number;
  avatar: string;
  insight: string;
  type?: string;
  maxSelections?: number;
}

export default function QuizDestravaAi() {
  const [currentStep, setCurrentStep] = useState(1);
  const [xp, setXp] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [showNotification, setShowNotification] = useState(false);
  const [notification, setNotification] = useState('');

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
      id: 7,
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
      id: 8,
      title: "Prejuízo já causado",
      question: "O que a procrastinação já destruiu? (escolha até 2)",
      choices: [
        { label: "Carreira", value: "carreira" },
        { label: "Relacionamentos", value: "relacionamentos" },
        { label: "Saúde", value: "saude" },
        { label: "Dinheiro", value: "dinheiro" },
        { label: "Autoestima", value: "autoestima" },
        { label: "Projetos pessoais", value: "projetos" }
      ],
      reward: 8,
      avatar: "Armadura 6/10.",
      insight: "Prioridade sem ação é só fantasia.",
      type: "checkbox",
      maxSelections: 2
    },
    {
      id: 10,
      title: "Processamento Neural",
      question: "Processamento Neural: analisando suas respostas...",
      choices: [],
      reward: 15,
      avatar: "Armadura 7/10.",
      insight: "A dor de agora é a conta do que adiou.",
      type: "loading"
    },
    {
      id: 11,
      title: "Virada mental: a última chamada",
      question: `🚨 Chega de dicas soltas que não funcionam.

O que você precisa é de um plano brutalmente claro, feito só pra você.

📌 "Pra montar seu plano personalizado, marque os tópicos que mais fazem sentido pra você — e que vão se tornar sua arma contra a procrastinação."

<strong>Selecione todas as opções aplicáveis:</strong>`,
      choices: [
        { label: "🤔 Quebra-cabeças (treinar sua mente pra ficar afiada)", value: "quebra_cabecas" },
        { label: "🧠 Aumento do QI (pensar mais rápido e melhor)", value: "aumento_qi" },
        { label: "🎯 Definição de metas (clareza brutal no que fazer)", value: "definicao_metas" },
        { label: "🧘🏻 Relaxamento (parar de travar por ansiedade)", value: "relaxamento" },
        { label: "🧎🏻 Desintoxicação de dopamina (libertar-se do vício do celular)", value: "desintoxicacao_dopamina" },
        { label: "🌐 Rede (construir conexões de alto nível)", value: "rede" },
        { label: "💡 Melhorando a memória (lembrar do que importa, não do lixo)", value: "melhorar_memoria" },
        { label: "💭 Análise de sonhos (entender o que sua mente tá gritando)", value: "analise_sonhos" },
        { label: "🧩 Lógica (resolver problemas sem enrolar)", value: "logica" },
        { label: "⌛ Gestão de tempo (finalmente dominar suas horas)", value: "gestao_tempo" },
        { label: "💖 Autocuidado (cuidar de você antes que o mundo te destrua)", value: "autocuidado" }
      ],
      reward: 5,
      avatar: "Armadura psíquica ativando (nível 5).",
      insight: "Clareza sem ação é autoengano.",
      type: "checkbox",
      maxSelections: 11
    },
    {
      id: 12,
      title: "Diagnóstico Final: a verdade nua",
      question: "Diagnóstico Final",
      choices: [],
      reward: 10,
      avatar: "Armadura 7/10.",
      insight: "A dor de agora é a conta do que adiou.",
      type: "diagnosis"
    },
    {
      id: 13,
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
      id: 14,
      title: "Oferta Final",
      question: "Oferta Final",
      choices: [],
      reward: 5,
      avatar: "10/10, armadura completa.",
      insight: "Ou você ri da procrastinação hoje, ou ela ri de você amanhã.",
      type: "offer"
    }
  ];

  const playSound = (type: 'ping' | 'boom') => {
    try {
      const audio = new Audio();
      if (type === 'ping') {
        audio.src = "data:audio/mp3;base64,//uQZAAAAAAAAAAAAAAAAAAAAAAAWGluZwAAAA8AAAACAAACcQAA...";
      } else {
        audio.src = "data:audio/mp3;base64,//uQZAAAAAAAAAAAAAAABvb20tYm9vbS0t...";
      }
      audio.volume = 0.25;
      audio.play().catch(() => {});
    } catch (e) {}
  };

  const giveXp = (amount: number) => {
    setXp(prev => prev + amount);
    setNotification(`+${amount} XP`);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 2000);
    
    if ((window as any).__ga) {
      (window as any).__ga.gainXp(amount, `step_${currentStep}`);
    }
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleChoice = (value: string) => {
    playSound('ping');
    const step = steps[currentStep - 1];
    setAnswers(prev => ({ ...prev, [`step_${step.id}`]: value }));
    giveXp(step.reward);
    nextStep();
  };

  const handleCheckboxStep = (selectedValues: string[]) => {
    const step = steps[currentStep - 1];
    setAnswers(prev => ({ ...prev, [`step_${step.id}`]: selectedValues }));
    giveXp(step.reward);
    nextStep();
  };

  const renderStep = () => {
    const step = steps[currentStep - 1];
    if (!step) return null;

    if (step.type === 'loading') {
      return <LoadingStep step={step} onContinue={nextStep} />;
    }

    if (step.type === 'diagnosis') {
      return <DiagnosisStep step={step} answers={answers} onContinue={nextStep} />;
    }

    if (step.type === 'offer') {
      return <OfferStep step={step} />;
    }

    if (step.type === 'checkbox') {
      return <CheckboxStep step={step} onContinue={handleCheckboxStep} />;
    }

    return <RadioStep step={step} onChoice={handleChoice} />;
  };

  const getProgress = () => {
    const progressMap: Record<number, number> = {
      1: 8, 2: 16, 3: 24, 7: 32, 8: 40, 10: 48, 11: 56, 12: 64, 13: 72, 14: 80
    };
    return progressMap[currentStep] || 0;
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* HUD */}
        <div className="flex items-center justify-between mb-6 text-sm">
          <div className="flex gap-3">
            <span className="bg-white/10 px-3 py-1 rounded-full">XP {xp}/140</span>
            <span className="bg-white/10 px-3 py-1 rounded-full">
              Avatar: {steps[currentStep - 1]?.avatar}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden w-32">
              <div 
                className="h-full bg-gradient-to-r from-red-500 to-red-600 rounded-full transition-all duration-500"
                style={{ width: `${getProgress()}%` }}
              />
            </div>
            <span>{getProgress()}%</span>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-black/20 backdrop-blur-md rounded-3xl p-8 ring-1 ring-white/10">
          <h1 className="text-2xl font-bold text-center mb-6">
            {steps[currentStep - 1]?.title}
          </h1>
          
          {renderStep()}
          
          <div className="mt-6 text-center text-sm opacity-80 italic">
            {steps[currentStep - 1]?.insight}
          </div>
        </div>

        {/* XP Notification */}
        <AnimatePresence>
          {showNotification && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.8 }}
              className="fixed top-4 right-4 bg-yellow-500 text-yellow-900 px-4 py-2 rounded-xl font-bold shadow-lg"
            >
              {notification}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function RadioStep({ step, onChoice }: { step: Step; onChoice: (value: string) => void }) {
  return (
    <>
      <p className="text-lg mb-6 text-center">{step.question}</p>
      <div className="space-y-3">
        {step.choices.map((choice, index) => (
          <button
            key={index}
            onClick={() => onChoice(choice.value)}
            className="w-full p-4 text-left bg-gradient-to-r from-purple-600/20 to-blue-600/20 hover:from-purple-600/30 hover:to-blue-600/30 rounded-xl ring-1 ring-white/10 transition-all duration-300 hover:scale-[1.02]"
          >
            {choice.label}
          </button>
        ))}
      </div>
    </>
  );
}

function CheckboxStep({ step, onContinue }: { step: Step; onContinue: (values: string[]) => void }) {
  const [selected, setSelected] = useState<string[]>([]);

  const toggleSelection = (value: string) => {
    setSelected(prev => {
      if (prev.includes(value)) {
        return prev.filter(v => v !== value);
      } else if (prev.length < (step.maxSelections || Infinity)) {
        return [...prev, value];
      }
      return prev;
    });
  };

  return (
    <>
      <div className="text-lg mb-6" dangerouslySetInnerHTML={{ __html: step.question }} />
      <div className="space-y-3 mb-6">
        {step.choices.map((choice, index) => (
          <button
            key={index}
            onClick={() => toggleSelection(choice.value)}
            className={`w-full p-4 text-left rounded-xl ring-1 ring-white/10 transition-all duration-300 hover:scale-[1.02] ${
              selected.includes(choice.value)
                ? 'bg-gradient-to-r from-red-600/30 to-red-700/30'
                : 'bg-gradient-to-r from-purple-600/20 to-blue-600/20 hover:from-purple-600/30 hover:to-blue-600/30'
            }`}
          >
            {choice.label}
          </button>
        ))}
      </div>
      <button
        onClick={() => onContinue(selected)}
        className="w-full p-4 bg-red-600 hover:bg-red-700 rounded-xl font-bold transition-colors"
      >
        Continuar ({selected.length} selecionados)
      </button>
    </>
  );
}

function LoadingStep({ step, onContinue }: { step: Step; onContinue: () => void }) {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [agree1, setAgree1] = useState(false);
  const [agree2, setAgree2] = useState(false);

  const handleContinue = () => {
    if (email && agree1 && agree2) {
      onContinue();
    } else {
      alert('Por favor, preencha todos os campos obrigatórios.');
    }
  };

  return (
    <>
      <div className="text-center mb-6">
        <div className="w-10 h-10 border-3 border-white/20 border-t-red-500 rounded-full animate-spin mx-auto mb-4"></div>
        <p>Processamento Neural: analisando suas respostas...</p>
        <p className="mt-4 text-sm">Na última semana, <strong>1.024 pessoas</strong> começaram exatamente como você… e já sentiram mudança.</p>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center gap-3 text-sm">
          <input 
            type="checkbox" 
            id="agree1" 
            checked={agree1}
            onChange={(e) => setAgree1(e.target.checked)}
            className="w-4 h-4"
          />
          <label htmlFor="agree1">Concordo em aplicar <strong>5–15 min/dia</strong> do plano.</label>
        </div>
        
        <div className="flex items-center gap-3 text-sm">
          <input 
            type="checkbox" 
            id="agree2" 
            checked={agree2}
            onChange={(e) => setAgree2(e.target.checked)}
            className="w-4 h-4"
          />
          <label htmlFor="agree2">Quero receber apenas o <strong>essencial</strong>.</label>
        </div>
        
        <input
          type="email"
          placeholder="Seu e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 bg-white/10 rounded-xl ring-1 ring-white/20 placeholder-white/60"
          required
        />
        
        <input
          type="tel"
          placeholder="Seu WhatsApp"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full p-3 bg-white/10 rounded-xl ring-1 ring-white/20 placeholder-white/60"
        />
        
        <button
          onClick={handleContinue}
          className="w-full p-4 bg-red-600 hover:bg-red-700 rounded-xl font-bold transition-colors"
        >
          Continuar
        </button>
      </div>
    </>
  );
}

function DiagnosisStep({ step, answers, onContinue }: { step: Step; answers: Record<string, any>; onContinue: () => void }) {
  const scrollLevel = parseInt(answers.step_3?.split('-')[1]) || 5;
  const damages = answers.step_8 || ['carreira'];
  
  let level = "MÉDIO";
  if (scrollLevel >= 8) level = "EXTREMO";
  else if (scrollLevel >= 5) level = "ALTO";

  const bullets = [
    `Área mais afetada: ${damages[0]}${damages[1] ? ` e ${damages[1]}` : ''}.`,
    `Foco principal: desenvolvimento pessoal.`,
    `Gatilho de fuga: ${scrollLevel > 6 ? 'celular' : 'adiamento/ansiedade'}.`,
    `Quebra de foco: pico no período atual.`
  ];

  return (
    <>
      <div className="bg-gradient-to-br from-red-900/30 to-purple-900/30 rounded-2xl p-6 ring-1 ring-white/10 mb-6">
        <div className="text-sm opacity-90 mb-2">Seu nível de procrastinação:</div>
        <div className={`text-4xl font-black mb-4 ${
          level === "EXTREMO" ? "text-red-500" :
          level === "ALTO" ? "text-orange-500" :
          "text-yellow-500"
        }`}>
          {level}
        </div>
        <p className="mb-4 text-purple-200">
          {level === "EXTREMO" ? "Você está na beira do abismo. Ou muda, ou afunda." :
           level === "ALTO" ? "Piloto automático comendo tua energia e confiança." :
           "Você tenta, mas se sabota mais do que avança."}
        </p>
        <ul className="space-y-2 text-sm">
          {bullets.map((bullet, index) => (
            <li key={index}>• {bullet}</li>
          ))}
        </ul>
      </div>
      
      <button
        onClick={onContinue}
        className="w-full p-4 bg-red-600 hover:bg-red-700 rounded-xl font-bold transition-colors"
      >
        Continuar
      </button>
    </>
  );
}

function OfferStep({ step }: { step: Step }) {
  const handlePurchase = () => {
    alert("Redirecionando para pagamento...");
  };

  return (
    <>
      <div className="space-y-6">
        <div className="bg-gradient-to-br from-blue-900/30 to-teal-900/30 rounded-2xl p-6 ring-1 ring-white/10">
          <p className="text-sm">✨ Em <strong>5 dias</strong> você sente tração. Em <strong>14 dias</strong>, rotina disciplinada — mesmo se já fracassou antes.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-purple-600/20 rounded-2xl p-4 ring-1 ring-white/10">
            <p className="text-sm">"Perdia cliente. Em 2 semanas fechei mais que em 3 meses."</p>
            <div className="text-xs opacity-80 mt-2">João — vendedor</div>
          </div>
          <div className="bg-green-600/20 rounded-2xl p-4 ring-1 ring-white/10">
            <p className="text-sm">"Travava no celular. Hoje termino o TCC e cumpro rotina."</p>
            <div className="text-xs opacity-80 mt-2">Larissa — estudante</div>
          </div>
          <div className="bg-pink-600/20 rounded-2xl p-4 ring-1 ring-white/10">
            <p className="text-sm">"Não era preguiça; era falta de clareza. Faturei mais."</p>
            <div className="text-xs opacity-80 mt-2">Camila — empreendedora</div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-red-900/30 to-orange-900/30 rounded-2xl p-4 ring-1 ring-white/10">
          <p className="text-sm">A cada hora, dezenas entram. <strong>Bônus Técnica X</strong> limitado. Se voltar amanhã, pode não ter.</p>
        </div>

        <div className="flex items-center justify-between bg-black/20 rounded-2xl p-6 ring-1 ring-white/10">
          <div>
            <div className="text-sm opacity-90">Plano personalizado vitalício</div>
            <div className="text-3xl font-black text-yellow-400">R$ 37</div>
            <div className="text-xs opacity-80">Acesso imediato + Bônus Técnica X (limitado)</div>
          </div>
          <button
            onClick={handlePurchase}
            className="bg-green-500 hover:bg-green-600 text-black font-bold px-6 py-3 rounded-xl transition-colors"
          >
            QUERO ESMAGAR A PROCRASTINAÇÃO
          </button>
        </div>
      </div>
    </>
  );
}