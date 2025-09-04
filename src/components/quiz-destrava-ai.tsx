"use client"

import { useMemo, useRef, useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Check, ChevronRight, Loader2, Timer, Sparkles, Zap } from "lucide-react"

/**
 * QuizDestravaAi – fluxo gamificado em 13 telas
 * - Mantém as MESMAS cores e vibe do componente LandingDestravaAi
 * - HUD com progresso/XP/Avatar
 * - Animações consistentes (framer-motion)
 * - Coleta e-mail/telefone no loading (P8)
 * - Diagnóstico dinâmico (P11)
 * - Oferta final única (P13) com depoimentos (curtos) e CTA
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
  neon: "#39FF88", // neon green sutil
}

// === SFX (Usando os links diretos para os MP3 no GitHub) ===
const SFX = {
  ping: "https://raw.githubusercontent.com/usuario/repositorio/master/assets/sounds/ping.mp3",
  boom: "https://raw.githubusercontent.com/usuario/repositorio/master/assets/sounds/boom.mp3",
  scan: "https://raw.githubusercontent.com/usuario/repositorio/master/assets/sounds/scan.mp3",
  alarm: "https://raw.githubusercontent.com/usuario/repositorio/master/assets/sounds/alarm.mp3",
  victory: "https://raw.githubusercontent.com/usuario/repositorio/master/assets/sounds/victory.mp3"
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
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    audioRef.current = new Audio()
  }, [])

  const play = (src?: string) => {
    if (!src) return
    try {
      const a = new Audio(src)
      a.volume = 0.25
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
    setStep((s) => Math.min(s + 1, 13))
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
    return map[step]
  }, [step])

  // === Definição das Páginas (13) ===
  const steps: StepQuestion[] = useMemo(
    () => [
      // P1 – Estalo brutal (CTA start)
      {
        id: 1,
        kind: "radio",
        title: "Estalo Brutal",
        hudAvatar: "Sombra, olhos cansados.",
        progress: 8,
        xpReward: 1,
        question: "Daqui a 1 ano sua vida vai estar IGUAL — travada, sem dinheiro e sem orgulho. Bora encarar a verdade?",
        choices: [
          { label: "COMEÇAR O DIAGNÓSTICO", value: "start" },
        ],
        insight: "Quem foge da verdade, casa com a mentira.",
      },
      // P2 – Idade
      {
        id: 2,
        kind: "radio",
        title: "Idade: o tempo já era",
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
        title: "Prisão Digital + Adiamento",
        hudAvatar: "Pescoço erguendo.",
        progress: 24,
        xpReward: 6,
        question:
          "Quanto o scroll te destrói hoje? (0 = nada, 10 = quase todo dia me arregaça). Depois selecione com que frequência você adia o que importa.",
      },
      // Adicionar outras páginas conforme necessário...
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
      <div className="rounded-3xl p-6 md:p-8 bg-gradient-to-br from-[#2b1a4e]/70 via-[#3c2569]/70 to-[#4B2E83]/70 ring-1 ring-white/10 shadow-[0_20px_60px_rgba(0,0,0,.35)]">
        {children}
      </div>
    </div>
  )

  const Hud = () => (
    <div className="mb-6 flex items-center justify-between text-xs">
      <div className="flex items-center gap-3">
        <span className="px-2 py-1 rounded-full bg-white/10">XP {xp}/140</span>
        <span className="px-2 py-1 rounded-full bg-white/10">Avatar: {steps.find((s) => s.id === step)?.hudAvatar}</span>
      </div>
      <div className="flex-1 mx-4 h-2 rounded-full bg-white/10 overflow-hidden">
        <div
          className="h-full rounded-full"
          style={{ width: `${progress}%`, background: `linear-gradient(90deg, ${COLORS.coral}, ${COLORS.red})` }}
        />
      </div>
      <span className="opacity-80">{progress}%</span>
    </div>
  )

  // === Componentes de página ===
  const PageRadio: React.FC<{ stepData: StepQuestion } & { onSelect: (v: string) => void }> = ({ stepData, onSelect }) => (
    <Container>
      <Hud />
      {stepData.title && (
        <h3 className="text-xl md:text-2xl font-extrabold tracking-tight text-white mb-3">{stepData.title}</h3>
      )}
      {stepData.question && <p className="text-sm text-[#C39BD3] mb-6">{stepData.question}</p>}

      <div className="grid gap-3">
        {stepData.choices?.map((c) => (
          <button
            key={c.value}
            onClick={() => {
              play(SFX.ping) // Som de clique
              onSelect(c.value)
              next(stepData.xpReward, `step_${stepData.id}`)
            }}
            className="group flex items-center justify-between w-full rounded-2xl bg-gradient-to-br from-[#5e348f] to-[#3d225e] p-4 ring-1 ring-white/10 hover:scale-[1.02] transition shadow-[0_20px_60px_rgba(0,0,0,.35)]"
          >
            <span className="text-left text-[15px]">{c.label}</span>
            <ChevronRight className="size-5 opacity-70 group-hover:translate-x-1 transition" />
          </button>
        ))}
      </div>

      {stepData.insight && <p className="mt-6 text-xs opacity-80 italic">{stepData.insight}</p>}
    </Container>
  )

  // === Render principal por step ===
  return (
    <section id="quiz" className="relative mx-auto max-w-6xl px-4 py-12">
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {/* Fundo decorativo consistente com a landing */}
          <div className="absolute inset-0 -z-10 pointer-events-none">
            <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-red-600/30 blur-[120px]" />
            <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-purple-900/40 blur-[120px]" />
          </div>

          {step === 1 && (
            <PageRadio
              stepData={steps[0]}
              onSelect={() => {
                play(SFX.ping)
                next(1, "step_1")
              }}
            />
          )}

          {step === 2 && (
            <PageRadio
              stepData={steps[1]}
              onSelect={(v) => {
                setAnswers((a) => ({ ...a, age: v }))
                next(2, "step_2")
              }}
            />
          )}

          {/* Adicione outros steps conforme necessário */}
        </motion.div>
      </AnimatePresence>
    </section>
  )
}