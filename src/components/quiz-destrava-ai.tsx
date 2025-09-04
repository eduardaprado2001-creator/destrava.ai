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
  ping: "/Ping sound effect.mp3",
  boom: "/Boom Swoosh - Efeito Sonoro Gratuito.mp3",
  scan: "/Loading Sound Effect (Royalty free Sound)#shorts.mp3",
  alarm: "/Efeito sonoro Atenção.mp3",
  victory: "/Efeito sonoro (Vitória).mp3"
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
        kind: "radio",
        title: "Prisão Digital + Adiamento",
        hudAvatar: "Pescoço erguendo.",
        progress: 24,
        xpReward: 6,
        question: "Quanto o scroll te destrói hoje? (seja honesto)",
        choices: [
          { label: "Nada ou quase nada", value: "0-2" },
          { label: "Pouco, mas incomoda", value: "3-4" },
          { label: "Moderado, me atrapalha", value: "5-6" },
          { label: "Muito, destrói meu foco", value: "7-8" },
          { label: "Extremo, acaba comigo", value: "9-10" },
        ],
        insight: "Teu polegar é o carrasco dos teus objetivos.",
      },
      // P4 – Reflexo do fracasso
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
      // P5 – Prejuízo já causado
      {
        id: 5,
        kind: "checkbox",
        title: "Prejuízo já causado",
        hudAvatar: "Fendas de luz no peito.",
        progress: 40,
        xpReward: 10,
        question: "O que a procrastinação já destruiu? (escolha até 2)",
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

  // === Componente para checkbox ===
  const PageCheckbox: React.FC<{ stepData: StepQuestion; onChange: (vals: string[]) => void }> = ({ stepData, onChange }) => {
    const [selected, setSelected] = useState<string[]>([])

    const toggleSelection = (value: string) => {
      setSelected(prev => {
        if (prev.includes(value)) {
          return prev.filter(v => v !== value)
        } else if (prev.length < (stepData.maxSelections || 999)) {
          return [...prev, value]
        }
        return prev
      })
    }

    const handleContinue = () => {
      if (selected.length > 0) {
        play(SFX.boom)
        onChange(selected)
        next(stepData.xpReward, `step_${stepData.id}`)
      }
    }

    return (
      <Container>
        <Hud />
        {stepData.title && (
          <h3 className="text-xl md:text-2xl font-extrabold tracking-tight text-white mb-3">{stepData.title}</h3>
        )}
        {stepData.question && <p className="text-sm text-[#C39BD3] mb-6">{stepData.question}</p>}

        <div className="grid gap-3 mb-6">
          {stepData.choices?.map((c) => (
            <button
              key={c.value}
              onClick={() => {
                play(SFX.ping)
                toggleSelection(c.value)
              }}
              className={`group flex items-center justify-between w-full rounded-2xl p-4 ring-1 ring-white/10 hover:scale-[1.02] transition shadow-[0_20px_60px_rgba(0,0,0,.35)] ${
                selected.includes(c.value)
                  ? 'bg-gradient-to-br from-[#6a3a38] to-[#3a1f1e]'
                  : 'bg-gradient-to-br from-[#5e348f] to-[#3d225e]'
              }`}
            >
              <span className="text-left text-[15px]">{c.label}</span>
              {selected.includes(c.value) && <Check className="size-5 text-green-400" />}
            </button>
          ))}
        </div>

        <button
          onClick={handleContinue}
          disabled={selected.length === 0}
          className="w-full rounded-2xl bg-[#F25C54] hover:bg-[#FF6A00] disabled:bg-gray-600 disabled:cursor-not-allowed p-4 font-bold text-white transition-colors"
        >
          Continuar ({selected.length} selecionado{selected.length !== 1 ? 's' : ''})
        </button>
        {stepData.insight && <p className="mt-6 text-xs opacity-80 italic text-center">{stepData.insight}</p>}
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
              onSelect={(value) => {
                setAnswers(prev => ({ ...prev, start: value }))
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

          {step === 2 && (
            <PageRadio
              stepData={steps[1]}
              onSelect={(value) => {
                setAnswers(prev => ({ ...prev, age: value }))
              }}
            />
          )}

          {step === 3 && (
            <PageRadio
              stepData={steps[2]}
              onSelect={(value) => {
                setAnswers(prev => ({ ...prev, scrollLevel: parseInt(value.split('-')[1]) || 5 }))
              }}
            />
          )}

          {step === 4 && (
            <PageRadio
              stepData={steps[3]}
              onSelect={(value) => {
                setAnswers(prev => ({ ...prev, mirrorPain: value }))
              }}
            />
          )}

          {step === 5 && (
            <PageCheckbox
              stepData={steps[4]}
              onChange={(values) => {
                setAnswers(prev => ({ ...prev, damages: values }))
              }}
            />
          )}

          {step > 5 && (
            <Container>
              <Hud />
              <div className="text-center py-12">
                <h3 className="text-2xl font-bold text-white mb-4">Quiz em Desenvolvimento</h3>
                <p className="text-[#C39BD3] mb-6">Mais etapas serão adicionadas em breve!</p>
                <button
                  onClick={() => setStep(1)}
                  className="px-6 py-3 bg-[#F25C54] hover:bg-[#FF6A00] rounded-xl font-bold transition-colors"
                >
                  Recomeçar Quiz
                </button>
              </div>
            </Container>
          )}
        </motion.div>
      </AnimatePresence>
    </section>
  )
}