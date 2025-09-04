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
    setStep((s) => Math.min(s + 1, 15))
    play(SFX.levelUp)
  }

  const progress = useMemo(() => {
    // 15 telas → 0..100
    const map: Record<number, number> = {
      1: 8,
      2: 16,
      3: 20,
      4: 28,
      5: 36,
      6: 44,
      7: 52,
      8: 60,
      9: 64,
      10: 68,
      11: 72,
      12: 76,
      13: 84,
      14: 92,
      15: 96,
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
      // P3 – Frequência de procrastinação
      {
        id: 3,
        kind: "radio",
        title: "Com que frequência você deixa tarefas importantes pra depois, mesmo sabendo que isso só acumula e te afunda ainda mais?",
        hudAvatar: "Olhar introspectivo.",
        progress: 20,
        xpReward: 3,
        question: "",
        choices: [
          { label: "Sempre, é um ciclo que não consigo parar", value: "sempre" },
          { label: "Frequentemente, vivo adiando tudo", value: "frequentemente" },
          { label: "Às vezes, mas me atrapalha muito", value: "asvezes" },
          { label: "Raramente, mas ainda assim me trava", value: "raramente" },
        ],
        insight: "Reconhecer o padrão é o primeiro passo para quebrá-lo.",
      },
      // P4 – Scroll + Adiamento (combo)
      {
        id: 4,
        kind: "slider",
        title: "Prisão Digital",
        hudAvatar: "Pescoço erguendo.",
        progress: 28,
        xpReward: 6,
        question: "Quanto o scroll (ato de rolar a tela) te destrói hoje? (0 = nada, 10 = quase todo dia me arregaça)",
      },
      // P5 – Reflexo
      {
        id: 5,
        kind: "radio",
        title: "Quando olha no espelho, você sente que está desperdiçando seu potencial e deixando sua melhor versão morrer com o tempo?",
        hudAvatar: "Reflexo distorcido ao fundo.",
        progress: 36,
        xpReward: 4,
        question: "",
        choices: [
          { label: "Sempre, sinto que tô enterrando minha própria chance de vencer", value: "sempre" },
          { label: "Muitas vezes, me sinto cada vez mais distante da vida que eu queria", value: "muitas" },
          { label: "Às vezes, mas já dói muito", value: "asvezes" },
          { label: "Em alguns momentos, mas sei que tô me sabotando", value: "alguns" },
        ],
        insight: "O espelho não mente: ou age, ou apodrece.",
      },
      // P6 – Prejuízo (multi)
      {
        id: 6,
        kind: "checkbox",
        title: "Prejuízo já causado",
        hudAvatar: "Fendas de luz no peito.",
        progress: 44,
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
      // P7 – Prioridade & Área
      {
        id: 7,
        kind: "radio",
        title: "Foco total agora",
        hudAvatar: "Postura firme.",
        progress: 52,
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
      // P8 – 12 meses
      {
        id: 8,
        kind: "radio",
        title: "Sua vida em 12 meses",
        hudAvatar: "Luz no olhar.",
        progress: 60,
        xpReward: 6,
        question: "Daqui a 12 meses, como você quer se enxergar?",
        choices: [
          { label: "Resultados reais, projetos do papel.", value: "resultados" },
          { label: "Disciplina, confiança e orgulho.", value: "disciplina" },
          { label: "Rotina produtiva no controle.", value: "rotina" },
        ],
        insight: "A vida que quer não chega — é construída.",
      },
      // P9 – Impacto da disciplina
      {
        id: 9,
        kind: "radio",
        title: "Qual seria o impacto de se tornar alguém disciplinado, focado e admirado — um exemplo vivo de determinação que inspira quem tá ao seu redor?",
        hudAvatar: "Postura ereta, olhar determinado.",
        progress: 64,
        xpReward: 7,
        question: "",
        choices: [
          { label: "Seria transformador, mudaria minha vida inteira", value: "transformador" },
          { label: "Me traria orgulho de verdade", value: "orgulho" },
          { label: "Mudaria meus resultados de forma absurda", value: "resultados" },
          { label: "Me faria ser respeitado por todos (e por mim mesmo)", value: "respeito" },
        ],
        insight: "A pessoa que você pode se tornar já existe dentro de você.",
      },
      // P9 – Loading + social + coleta
      {
        id: 10,
        kind: "loading",
        title: "Processamento Neural",
        hudAvatar: "Olhos fechados, download de consciência.",
        progress: 68,
        xpReward: 5,
        insight: "Quem assume o compromisso, colhe o resultado.",
      },
      // P10 – Futuro sem ação + pergunta extra
      {
        id: 11,
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
      // P11 – Virada + CTA diagnóstico
      {
        id: 12,
        kind: "radio",
        title: "Virada mental: a última chamada",
        hudAvatar: "Armadura psíquica ativando (nível 5).",
        progress: 76,
        xpReward: 5,
        question:
          "Ou você controla a mente, ou a procrastinação te controla. Quer ver seu diagnóstico personalizado agora?",
        choices: [{ label: "VER MEU DIAGNÓSTICO PERSONALIZADO", value: "cta" }],
        insight: "Clareza sem ação é autoengano.",
      },
      // P12 – Diagnóstico dinâmico
      {
        id: 13,
        kind: "diagnosis",
        title: "Diagnóstico Final: a verdade nua",
        hudAvatar: "Armadura 7/10.",
        progress: 84,
        xpReward: 10,
        insight: "A dor de agora é a conta do que adiou.",
      },
      // P13 – Compromisso
      {
        id: 14,
        kind: "commitment",
        title: "Compromisso de tempo diário",
        hudAvatar: "9/10, olhos em brasa.",
        progress: 92,
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
      // P14 – Oferta final única
      {
        id: 15,
        kind: "offer",
        title: "Oferta Final",
        hudAvatar: "10/10, armadura completa.",
        progress: 96,
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
    const [currentPhase, setCurrentPhase] = useState(0)
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [agree1, setAgree1] = useState(false)
    const [agree2, setAgree2] = useState(false)

    useEffect(() => {
      // Som de processamento/carregamento
      play