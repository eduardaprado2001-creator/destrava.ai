"use client"

import { useMemo, useRef, useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Check, ChevronRight, Loader2, AlarmClock, Timer, Shield, Sparkles, Zap, AlertTriangle, Trophy, Clock, Target } from "lucide-react"

/**
 * QuizDestravaAi – fluxo gamificado em 13 telas
 * - Mantém as MESMAS cores e vibe do componente LandingDestravaAi
 * - HUD com progresso/XP/Avatar
 * - SFX leves com <audio> (placeholders base64 prontos p/ substituição)
 * - Animações consistentes (framer-motion)
 * - Coleta e-mail/telefone no loading (P8)
 * - Diagnóstico dinâmico (P11)
 * - Oferta final única (P13) com depoimentos (curtos) e CTA
 *
 * Como usar: <QuizDestravaAi /> em uma seção #quiz da sua LandingDestravaAi
 */

// === Paleta (idêntica / derivada do seu código) ===
const COLORS = {
  bgGradFrom: "#2b1a4e",
  bgGradVia: "#3c2569",
  bgGradTo: "#4B2E83",
  coral: "#F25C54", // acento róseo do seu header/logo
  dirty: "#FCEEE3",
  lilac: "#C39BD3",
  red: "#FF3B3B", // headline impacto
  orange: "#FF6A00", // CTA laranja radioativo
  neon: "#39FF88", // neon green sutil (ajuste se tiver var css)
}

// === SFX (corretos caminhos para arquivos MP3) ===
const SFX = {
  // Som para clique ou seleção (som suave e leve)
  click: "/Ping sound effect.mp3",
  
  // Som para erro ou falha (som grave ou alerta)
  error: "/Efeito sonoro Atenção.mp3",
  
  // Som de avanço de fase (som leve e positivo)
  advance: "/Ping sound effect.mp3", // Usando ping mais suave para avanço
  
  // Som de carregamento ou processamento
  processing: "/Loading Sound Effect (Royalty free Sound)#shorts.mp3",
  
  // Som de vitória (som triunfante e intenso)
  victory: "/Efeito sonoro (Vitória).mp3",
  
  // Som adicional para ações importantes
  impact: "/Boom Swoosh - Efeito Sonoro Gratuito.mp3",
}

// Tipos de pergunta
type Choice = { label: string; value: string; insight?: string }

type StepBase = {
  id: number
  title?: string
  hudAvatar: string // descrição de estado do avatar
  progress: number // 0..100
  xpReward: number
  insight?: string
}

type StepQuestion = StepBase & {
  kind: "radio" | "checkbox" | "slider" | "loading" | "diagnosis" | "commitment" | "offer"
  question?: string
  choices?: Choice[]
  maxSelections?: number
}

// Estado do jogador
type Answers = {
  age?: string
  scrollLevel?: number
  delayFreq?: string
  mirrorPain?: string
  damages?: string[]
  priority?: string
  firstImpact?: string
  vision12?: string
  quitPattern?: string
  commitment?: string
  email?: string
  phone?: string
}

export default function QuizDestravaAi() {
  // Estado
  const [step, setStep] = useState<number>(1)
  const [xp, setXp] = useState<number>(0)
  const [answers, setAnswers] = useState<Answers>({})
  const [selectedCheckbox, setSelectedCheckbox] = useState<string[]>([])
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [sliderValue, setSliderValue] = useState(5)
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [agree1, setAgree1] = useState(false)
  const [agree2, setAgree2] = useState(false)

  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    audioRef.current = new Audio()
  }, [])

  const play = (src?: string) => {
    if (!src) return
    try {
      const a = new Audio(src)
      a.volume = 0.3 // Aumentando um pouco o volume para melhor experiência
      a.play().catch(() => {})
    } catch {}
  }

  const giveXp = (amount: number, reason = "") => {
    setXp((x) => {
      const v = x + amount
      ;(window as any).__ga?.gainXp?.(amount, reason)
      return v
    })
  }

  const next = (reward = 0, reason = "") => {
    if (reward) giveXp(reward, reason)
    // Som de avanço de fase (leve e positivo)
    play(SFX.advance)
    setStep((s) => Math.min(s + 1, 13))
    play(SFX.levelUp)
  }

  const progress = useMemo(() => {
    // 13 telas → 0..100
    const map: Record<number, number> = {
      1: 8,
      2: 16,
      3: 24,
      4: 32,
      5: 40,
      6: 48,
      7: 56,
      8: 64,
      9: 72,
      10: 80,
      11: 88,
      12: 96,
      13: 100,
    }
    return map[step] || 0
  }, [step])

  // === Definição das Páginas (13) ===
  const steps: StepQuestion[] = useMemo(
    () => [
      // P1 – Estalo brutal (CTA start)
      {
        id: 1,
        kind: "radio",
        title: "",
        hudAvatar: "Sombra, olhos cansados.",
        progress: 8,
        xpReward: 1,
        question: "Está na hora de encarar a verdade: sua vida está estagnada, e a procrastinação está dominando. Você vai continuar na zona de conforto ou tomar a decisão de mudar sua vida?\n\nAgora é a hora de agir.",
        choices: [
          { label: "COMEÇAR O DIAGNÓSTICO", value: "start" },
        ],
        insight: "Quem foge da verdade, casa com a mentira.",
      },
      // P2 – Idade
      {
        id: 2,
        kind: "radio",
        title: "Sua idade diz muito sobre o quanto a procrastinação já vem roubando da sua vida",
        hudAvatar: "Foco leve nos olhos.",
        progress: 16,
        xpReward: 2,
        question: "Quantos anos você tem?",
        choices: [
          { label: "Menos de 20 — Ainda dá tempo de virar tudo.", value: "<20" },
          { label: "21 a 29 — Agora ou perde os melhores anos.", value: "21-29" },
          { label: "30 a 39 — Ou muda, ou começa a enterrar sonhos.", value: "30-39" },
          { label: "40 a 49 — É hoje ou nunca.", value: "40-49" },
          { label: "50+ — Procrastinar agora é suicídio de futuro.", value: "50+" },
        ],
        insight: "Cada década sem ação é um caixão pro teu potencial.",
      },
      // P3 – Scroll + Adiamento (combo)
      {
        id: 3,
        kind: "slider",
        title: "Prisão Digital",
        hudAvatar: "Pescoço erguendo.",
        progress: 24,
        xpReward: 6,
        question: "Quanto o scroll (ato de rolar a tela) te destrói hoje? (0 = nada, 10 = quase todo dia me arregaça)",
      },
      // P4 – Reflexo
      {
        id: 4,
        kind: "radio",
        title: "Reflexo do fracasso",
        hudAvatar: "Reflexo distorcido ao fundo.",
        progress: 32,
        xpReward: 4,
        question: "No espelho, você tá matando sua melhor versão?",
        choices: [
          { label: "Sempre", value: "sempre" },
          { label: "Muitas vezes", value: "muitas" },
          { label: "Às vezes", value: "asvezes" },
        ],
        insight: "O espelho não mente: ou age, ou apodrece.",
      },
      // P5 – Prejuízo (multi)
      {
        id: 5,
        kind: "checkbox",
        title: "Prejuízo já causado",
        hudAvatar: "Fendas de luz no peito.",
        progress: 40,
        xpReward: 10, // até +10 (limite 2)
        question: "O que a procrastinação já destruiu? (máx 2)",
        choices: [
          { label: "Carreira", value: "carreira" },
          { label: "Dinheiro", value: "dinheiro" },
          { label: "Relacionamentos", value: "relacionamentos" },
          { label: "Saúde", value: "saude" },
          { label: "Confiança", value: "confianca" },
        ],
        maxSelections: 2,
        insight: "Cada área fodida é um grito do teu eu que desistiu.",
      },
      // P6 – Prioridade & Área
      {
        id: 6,
        kind: "radio",
        title: "Foco total agora",
        hudAvatar: "Postura firme.",
        progress: 48,
        xpReward: 4,
        question: "Se o foco total viesse HOJE, qual prioridade #1?",
        choices: [
          { label: "Carreira", value: "carreira" },
          { label: "Dinheiro", value: "dinheiro" },
          { label: "Saúde", value: "saude" },
          { label: "Projetos pessoais", value: "projetos" },
          { label: "Relacionamentos", value: "relacionamentos" },
          { label: "Tudo de uma vez", value: "tudo" },
        ],
        insight: "A prioridade que escolhe define a vida que constrói.",
      },
      // P7 – 12 meses
      {
        id: 7,
        kind: "radio",
        title: "Sua vida em 12 meses",
        hudAvatar: "Luz no olhar.",
        progress: 56,
        xpReward: 6,
        question: "Daqui a 12 meses, como você quer se enxergar?",
        choices: [
          { label: "Resultados reais, projetos do papel.", value: "resultados" },
          { label: "Disciplina, confiança e orgulho.", value: "disciplina" },
          { label: "Rotina produtiva no controle.", value: "rotina" },
        ],
        insight: "A vida que quer não chega — é construída.",
      },
      // P8 – Loading + social + coleta
      {
        id: 8,
        kind: "loading",
        title: "Processamento Neural",
        hudAvatar: "Olhos fechados, download de consciência.",
        progress: 64,
        xpReward: 5,
        insight: "Quem assume o compromisso, colhe o resultado.",
      },
      // P9 – Futuro sem ação + pergunta extra
      {
        id: 9,
        kind: "radio",
        title: "O futuro sem ação",
        hudAvatar: "Rosto meio luz/meio sombra.",
        progress: 72,
        xpReward: 5,
        question: "Quantas vezes você começou com energia e largou no meio?",
        choices: [
          { label: "Muitas (padrão)", value: "muitas" },
          { label: "Algumas (dói)", value: "algumas" },
          { label: "Raramente", value: "raro" },
          { label: "Nunca (😈)", value: "nunca" },
        ],
        insight: "Cada desistência é uma mini‑morte.",
      },
      // P10 – Virada + CTA diagnóstico
      {
        id: 10,
        kind: "radio",
        title: "Virada mental: a última chamada",
        hudAvatar: "Armadura psíquica ativando (nível 5).",
        progress: 80,
        xpReward: 5,
        question:
          "Ou você controla a mente, ou a procrastinação te controla. Quer ver seu diagnóstico personalizado agora?",
        choices: [{ label: "VER MEU DIAGNÓSTICO PERSONALIZADO", value: "cta" }],
        insight: "Clareza sem ação é autoengano.",
      },
      // P11 – Diagnóstico dinâmico
      {
        id: 11,
        kind: "diagnosis",
        title: "Diagnóstico Final: a verdade nua",
        hudAvatar: "Armadura 7/10.",
        progress: 88,
        xpReward: 10,
        insight: "A dor de agora é a conta do que adiou.",
      },
      // P12 – Compromisso
      {
        id: 12,
        kind: "commitment",
        title: "Compromisso de tempo diário",
        hudAvatar: "9/10, olhos em brasa.",
        progress: 96,
        xpReward: 9,
        question: "Quanto tempo por dia você vai investir para sair do ciclo?",
        choices: [
          { label: "5 min/dia — Começar agora", value: "5" },
          { label: "10 min/dia — Pronto pra mudar", value: "10" },
          { label: "15 min/dia — Compromisso de verdade", value: "15" },
          { label: "20+ min/dia — Vou dar tudo", value: "20+" },
        ],
        insight: "O futuro pune quem hesita.",
      },
      // P13 – Oferta final única
      {
        id: 13,
        kind: "offer",
        title: "Oferta Final",
        hudAvatar: "10/10, armadura completa.",
        progress: 100,
        xpReward: 5,
        insight: "Ou você ri da procrastinação hoje, ou ela ri de você amanhã.",
      },
    ],
    []
  )

  // === Render Helpers ===
  const Container: React.FC<{ children: any }> = ({ children }) => (
    <div
      className="relative mx-auto max-w-3xl w-full"
      style={{
        color: COLORS.dirty,
      }}
    >
      <div className="rounded-3xl p-6 md:p-8 bg-gradient-to-br from-[#2b1a4e]/70 via-[#3c2569]/70 to-[#4B2E83]/70 ring-1 ring-white/10 shadow-[0_20px_60px_rgba(0,0,0,.35)] backdrop-blur-sm">
        {children}
      </div>
    </div>
  )

  const Hud = () => (
    <div className="mb-6 flex items-center justify-between text-xs">
      <div className="flex items-center gap-3">
        <motion.span 
          className="px-3 py-1 rounded-full bg-white/10 font-medium"
          key={xp}
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Zap className="inline size-3 mr-1 text-yellow-400" />
          XP {xp}/140
        </motion.span>
        <span className="px-3 py-1 rounded-full bg-white/10 text-[10px] max-w-[200px] truncate">
          Avatar: {steps.find((s) => s.id === step)?.hudAvatar}
        </span>
      </div>
      <div className="flex-1 mx-4 h-2 rounded-full bg-white/10 overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-[#F25C54] to-[#FF3B3B]"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </div>
      <span className="opacity-80 font-medium">{Math.round(progress)}%</span>
    </div>
  )

  // === Componentes de página ===
  const PageRadio: React.FC<{ stepData: StepQuestion } & { onSelect: (v: string) => void }> = ({ stepData, onSelect }) => (
    <Container>
      <Hud />
      {stepData.title && (
        <motion.h3 
          className="text-xl md:text-2xl font-extrabold tracking-tight text-white mb-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {stepData.title}
        </motion.h3>
      )}
      {stepData.question && (
        <motion.p 
          className="text-sm text-[#C39BD3] mb-6 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {stepData.question}
        </motion.p>
      )}

      <motion.div 
        className="grid gap-3"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {stepData.choices?.map((c, index) => (
          <motion.button
            key={c.value}
            onClick={() => {
              // Som de clique/seleção (suave e leve)
              play(SFX.click)
              onSelect(c.value)
              setTimeout(() => next(stepData.xpReward, `step_${stepData.id}`), 300)
            }}
            className="group flex items-center justify-between w-full rounded-2xl bg-gradient-to-br from-[#5e348f] to-[#3d225e] p-4 ring-1 ring-white/10 hover:scale-[1.02] transition-all duration-300 shadow-[0_20px_60px_rgba(0,0,0,.35)] hover:shadow-[0_25px_70px_rgba(0,0,0,.4)]"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="text-left text-[15px] font-medium">{c.label}</span>
            <ChevronRight className="size-5 opacity-70 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        ))}
      </motion.div>

      {stepData.insight && (
        <motion.p 
          className="mt-6 text-xs opacity-80 italic text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          {stepData.insight}
        </motion.p>
      )}
    </Container>
  )

  // === Componente para checkbox ===
  const PageCheckbox: React.FC<{ stepData: StepQuestion; onSelect: (values: string[]) => void }> = ({ stepData, onSelect }) => {
    const [selected, setSelected] = useState<string[]>([])

    const toggleSelection = (value: string) => {
      setSelected(prev => {
        if (prev.includes(value)) {
          // Som de clique para desmarcar
          play(SFX.click)
          return prev.filter(v => v !== value)
        } else if (prev.length < (stepData.maxSelections || 999)) {
          // Som de clique para marcar
          play(SFX.click)
          return [...prev, value]
        } else {
          // Som de erro quando excede limite
          play(SFX.error)
          return prev
        }
      })
    }

    const handleContinue = () => {
      if (selected.length > 0) {
        // Som de clique para continuar
        play(SFX.click)
        onSelect(selected)
        setTimeout(() => next(stepData.xpReward, `step_${stepData.id}`), 300)
      } else {
        // Som de erro se nada foi selecionado
        play(SFX.error)
      }
    }

    return (
      <Container>
        <Hud />
        {stepData.title && (
          <motion.h3 
            className="text-xl md:text-2xl font-extrabold tracking-tight text-white mb-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {stepData.title}
          </motion.h3>
        )}
        {stepData.question && (
          <motion.p 
            className="text-sm text-[#C39BD3] mb-6 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {stepData.question}
          </motion.p>
        )}

        <motion.div 
          className="grid gap-3 mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {stepData.choices?.map((c, index) => (
            <motion.button
              key={c.value}
              onClick={() => toggleSelection(c.value)}
              className={`group flex items-center justify-between w-full rounded-2xl p-4 ring-1 ring-white/10 hover:scale-[1.02] transition-all duration-300 shadow-[0_20px_60px_rgba(0,0,0,.35)] ${
                selected.includes(c.value)
                  ? 'bg-gradient-to-br from-[#6a3a38] to-[#3a1f1e] ring-green-400/30'
                  : 'bg-gradient-to-br from-[#5e348f] to-[#3d225e]'
              }`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="text-left text-[15px] font-medium">{c.label}</span>
              {selected.includes(c.value) && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <Check className="size-5 text-green-400" />
                </motion.div>
              )}
            </motion.button>
          ))}
        </motion.div>

        <motion.button
          onClick={handleContinue}
          disabled={selected.length === 0}
          className="w-full rounded-2xl bg-[#F25C54] hover:bg-[#ff6f68] disabled:bg-gray-600 disabled:cursor-not-allowed p-4 font-bold text-white transition-all duration-300 shadow-[0_15px_40px_rgba(242,92,84,.4)] hover:shadow-[0_20px_50px_rgba(242,92,84,.6)]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Continuar ({selected.length} selecionado{selected.length !== 1 ? 's' : ''})
        </motion.button>
        
        {stepData.insight && (
          <motion.p 
            className="mt-6 text-xs opacity-80 italic text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            {stepData.insight}
          </motion.p>
        )}
      </Container>
    )
  }

  // === Componente Slider ===
  const PageSlider: React.FC<{ stepData: StepQuestion }> = ({ stepData }) => {
    const handleSliderChange = (value: number) => {
      setSliderValue(value)
    }

    const handleContinue = () => {
      // Som de clique para continuar
      play(SFX.click)
      setAnswers(prev => ({ ...prev, scrollLevel: sliderValue }))
      next(stepData.xpReward, `step_${stepData.id}`)
    }

    return (
      <Container>
        <Hud />
        {stepData.title && (
          <motion.h3 
            className="text-xl md:text-2xl font-extrabold tracking-tight text-white mb-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {stepData.title}
          </motion.h3>
        )}
        {stepData.question && (
          <motion.p 
            className="text-sm text-[#C39BD3] mb-6 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {stepData.question}
          </motion.p>
        )}

        <motion.div 
          className="mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-4 text-sm">
            <span>Nada (0)</span>
            <span className="text-2xl font-bold text-[#F25C54]">{sliderValue}</span>
            <span>Extremo (10)</span>
          </div>
          
          <input
            type="range"
            min="0"
            max="10"
            value={sliderValue}
            onChange={(e) => handleSliderChange(Number(e.target.value))}
            className="w-full h-3 bg-white/10 rounded-full appearance-none cursor-pointer slider"
            style={{
              background: `linear-gradient(to right, #F25C54 0%, #F25C54 ${sliderValue * 10}%, rgba(255,255,255,0.1) ${sliderValue * 10}%, rgba(255,255,255,0.1) 100%)`
            }}
          />
          
          <div className="mt-4 text-center">
            <span className={`text-lg font-bold ${
              sliderValue >= 8 ? 'text-red-400' : 
              sliderValue >= 5 ? 'text-orange-400' : 
              'text-green-400'
            }`}>
              {sliderValue >= 8 ? 'CRÍTICO' : sliderValue >= 5 ? 'ALTO' : 'CONTROLADO'}
            </span>
          </div>
        </motion.div>

        <motion.button
          onClick={handleContinue}
          className="w-full rounded-2xl bg-[#F25C54] hover:bg-[#ff6f68] p-4 font-bold text-white transition-all duration-300 shadow-[0_15px_40px_rgba(242,92,84,.4)] hover:shadow-[0_20px_50px_rgba(242,92,84,.6)]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Continuar
        </motion.button>

        {stepData.insight && (
          <motion.p 
            className="mt-6 text-xs opacity-80 italic text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            {stepData.insight}
          </motion.p>
        )}
      </Container>
    )
  }

  // === Componente Loading ===
  const PageLoading: React.FC<{ stepData: StepQuestion }> = ({ stepData }) => {
    const [loadingProgress, setLoadingProgress] = useState(0)
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [agree1, setAgree1] = useState(false)
    const [agree2, setAgree2] = useState(false)

    useEffect(() => {
      // Som de processamento/carregamento
      play(SFX.processing)
      const interval = setInterval(() => {
        setLoadingProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval)
            return 100
          }
          return prev + 2
        })
      }, 100)
      return () => clearInterval(interval)
    }, [])

    const handleContinue = () => {
      if (email && agree1 && agree2) {
        // Som de clique para continuar
        play(SFX.click)
        setAnswers(prev => ({ ...prev, email, phone }))
        next(stepData.xpReward, `step_${stepData.id}`)
      } else {
        // Som de erro para campos obrigatórios não preenchidos
        play(SFX.error)
      }
    }

    return (
      <Container>
        <Hud />
        <div className="text-center mb-6">
          <motion.div
            className="inline-flex items-center gap-2 text-sm opacity-90 mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Loader2 className="size-4 animate-spin text-[#F25C54]" />
            <span>Processamento Neural: analisando suas respostas…</span>
          </motion.div>
          
          <motion.h3 
            className="text-xl md:text-2xl font-extrabold tracking-tight text-white mb-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {stepData.title}
          </motion.h3>
          
          <motion.div 
            className="w-full bg-white/10 rounded-full h-2 mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <motion.div
              className="bg-gradient-to-r from-[#F25C54] to-[#FF3B3B] h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${loadingProgress}%` }}
              transition={{ duration: 0.1 }}
            />
          </motion.div>
          
          <motion.p 
            className="text-sm text-[#C39BD3] mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Na última semana, <b>1.024 pessoas</b> começaram exatamente como você… e já sentiram mudança.
          </motion.p>
        </div>

        <motion.div 
          className="space-y-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <label className="flex items-center gap-3 text-sm cursor-pointer">
            <input 
              type="checkbox" 
              className="accent-[#F25C54] scale-110" 
              checked={agree1}
              onChange={(e) => setAgree1(e.target.checked)}
            />
            <span>Concordo em aplicar <b>5–15 min/dia</b> do plano.</span>
          </label>
          
          <label className="flex items-center gap-3 text-sm cursor-pointer">
            <input 
              type="checkbox" 
              className="accent-[#F25C54] scale-110" 
              checked={agree2}
              onChange={(e) => setAgree2(e.target.checked)}
            />
            <span>Quero receber apenas o <b>essencial</b>.</span>
          </label>
          
          <div className="grid md:grid-cols-2 gap-3 mt-4">
            <input
              type="email"
              placeholder="Seu e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-xl bg-white/5 ring-1 ring-white/10 px-4 py-3 text-sm placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#F25C54] transition-all"
            />
            <input
              type="tel"
              placeholder="Seu WhatsApp"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="rounded-xl bg-white/5 ring-1 ring-white/10 px-4 py-3 text-sm placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#F25C54] transition-all"
            />
          </div>
        </motion.div>

        <motion.div 
          className="mt-6 flex justify-end"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <button
            onClick={handleContinue}
            disabled={!email || !agree1 || !agree2}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-bold bg-[#F25C54] hover:bg-[#ff6f68] disabled:bg-gray-600 disabled:cursor-not-allowed transition-all duration-300 shadow-[0_15px_40px_rgba(242,92,84,.4)] hover:shadow-[0_20px_50px_rgba(242,92,84,.6)]"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Continuar <ChevronRight className="size-4" />
          </button>
        </motion.div>

        {stepData.insight && (
          <motion.p 
            className="mt-4 text-xs opacity-80 italic text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            {stepData.insight}
          </motion.p>
        )}
      </Container>
    )
  }

  // === Componente Diagnóstico ===
  const PageDiagnosis: React.FC<{ stepData: StepQuestion }> = ({ stepData }) => {
    const scrollLevel = answers.scrollLevel || 5
    const damages = answers.damages || ['carreira']
    
    let level = "MÉDIO"
    let levelColor = "text-yellow-400"
    let description = "Você tenta, mas se sabota mais do que avança."
    
    if (scrollLevel >= 8) {
      level = "EXTREMO"
      levelColor = "text-red-400"
      description = "Você está na beira do abismo. Ou muda, ou afunda."
    } else if (scrollLevel >= 5) {
      level = "ALTO"
      levelColor = "text-orange-400"
      description = "Piloto automático comendo tua energia e confiança."
    }

    const bullets = [
      `Área mais afetada: ${damages[0]}${damages[1] ? ` e ${damages[1]}` : ''}.`,
      `Gatilho de fuga: ${scrollLevel > 6 ? 'celular' : 'adiamento/ansiedade'}.`,
      `Quebra de foco: pico no período atual.`
    ]

    useEffect(() => {
      // Som de impacto para revelar diagnóstico
      play(SFX.impact)
    }, [])

    return (
      <Container>
        <Hud />
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-6">
            <motion.div
              className="inline-flex items-center gap-2 mb-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <AlertTriangle className="size-5 text-red-400" />
              <span className="text-sm font-medium">Diagnóstico Completo</span>
            </motion.div>
            
            <motion.h3 
              className="text-xl md:text-2xl font-extrabold tracking-tight text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {stepData.title}
            </motion.h3>
          </div>

          <motion.div 
            className="rounded-2xl bg-gradient-to-br from-[#1f3550] to-[#0f1c2b] p-6 ring-1 ring-white/10 mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="text-center mb-4">
              <div className="text-sm opacity-90 mb-2">Seu nível de procrastinação:</div>
              <motion.div 
                className={`text-4xl font-black ${levelColor} mb-2`}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                {level}
              </motion.div>
              <p className="text-[#C39BD3] text-sm leading-relaxed">{description}</p>
            </div>
            
            <motion.ul 
              className="space-y-2 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              {bullets.map((bullet, index) => (
                <motion.li 
                  key={index}
                  className="flex items-center gap-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.9 + index * 0.1 }}
                >
                  <div className="size-2 rounded-full bg-[#F25C54]" />
                  {bullet}
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          <motion.button
            onClick={() => {
              // Som de clique para continuar
              play(SFX.click)
              next(stepData.xpReward, `step_${stepData.id}`)
            }}
            className="w-full rounded-2xl bg-[#F25C54] hover:bg-[#ff6f68] p-4 font-bold text-white transition-all duration-300 shadow-[0_15px_40px_rgba(242,92,84,.4)] hover:shadow-[0_20px_50px_rgba(242,92,84,.6)]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.2 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Continuar para o Plano Personalizado
          </motion.button>

          {stepData.insight && (
            <motion.p 
              className="mt-4 text-xs opacity-80 italic text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.4 }}
            >
              {stepData.insight}
            </motion.p>
          )}
        </motion.div>
      </Container>
    )
  }

  // === Componente Oferta Final ===
  const PageOffer: React.FC<{ stepData: StepQuestion }> = ({ stepData }) => {
    useEffect(() => {
      // Som de vitória ao chegar na oferta final
      play(SFX.victory)
    }, [])

    const handlePurchase = () => {
      // Som de impacto para ação de compra
      play(SFX.impact)
      giveXp(50, "purchase_intent")
      // Aqui você adicionaria a integração com o sistema de pagamento
      alert("Redirecionando para pagamento...")
    }

    return (
      <Container>
        <Hud />
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-6">
            <motion.div
              className="inline-flex items-center gap-2 mb-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Trophy className="size-5 text-yellow-400" />
              <span className="text-sm font-medium">Oferta Exclusiva</span>
            </motion.div>
            
            <motion.h3 
              className="text-xl md:text-2xl font-extrabold tracking-tight text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {stepData.title}
            </motion.h3>
          </div>

          <motion.div 
            className="rounded-2xl bg-gradient-to-br from-[#1f3550] to-[#0f1c2b] p-6 ring-1 ring-white/10 mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="text-center mb-4">
              <Sparkles className="size-8 text-yellow-400 mx-auto mb-3" />
              <p className="text-sm leading-relaxed">
                ✨ Em <b>5 dias</b> você sente tração. Em <b>14 dias</b>, rotina disciplinada — mesmo se já fracassou antes.
              </p>
            </div>
          </motion.div>

          {/* Depoimentos rápidos */}
          <motion.div 
            className="grid gap-4 mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            {[
              { text: "Perdia cliente. Em 2 semanas fechei mais que em 3 meses.", author: "João — vendedor" },
              { text: "Travava no celular. Hoje termino o TCC e cumpro rotina.", author: "Larissa — estudante" },
              { text: "Não era preguiça; era falta de clareza. Faturei mais.", author: "Camila — empreendedora" }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                className="rounded-xl bg-[#4B2E83]/50 p-4 ring-1 ring-white/10"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.7 + index * 0.1 }}
              >
                <p className="text-sm mb-2">"{testimonial.text}"</p>
                <div className="text-xs opacity-80">{testimonial.author}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Urgência */}
          <motion.div 
            className="rounded-xl bg-gradient-to-r from-[#6a3a38] to-[#3a1f1e] p-4 ring-1 ring-white/10 mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 1.0 }}
          >
            <div className="flex items-center gap-2 text-sm">
              <Clock className="size-4 text-red-400" />
              <span>A cada hora, dezenas entram. <b>Bônus Técnica X</b> limitado. Se voltar amanhã, pode não ter.</span>
            </div>
          </motion.div>

          {/* Preço e CTA */}
          <motion.div 
            className="rounded-2xl bg-black/20 p-6 ring-1 ring-white/10"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm opacity-90 mb-1">Plano personalizado vitalício</div>
                <div className="text-3xl font-black text-[#FFCC48] mb-1">R$ 37</div>
                <div className="text-xs opacity-80">Acesso imediato + Bônus Técnica X (limitado)</div>
              </div>
              <motion.button
                onClick={handlePurchase}
                className="px-6 py-4 bg-[#39FF88] hover:bg-[#2dd673] text-black font-black rounded-xl transition-all duration-300 shadow-[0_15px_40px_rgba(57,255,136,.4)] hover:shadow-[0_20px_50px_rgba(57,255,136,.6)]"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                QUERO ESMAGAR A PROCRASTINAÇÃO
              </motion.button>
            </div>
          </motion.div>

          {stepData.insight && (
            <motion.p 
              className="mt-4 text-xs opacity-80 italic text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.4 }}
            >
              {stepData.insight}
            </motion.p>
          )}
        </motion.div>
      </Container>
    )
  }

  // === Render principal por step ===
  return (
    <section id="quiz" className="relative mx-auto max-w-6xl px-4 py-12">
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
        >
          {/* Fundo decorativo consistente com a landing */}
          <div className="absolute inset-0 -z-10 pointer-events-none">
            <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-red-600/30 blur-[120px]" />
            <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-purple-900/40 blur-[120px]" />
          </div>

          {/* Step 1 - Estalo Brutal */}
          {step === 1 && (
            <PageRadio
              stepData={steps[0]}
              onSelect={(value) => {
                setAnswers(prev => ({ ...prev, start: value }))
              }}
            />
          )}

          {/* Step 2 - Idade */}
          {step === 2 && (
            <PageRadio
              stepData={steps[1]}
              onSelect={(value) => {
                setAnswers(prev => ({ ...prev, age: value }))
              }}
            />
          )}

          {/* Step 3 - Scroll (Slider) */}
          {step === 3 && <PageSlider stepData={steps[2]} />}

          {/* Step 4 - Reflexo */}
          {step === 4 && (
            <PageRadio
              stepData={steps[3]}
              onSelect={(value) => {
                setAnswers(prev => ({ ...prev, mirrorPain: value }))
              }}
            />
          )}

          {/* Step 5 - Prejuízos (Checkbox) */}
          {step === 5 && (
            <PageCheckbox
              stepData={steps[4]}
              onSelect={(values) => {
                setAnswers(prev => ({ ...prev, damages: values }))
              }}
            />
          )}

          {/* Step 6 - Prioridade */}
          {step === 6 && (
            <PageRadio
              stepData={steps[5]}
              onSelect={(value) => {
                setAnswers(prev => ({ ...prev, priority: value }))
              }}
            />
          )}

          {/* Step 7 - Visão 12 meses */}
          {step === 7 && (
            <PageRadio
              stepData={steps[6]}
              onSelect={(value) => {
                setAnswers(prev => ({ ...prev, vision12: value }))
              }}
            />
          )}

          {/* Step 8 - Loading */}
          {step === 8 && <PageLoading stepData={steps[7]} />}

          {/* Step 9 - Padrão de desistência */}
          {step === 9 && (
            <PageRadio
              stepData={steps[8]}
              onSelect={(value) => {
                setAnswers(prev => ({ ...prev, quitPattern: value }))
              }}
            />
          )}

          {/* Step 10 - Última chamada */}
          {step === 10 && (
            <PageRadio
              stepData={steps[9]}
              onSelect={(value) => {
                setAnswers(prev => ({ ...prev, lastCall: value }))
              }}
            />
          )}

          {/* Step 11 - Diagnóstico */}
          {step === 11 && <PageDiagnosis stepData={steps[10]} />}

          {/* Step 12 - Compromisso */}
          {step === 12 && (
            <PageRadio
              stepData={steps[11]}
              onSelect={(value) => {
                setAnswers(prev => ({ ...prev, commitment: value }))
              }}
            />
          )}

          {/* Step 13 - Oferta Final */}
          {step === 13 && <PageOffer stepData={steps[12]} />}
        </motion.div>
      </AnimatePresence>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #F25C54;
          cursor: pointer;
          box-shadow: 0 0 10px rgba(242, 92, 84, 0.5);
        }
        
        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #F25C54;
          cursor: pointer;
          border: none;
          box-shadow: 0 0 10px rgba(242, 92, 84, 0.5);
        }
      `}</style>
    </section>
  )
}