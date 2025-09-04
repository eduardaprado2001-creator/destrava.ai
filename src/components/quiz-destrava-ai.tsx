"use client"

import { useMemo, useRef, useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Check, ChevronRight, Loader2, AlarmClock, Timer, Shield, Sparkles, Zap } from "lucide-react"

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

// === SFX (placeholders em base64 – substitua quando quiser) ===
const SFX = {
  ping: "data:audio/mp3;base64,//uQZAAAAAAAAAAAAAAAAAAAAAAAWGluZwAAAA8AAAACAAACcQAA...", // clique/ping curto
  boom: "data:audio/mp3;base64,//uQZAAAAAAAAAAAAAAABvb20tYm9vbS0t...",
  scan: "data:audio/mp3;base64,//uQZAAAAAAAAAAAAAAAHNjYW4tYmlu...",
  alarm: "data:audio/mp3;base64,//uQZAAAAAAAAAAAAAAAGFsYXJtLXNvZnQ...",
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
        question: "Se o foco total viesse HOJE, qual prioridade #1? (e onde a mudança bate primeiro)",
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
        title: "Processamento Neural: diagnóstico",
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
        insight: "O futuro pune quem hesita.",
      },
      // P13 – Oferta final única
      {
        id: 13,
        kind: "offer",
        title: "Oferta Final (Black Mirror)",
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
              play(SFX.ping)
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

  const PageCheckbox: React.FC<{
    stepData: StepQuestion
    onChange: (vals: string[]) => void
  }> = ({ stepData, onChange }) => {
    const [selected, setSelected] = useState<string[]>([])
    const toggle = (v: string) => {
      setSelected((arr) => {
        let nxt = arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]
        if (stepData.maxSelections && nxt.length > stepData.maxSelections) nxt = nxt.slice(0, stepData.maxSelections)
        play(SFX.ping)
        return nxt
      })
    }

    return (
      <Container>
        <Hud />
        {stepData.title && (
          <h3 className="text-xl md:text-2xl font-extrabold tracking-tight text-white mb-3">{stepData.title}</h3>
        )}
        {stepData.question && <p className="text-sm text-[#C39BD3] mb-4">{stepData.question}</p>}

        <div className="grid gap-3">
          {stepData.choices?.map((c) => {
            const active = selected.includes(c.value)
            return (
              <button
                key={c.value}
                onClick={() => toggle(c.value)}
                className={`flex items-center justify-between w-full rounded-2xl p-4 ring-1 ring-white/10 transition shadow-[0_20px_60px_rgba(0,0,0,.35)] ${
                  active ? "bg-gradient-to-br from-[#6a3a38] to-[#3a1f1e] scale-[1.02]" : "bg-gradient-to-br from-[#1f3550] to-[#0f1c2b]"
                }`}
              >
                <span className="text-left text-[15px]">{c.label}</span>
                {active ? <Check className="size-5 text-[#FFCC48]" /> : <span className="size-5" />}
              </button>
            )
          })}
        </div>

        <div className="mt-5 flex justify-end">
          <button
            onClick={() => {
              onChange(selected)
              next(stepData.xpReward, `step_${stepData.id}`)
            }}
            disabled={selected.length === 0}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl font-bold bg-[#F25C54] hover:bg-[#ff6f68] transition shadow-[0_10px_30px_rgba(242,92,84,.35)] disabled:opacity-40"
          >
            Continuar <ChevronRight className="size-4" />
          </button>
        </div>

        {stepData.insight && <p className="mt-4 text-xs opacity-80 italic">{stepData.insight}</p>}
      </Container>
    )
  }

  const PageSliderCombo: React.FC<{ onSubmit: (scroll: number, delay: string) => void }> = ({ onSubmit }) => {
    const [scroll, setScroll] = useState<number>(5)
    const [delay, setDelay] = useState<string>("")
    const legend = [
      "Nada",
      "Quase nada",
      "Pouco",
      "Moderado",
      "Considerável",
      "Frequente",
      "Muito",
      "Quase todo dia",
      "Todo dia",
      "Destrói meu foco",
      "Acaba comigo",
    ]

    return (
      <Container>
        <Hud />
        <h3 className="text-xl md:text-2xl font-extrabold tracking-tight text-white mb-3">Prisão Digital + Adiamento</h3>
        <p className="text-sm text-[#C39BD3] mb-6">
          Quanto o scroll te destrói hoje? Depois selecione com que frequência você adia o que importa.
        </p>

        <div className="rounded-2xl p-5 ring-1 ring-white/10 bg-gradient-to-br from-[#5e348f] to-[#3d225e]">
          <label className="text-sm opacity-90">Scroll no celular</label>
          <input
            type="range"
            min={0}
            max={10}
            value={scroll}
            onChange={(e) => {
              play(SFX.ping)
              setScroll(Number(e.target.value))
            }}
            className="w-full mt-3 accent-[#F25C54]"
          />
          <div className="mt-2 text-xs opacity-80">{legend[scroll]}</div>
        </div>

        <div className="grid gap-3 mt-4">
          {["Sempre", "Frequentemente", "Às vezes", "Raramente"].map((opt) => (
            <button
              key={opt}
              onClick={() => setDelay(opt)}
              className={`flex items-center justify-between w-full rounded-2xl p-4 ring-1 ring-white/10 transition shadow-[0_20px_60px_rgba(0,0,0,.35)] ${
                delay === opt ? "bg-gradient-to-br from-[#6a3a38] to-[#3a1f1e] scale-[1.02]" : "bg-gradient-to-br from-[#1f3550] to-[#0f1c2b]"
              }`}
            >
              <span className="text-left text-[15px]">{opt}</span>
              {delay === opt ? <Check className="size-5 text-[#FFCC48]" /> : <span className="size-5" />}
            </button>
          ))}
        </div>

        <div className="mt-5 flex justify-end">
          <button
            onClick={() => {
              onSubmit(scroll, delay)
              next(6, "step_3")
            }}
            disabled={!delay}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl font-bold bg-[#F25C54] hover:bg-[#ff6f68] transition shadow-[0_10px_30px_rgba(242,92,84,.35)] disabled:opacity-40"
          >
            Continuar <ChevronRight className="size-4" />
          </button>
        </div>

        <p className="mt-4 text-xs opacity-80 italic">Teu polegar é o carrasco dos teus objetivos.</p>
      </Container>
    )
  }

  const PageLoading: React.FC = () => {
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [agree1, setAgree1] = useState(false)
    const [agree2, setAgree2] = useState(false)

    useEffect(() => {
      play(SFX.scan)
      const t = setTimeout(() => {}, 400)
      return () => clearTimeout(t)
    }, [])

    return (
      <Container>
        <Hud />
        <div className="flex items-center gap-2 text-sm opacity-90 mb-2">
          <Loader2 className="size-4 animate-spin" />
          <span>Processamento Neural: analisando suas respostas…</span>
        </div>
        <h3 className="text-xl md:text-2xl font-extrabold tracking-tight text-white mb-3">Seu diagnóstico está chegando</h3>
        <p className="text-sm text-[#C39BD3] mb-6">
          Na última semana, <b>1.024 pessoas</b> começaram exatamente como você… e já sentiram mudança. Você pode ser o
          próximo.
        </p>

        <div className="grid gap-3">
          <label className="flex items-center gap-3 text-sm">
            <input type="checkbox" checked={agree1} onChange={() => setAgree1((v) => !v)} className="accent-[#F25C54]" />
            Concordo em aplicar <b>5–15 min/dia</b> do plano.
          </label>
          <label className="flex items-center gap-3 text-sm">
            <input type="checkbox" checked={agree2} onChange={() => setAgree2((v) => !v)} className="accent-[#F25C54]" />
            Quero receber apenas o <b>essencial</b>.
          </label>
          <div className="grid md:grid-cols-2 gap-3 mt-2">
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
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={() => {
              setAnswers((a) => ({ ...a, email, phone }))
              play(SFX.ping)
              next(5, "step_8")
            }}
            disabled={!email || !agree1 || !agree2}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl font-bold bg-[#F25C54] hover:bg-[#ff6f68] transition shadow-[0_10px_30px_rgba(242,92,84,.35)] disabled:opacity-40"
          >
            Continuar <ChevronRight className="size-4" />
          </button>
        </div>

        <p className="mt-4 text-xs opacity-80 italic">Quem assume o compromisso, colhe o resultado.</p>
      </Container>
    )
  }

  const PageDiagnosis: React.FC = () => {
    const level = useMemo<"ALTO" | "MÉDIO" | "EXTREMO">(() => {
      // regra simples: scroll alto + adiamento alto empurra para EXTREMO
      const s = answers.scrollLevel ?? 5
      const d = answers.delayFreq || ""
      if (s >= 8 || d === "Sempre") return "EXTREMO"
      if (s >= 5 || d === "Frequentemente") return "ALTO"
      return "MÉDIO"
    }, [answers])

    const bullets = [
      `Área mais afetada: ${answers.damages?.[0] ?? "carreira"}${answers.damages?.[1] ? ` e ${answers.damages?.[1]}` : ""}.`,
      `Gatilho de fuga: ${answers.scrollLevel && answers.scrollLevel > 6 ? "celular" : "adiamento/ansiedade"}.`,
      `Quebra de foco: ${answers.age ? "pico no período atual" : "horários críticos a definir"}.`,
    ]

    return (
      <Container>
        <Hud />
        <h3 className="text-xl md:text-2xl font-extrabold tracking-tight text-white mb-4">Diagnóstico Final</h3>
        <div className="rounded-2xl p-5 ring-1 ring-white/10 bg-gradient-to-br from-[#1f3550] to-[#0f1c2b]">
          <div className="text-sm opacity-90">Seu nível de procrastinação:</div>
          <div className={`mt-1 text-2xl font-black ${level === "EXTREMO" ? "text-red-400" : level === "ALTO" ? "text-orange-300" : "text-[#FFCC48]"}`}>
            {level}
          </div>
          <p className="mt-3 text-sm text-[#C39BD3]">
            {level === "EXTREMO"
              ? "Você está na beira do abismo. Ou muda, ou afunda."
              : level === "ALTO"
              ? "Piloto automático comendo tua energia e confiança."
              : "Você tenta, mas se sabota mais do que avança."}
          </p>
          <ul className="mt-4 grid gap-2 text-sm list-disc list-inside">
            {bullets.map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ul>
        </div>
        <p className="mt-4 text-xs opacity-80 italic">A dor de agora é a conta do que adiou.</p>
        <div className="mt-6 flex justify-end">
          <button
            onClick={() => next(10, "step_11")}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl font-bold bg-[#F25C54] hover:bg-[#ff6f68] transition shadow-[0_10px_30px_rgba(242,92,84,.35)]"
          >
            Continuar <ChevronRight className="size-4" />
          </button>
        </div>
      </Container>
    )
  }

  const PageCommitment: React.FC = () => (
    <Container>
      <Hud />
      <h3 className="text-xl md:text-2xl font-extrabold tracking-tight text-white mb-3">Compromisso de tempo diário</h3>
      <p className="text-sm text-[#C39BD3] mb-4">Quanto tempo por dia você vai investir para sair do ciclo?</p>
      <div className="grid md:grid-cols-2 gap-3">
        {[
          { v: "5", t: "5 min/dia — Começar agora" },
          { v: "10", t: "10 min/dia — Pronto pra mudar" },
          { v: "15", t: "15 min/dia — Compromisso de verdade" },
          { v: "20+", t: "20+ min/dia — Vou dar tudo" },
        ].map((o) => (
          <button
            key={o.v}
            onClick={() => {
              setAnswers((a) => ({ ...a, commitment: o.v }))
              play(SFX.ping)
              next(9, "step_12")
            }}
            className="flex items-center justify-between w-full rounded-2xl p-4 ring-1 ring-white/10 transition bg-gradient-to-br from-[#5e348f] to-[#3d225e] hover:scale-[1.02] shadow-[0_20px_60px_rgba(0,0,0,.35)]"
          >
            <span className="text-left text-[15px]">{o.t}</span>
            <Timer className="size-5 opacity-80" />
          </button>
        ))}
      </div>
      <p className="mt-4 text-xs opacity-80 italic">O futuro pune quem hesita.</p>
    </Container>
  )

  const PageOffer: React.FC = () => (
    <Container>
      <Hud />
      <h3 className="text-xl md:text-2xl font-extrabold tracking-tight text-white mb-4">Oferta Final</h3>
      <div className="grid gap-4">
        <div className="rounded-2xl p-5 ring-1 ring-white/10 bg-gradient-to-br from-[#1f3550] to-[#0f1c2b]">
          <div className="flex items-center gap-2 text-sm opacity-90"><Sparkles className="size-4"/> Em <b>5 dias</b> você sente tração. Em <b>14 dias</b>, rotina disciplinada — mesmo se já fracassou antes.</div>
        </div>

        <div className="grid md:grid-cols-3 gap-3">
          <div className="rounded-2xl p-4 ring-1 ring-white/10 bg-[#4B2E83]">
            <p className="text-sm">"Perdia cliente. Em 2 semanas fechei mais que em 3 meses."</p>
            <div className="mt-2 text-xs opacity-80">João — vendedor</div>
          </div>
          <div className="rounded-2xl p-4 ring-1 ring-white/10 bg-[#1d3a2b]">
            <p className="text-sm">"Travava no celular. Hoje termino o TCC e cumpro rotina."</p>
            <div className="mt-2 text-xs opacity-80">Larissa — estudante</div>
          </div>
          <div className="rounded-2xl p-4 ring-1 ring-white/10 bg-[#3b173b]">
            <p className="text-sm">"Não era preguiça; era falta de clareza. Faturei mais."</p>
            <div className="mt-2 text-xs opacity-80">Camila — empreendedora</div>
          </div>
        </div>

        <div className="rounded-2xl p-4 ring-1 ring-white/10 bg-gradient-to-br from-[#6a3a38] to-[#3a1f1e]">
          <p className="text-sm">
            A cada hora, dezenas entram. <b>Bônus Técnica X</b> limitado. Se voltar amanhã, pode não ter.
          </p>
        </div>

        <div className="flex items-center justify-between rounded-2xl p-5 ring-1 ring-white/10 bg-black/20">
          <div>
            <div className="text-sm opacity-90">Plano personalizado vitalício</div>
            <div className="text-2xl font-black text-[#FFCC48]">R$ 37</div>
            <div className="text-xs opacity-80">Acesso imediato + Bônus Técnica X (limitado)</div>
          </div>
          <button
            onClick={() => {
              play(SFX.ping)
              ;(window as any).__ga?.gainXp?.(50, "cta_checkout")
            }}
            className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl font-extrabold text-black bg-[#39FF88] hover:brightness-95 transition shadow-[0_20px_60px_rgba(57,255,136,.35)]"
          >
            QUERO ESMAGAR A PROCRASTINAÇÃO <ChevronRight className="size-5" />
          </button>
        </div>
      </div>

      <p className="mt-5 text-xs opacity-80 italic">Ou você ri da procrastinação hoje, ou ela ri de você amanhã.</p>
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

          {step === 3 && (
            <PageSliderCombo
              onSubmit={(scroll, delay) => {
                setAnswers((a) => ({ ...a, scrollLevel: scroll, delayFreq: delay }))
              }}
            />
          )}

          {step === 4 && (
            <PageRadio
              stepData={steps[3]}
              onSelect={(v) => {
                setAnswers((a) => ({ ...a, mirrorPain: v }))
                next(4, "step_4")
              }}
            />
          )}

          {step === 5 && (
            <PageCheckbox
              stepData={steps[4]}
              onChange={(vals) => setAnswers((a) => ({ ...a, damages: vals }))}
            />
          )}

          {step === 6 && (
            <PageRadio
              stepData={steps[5]}
              onSelect={(v) => {
                // primeiro clique salva prioridade, segundo clique (se já existe) salva firstImpact
                setAnswers((a) =>
                  a.priority ? { ...a, firstImpact: v } : { ...a, priority: v }
                )
                // dá XP e se ambos já definidos, avança
                const complete = !!answers.priority && !!answers.firstImpact
                next(4, "step_6")
                if (!complete && answers.priority) {
                  // já tinha prioridade, agora tem firstImpact
                  setTimeout(() => setStep(7), 50)
                }
                if (!answers.priority) {
                  // ainda falta firstImpact, mantém na mesma tela para segunda seleção
                }
              }}
            />
          )}

          {step === 7 && (
            <PageRadio
              stepData={steps[6]}
              onSelect={(v) => {
                setAnswers((a) => ({ ...a, vision12: v }))
                next(6, "step_7")
              }}
            />
          )}

          {step === 8 && <PageLoading />}

          {step === 9 && (
            <PageRadio
              stepData={steps[8]}
              onSelect={(v) => {
                setAnswers((a) => ({ ...a, quitPattern: v }))
                play(SFX.alarm)
                next(5, "step_9")
              }}
            />
          )}

          {step === 10 && (
            <PageRadio
              stepData={steps[9]}
              onSelect={() => {
                play(SFX.ping)
                next(5, "step_10")
              }}
            />
          )}

          {step === 11 && <PageDiagnosis />}

          {step === 12 && <PageCommitment />}

          {step === 13 && <PageOffer />}
        </motion.div>
      </AnimatePresence>
    </section>
  )
}