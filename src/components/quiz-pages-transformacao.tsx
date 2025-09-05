"use client"

import React, { useMemo, useState } from "react"
import { motion } from "framer-motion"
import { Check, ChevronRight, Loader2 } from "lucide-react"

/**
 * QuizPagesTransformacao – 13 páginas separadas (RPG de Transformação)
 * - Mantém as MESMAS cores e padrões da tua landing.
 * - Cada página exporta um componente independente.
 * - Estrutura fixa por página: HUD, SFX, Animação, Interação, Recompensa, CTA.
 * - Usa as cores pedidas: #FF3B3B (headline), #FF6A00 (CTA), e CSS vars para --neon-green, --dirty-white, --bg-dark.
 * - Props comuns (PageProps) para integrar com teu fluxo (Bolt/Next): progress/xp/avatar/answers + callbacks.
 */

// ========================= Shared Theme & Utils =========================
export const THEME = {
  red: "#FF3B3B", // headline/alerta
  orange: "#FF6A00", // CTA laranja radioativo (secundário)
  coral: "#F25C54", // SEU acento principal
  lilac: "#C39BD3", // texto secundário
  dirty: "#FCEEE3", // branco sujo do site
  bgFrom: "#2b1a4e",
  bgVia: "#3c2569",
  bgTo: "#4B2E83",
}

export type PageProps = {
  progress: number // 0..100
  xp: number // XP atual
  avatarState: string // descrição do avatar
  answers: Record<string, any>
  setAnswer: (key: string, value: any) => void
  gainXp: (amount: number, reason?: string) => void
  onNext: () => void
}

export const SFX = {
  ping: "data:audio/mp3;base64,//uQZAAAA...ping", // substitua pelos teus
  scan: "data:audio/mp3;base64,//uQZAAAA...scan",
  alarm: "data:audio/mp3;base64,//uQZAAAA...alarm",
  boom: "data:audio/mp3;base64,//uQZAAAA...boom",
}

export function play(src?: string, vol = 0.25) {
  if (!src) return
  try {
    const a = new Audio(src)
    a.volume = vol
    a.play().catch(() => {})
  } catch {}
}

export function Hud({ progress, xp, avatarState }: { progress: number; xp: number; avatarState: string }) {
  return (
    <div className="mb-6 flex items-center justify-between text-xs">
      <div className="flex items-center gap-3">
        <span className="px-2 py-1 rounded-full bg-white/10" style={{ color: THEME.dirty }}>XP {xp}/140</span>
        <span className="px-2 py-1 rounded-full bg-white/10" style={{ color: THEME.dirty }}>
          Avatar: {avatarState}
        </span>
      </div>
      <div className="flex-1 mx-4 h-2 rounded-full bg-white/10 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ type: "spring", stiffness: 140, damping: 22 }}
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${THEME.red}, ${THEME.orange})` }}
        />
      </div>
      <span className="opacity-80" style={{ color: THEME.dirty }}>{progress}%</span>
    </div>
  )
}

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="rounded-3xl p-6 md:p-8 ring-1 ring-white/10 shadow-[0_20px_60px_rgba(0,0,0,.35)] bg-gradient-to-b from-[#2b1a4e] via-[#3c2569] to-[#4B2E83]"
      style={{ color: THEME.dirty }}
    >
      {children}
    </div>
  )
}

function CTA({ children, onClick, color = THEME.coral, icon = true, disabled = false }: any) {
  return (
    <button
      disabled={disabled}
      onClick={() => {
        play(SFX.ping)
        onClick?.()
      }}
      className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl font-extrabold text-white transition shadow-[0_20px_60px_rgba(242,92,84,.35)] ring-2 ring-red-500/30 hover:ring-red-400/50 hover:brightness-110 disabled:opacity-40"
      style={{ background: color }}
    >
      {children} {icon && <ChevronRight className="size-5" />}
    </button>
  )
}

function RadioItem({ label, active, onClick }: { label: string; active?: boolean; onClick: () => void }) {
  return (
    <button
      onClick={() => {
        play(SFX.ping)
        onClick()
      }}
      className={`flex items-center justify-between w-full rounded-2xl p-4 ring-1 ring-white/10 transition shadow-[0_20px_60px_rgba(0,0,0,.35)] ${
        active ? "bg-gradient-to-br from-[#6a3a38] to-[#3a1f1e] scale-[1.02]" : "bg-gradient-to-br from-[#1f3550] to-[#0f1c2b]"
      }`}
    >
      <span className="text-left text-[15px]">{label}</span>
      {active ? <Check className="size-5 text-[#FFCC48]" /> : <span className="size-5" />}
    </button>
  )
}

// ========================= P1 – Tela Inicial =========================
export function Page01({ progress, xp, avatarState, onNext, gainXp }: PageProps) {
  return (
    <Frame>
      <Hud progress={progress} xp={xp} avatarState={avatarState} />

      <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-3" style={{ color: THEME.red }}>
        Daqui a 1 ano sua vida vai estar IGUAL — travada, sem dinheiro e sem orgulho.
      </h1>
      <p className="text-sm mb-5" style={{ color: THEME.dirty }}>
        Descubra agora o que te sabota e receba um plano comprovado.
      </p>

      <div className="grid gap-3">
        {["Você gasta 3h40/dia no celular (= 1.345h/ano). Investe em quê?",
          "Cada hora de enrolação = 1 oportunidade morta.",
          "Você já perdeu anos procrastinando. Vai repetir?",
          "Esse quiz é espelho. Vai doer."]
          .map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="rounded-2xl p-4 ring-1 ring-white/10 bg-gradient-to-br from-[#5e348f] to-[#3d225e]"
            >
              <p className="text-sm opacity-90">{t}</p>
            </motion.div>
          ))}
      </div>

      <div className="mt-6">
        <button
          onClick={() => {
            play(SFX.ping)
            gainXp(1, "p1_start")
            onNext()
          }}
          className="w-full flex items-center justify-between rounded-2xl p-4 ring-1 ring-white/10 transition shadow-[0_20px_60px_rgba(0,0,0,.35)] bg-gradient-to-br from-[#FF6A00] to-[#FF3B3B] hover:scale-[1.02]"
        >
          <span className="text-left text-[15px] font-bold">COMEÇAR O DIAGNÓSTICO</span>
          <ChevronRight className="size-5 opacity-80" />
        </button>
      </div>

      <p className="mt-4 text-xs opacity-80 italic">Quem foge da verdade, casa com a mentira.</p>
    </Frame>
  )
}

// ========================= P2 – Idade =========================
export function Page02({ progress, xp, avatarState, onNext, gainXp, setAnswer }: PageProps) {
  const opts = [
    "Menos de 20 — Ainda dá tempo de virar tudo.",
    "21 a 29 — Agora ou perde os melhores anos.",
    "30 a 39 — Ou muda, ou começa a enterrar sonhos.",
    "40 a 49 — É hoje ou nunca.",
    "50+ — Procrastinar agora é suicídio de futuro.",
  ]
  return (
    <Frame>
      <Hud progress={progress} xp={xp} avatarState={avatarState} />
      <h3 className="text-xl md:text-2xl font-extrabold tracking-tight text-white mb-3">⌛ "Sua idade diz muito sobre o quanto a procrastinação já vem roubando da sua vida. Quantos anos você tem?"</h3>
      <div className="grid gap-3">
        {opts.map((label) => (
          <button
            key={label}
            onClick={() => {
              play(SFX.ping)
              setAnswer("age", label)
              gainXp(2, "p2_age")
              onNext()
            }}
            className="flex items-center justify-between w-full rounded-2xl p-4 ring-1 ring-white/10 transition shadow-[0_20px_60px_rgba(0,0,0,.35)] bg-gradient-to-br from-[#1f3550] to-[#0f1c2b] hover:scale-[1.02]"
          >
            <span className="text-left text-[15px]">{label}</span>
            <ChevronRight className="size-5 opacity-80" />
          </button>
        ))}
      </div>
      <p className="mt-4 text-xs opacity-80 italic">Cada década sem ação é um caixão pro teu potencial.</p>
    </Frame>
  )
}

// ========================= P3 – Prisão Digital + Adiamento =========================
export function Page03({ progress, xp, avatarState, onNext, gainXp, setAnswer }: PageProps) {
  const [scroll, setScroll] = useState(5)
  const [delay, setDelay] = useState<string>("")
  const legend = [
    "Nada", "Quase nada", "Pouco", "Moderado", "Considerável", "Frequente",
    "Muito", "Quase todo dia", "Todo dia", "Destrói meu foco", "Acaba comigo",
  ]
  return (
    <Frame>
      <Hud progress={progress} xp={xp} avatarState={avatarState} />
      <h3 className="text-xl md:text-2xl font-extrabold tracking-tight text-white mb-3">Prisão Digital + Adiamento</h3>
      <p className="text-sm text-[#C39BD3] mb-6">Quanto o scroll te destrói? Depois, com que frequência você adia o que importa.</p>

      <div className="rounded-2xl p-5 ring-1 ring-white/10 bg-gradient-to-br from-[#5e348f] to-[#3d225e]">
        <label className="text-sm opacity-90">Scroll no celular</label>
        <input
          type="range"
          min={0}
          max={10}
          value={scroll}
          onChange={(e) => setScroll(Number(e.target.value))}
          className="w-full mt-3 accent-[#F25C54]"
        />
        <div className="mt-2 text-xs opacity-80">{legend[scroll]}</div>
      </div>

      <div className="grid gap-3 mt-4">
        {["Sempre", "Frequentemente", "Às vezes", "Raramente"].map((opt) => (
          <RadioItem key={opt} label={opt} active={delay === opt} onClick={() => setDelay(opt)} />
        ))}
      </div>

      <div className="mt-5 flex justify-end">
        <CTA
          onClick={() => {
            setAnswer("scroll", scroll)
            setAnswer("delay", delay)
            gainXp(6, "p3_combo")
            onNext()
          }}
          disabled={!delay}
        >
          Continuar
        </CTA>
      </div>
      <p className="mt-4 text-xs opacity-80 italic">Teu polegar é o carrasco dos teus objetivos.</p>
    </Frame>
  )
}

// ========================= P4 – Reflexo do Fracasso =========================
export function Page04({ progress, xp, avatarState, onNext, gainXp, setAnswer }: PageProps) {
  const opts = ["Sempre", "Muitas vezes", "Às vezes"]
  return (
    <Frame>
      <Hud progress={progress} xp={xp} avatarState={avatarState} />
      <h3 className="text-xl md:text-2xl font-extrabold tracking-tight text-white mb-3">No espelho, você tá matando sua melhor versão?</h3>
      <div className="grid gap-3">
        {opts.map((label) => (
          <button
            key={label}
            onClick={() => {
              play(SFX.ping)
              setAnswer("mirror", label)
              gainXp(4, "p4_mirror")
              onNext()
            }}
            className="flex items-center justify-between w-full rounded-2xl p-4 ring-1 ring-white/10 transition shadow-[0_20px_60px_rgba(0,0,0,.35)] bg-gradient-to-br from-[#1f3550] to-[#0f1c2b] hover:scale-[1.02]"
          >
            <span className="text-left text-[15px]">{label}</span>
            <ChevronRight className="size-5 opacity-80" />
          </button>
        ))}
      </div>
      <p className="mt-4 text-xs opacity-80 italic">O espelho não mente: ou age, ou apodrece.</p>
    </Frame>
  )
}

// ========================= P5 – Prejuízo Já Causado =========================
export function Page05({ progress, xp, avatarState, onNext, gainXp, setAnswer }: PageProps) {
  const [set, setSet] = useState<string[]>([])
  const toggle = (v: string) =>
    setSet((arr) => (arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]).slice(0, 2))

  const items = ["Carreira", "Dinheiro", "Relacionamentos", "Saúde", "Confiança"]
  const reward = Math.min(set.length * 5, 10)
  return (
    <Frame>
      <Hud progress={progress} xp={xp} avatarState={avatarState} />
      <h3 className="text-xl md:text-2xl font-extrabold tracking-tight text-white mb-3">O que a procrastinação já destruiu? (máx 2)</h3>
      <div className="grid gap-3">
        {items.map((label) => (
          <RadioItem key={label} label={label} active={set.includes(label)} onClick={() => toggle(label)} />
        ))}
      </div>
      <div className="mt-5 flex justify-between items-center">
        <span className="text-xs opacity-80">XP previsto: +{reward}</span>
        <CTA
          onClick={() => {
            setAnswer("damages", set)
            gainXp(reward, "p5_damage")
            onNext()
          }}
          disabled={set.length === 0}
        >
          Continuar
        </CTA>
      </div>
      <p className="mt-4 text-xs opacity-80 italic">Cada área fodida é um grito do teu eu que desistiu.</p>
    </Frame>
  )
}

// ========================= P6 – Prioridade & Área =========================
export function Page06({ progress, xp, avatarState, onNext, gainXp, setAnswer, answers }: PageProps) {
  const [pick, setPick] = useState<string>(answers.priority || "")
  const [impact, setImpact] = useState<string>(answers.firstImpact || "")
  const areas = ["Carreira", "Dinheiro", "Saúde", "Projetos", "Relacionamentos", "Tudo de uma vez"]
  const ready = !!pick && !!impact
  return (
    <Frame>
      <Hud progress={progress} xp={xp} avatarState={avatarState} />
      <h3 className="text-xl md:text-2xl font-extrabold tracking-tight text-white mb-1">Se o foco viesse HOJE, qual prioridade #1?</h3>
      <div className="grid gap-3 mb-5">
        {areas.slice(0, 5).map((label) => (
          <RadioItem key={label} label={label} active={pick === label} onClick={() => setPick(label)} />
        ))}
      </div>
      <h4 className="text-sm text-[#C39BD3] mb-2">Onde a mudança bate primeiro?</h4>
      <div className="grid gap-3">
        {areas.map((label) => (
          <RadioItem key={label} label={label} active={impact === label} onClick={() => setImpact(label)} />
        ))}
      </div>
      <div className="mt-5 flex justify-end">
        <CTA
          onClick={() => {
            setAnswer("priority", pick)
            setAnswer("firstImpact", impact)
            gainXp(4, "p6_priority")
            onNext()
          }}
          disabled={!ready}
        >
          Continuar
        </CTA>
      </div>
      <p className="mt-4 text-xs opacity-80 italic">A prioridade que escolhe define a vida que constrói.</p>
    </Frame>
  )
}

// ========================= P7 – Vida em 12 Meses =========================
export function Page07({ progress, xp, avatarState, onNext, gainXp, setAnswer }: PageProps) {
  const opts = [
    "Resultados reais, projetos do papel.",
    "Disciplina, confiança e orgulho.",
    "Rotina produtiva no controle.",
  ]
  return (
    <Frame>
      <Hud progress={progress} xp={xp} avatarState={avatarState} />
      <h3 className="text-xl md:text-2xl font-extrabold tracking-tight text-white mb-3">Daqui a 12 meses, como quer se enxergar?</h3>
      <div className="grid gap-3">
        {opts.map((label) => (
          <button
            key={label}
            onClick={() => {
              play(SFX.ping)
              setAnswer("vision12", label)
              gainXp(6, "p7_future")
              onNext()
            }}
            className="flex items-center justify-between w-full rounded-2xl p-4 ring-1 ring-white/10 transition shadow-[0_20px_60px_rgba(0,0,0,.35)] bg-gradient-to-br from-[#1f3550] to-[#0f1c2b] hover:scale-[1.02]"
          >
            <span className="text-left text-[15px]">{label}</span>
            <ChevronRight className="size-5 opacity-80" />
          </button>
        ))}
      </div>
      <p className="mt-4 text-xs opacity-80 italic">A vida que quer não chega — é construída.</p>
    </Frame>
  )
}

// ========================= P8 – Loading Neural + Coleta =========================
export function Page08({ progress, xp, avatarState, onNext, gainXp, setAnswer }: PageProps) {
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [a1, setA1] = useState(false)
  const [a2, setA2] = useState(false)
  return (
    <Frame>
      <Hud progress={progress} xp={xp} avatarState={avatarState} />
      <div className="flex items-center gap-2 text-sm opacity-90 mb-2">
        <Loader2 className="size-4 animate-spin" />
        <span>Processamento Neural: analisando suas respostas…</span>
      </div>
      <h3 className="text-xl md:text-2xl font-extrabold tracking-tight text-white mb-3">Seu diagnóstico está chegando</h3>
      <p className="text-sm text-[#C39BD3] mb-6">Na última semana, <b>1.024 pessoas</b> começaram igual você… e já sentiram mudança.</p>

      <label className="flex items-center gap-3 text-sm mb-2">
        <input type="checkbox" className="accent-[#F25C54]" checked={a1} onChange={() => setA1(!a1)} />
        Concordo em aplicar <b>5–15 min/dia</b> do plano.
      </label>
      <label className="flex items-center gap-3 text-sm mb-4">
        <input type="checkbox" className="accent-[#F25C54]" checked={a2} onChange={() => setA2(!a2)} />
        Quero receber apenas o <b>essencial</b>.
      </label>

      <div className="grid md:grid-cols-2 gap-3">
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Seu e-mail"
          className="rounded-xl bg-white/5 ring-1 ring-white/10 px-4 py-3 text-sm placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#F25C54]"
        />
        <input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Seu telefone (opcional)"
          className="rounded-xl bg-white/5 ring-1 ring-white/10 px-4 py-3 text-sm placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#F25C54]"
        />
      </div>

      <div className="mt-6 flex justify-end">
        <CTA
          onClick={() => {
            setAnswer("email", email)
            setAnswer("phone", phone)
            gainXp(5, "p8_loading")
            onNext()
          }}
          disabled={!email || !a1 || !a2}
        >
          Continuar
        </CTA>
      </div>
      <p className="mt-4 text-xs opacity-80 italic">Quem assume o compromisso, colhe o resultado.</p>
    </Frame>
  )
}

// ========================= P9 – Futuro Sem Ação =========================
export function Page09({ progress, xp, avatarState, onNext, gainXp, setAnswer }: PageProps) {
  const opts = ["Muitas (padrão)", "Algumas (dói)", "Raramente", "Nunca (😈)"]
  return (
    <Frame>
      <Hud progress={progress} xp={xp} avatarState={avatarState} />
      <p className="text-sm text-[#C39BD3] mb-3">Daqui a 1 ano igual… e em 5, um estranho cansado e arrependido.</p>
      <h3 className="text-xl md:text-2xl font-extrabold tracking-tight text-white mb-3">Quantas vezes começou com energia e largou no meio?</h3>
      <div className="grid gap-3">
        {opts.map((label) => (
          <button
            key={label}
            onClick={() => {
              play(SFX.ping)
              setAnswer("quitPattern", label)
              gainXp(5, "p9_future")
              onNext()
            }}
            className="flex items-center justify-between w-full rounded-2xl p-4 ring-1 ring-white/10 transition shadow-[0_20px_60px_rgba(0,0,0,.35)] bg-gradient-to-br from-[#1f3550] to-[#0f1c2b] hover:scale-[1.02]"
          >
            <span className="text-left text-[15px]">{label}</span>
            <ChevronRight className="size-5 opacity-80" />
          </button>
        ))}
      </div>
      <p className="mt-4 text-xs opacity-80 italic">Cada desistência é uma mini-morte.</p>
    </Frame>
  )
}

// ========================= P10 – Virada Mental + CTA Diagnóstico =========================
export function Page10({ progress, xp, avatarState, onNext, gainXp }: PageProps) {
  return (
    <Frame>
      <Hud progress={progress} xp={xp} avatarState={avatarState} />
      <h3 className="text-xl md:text-2xl font-extrabold tracking-tight text-white mb-3">Virada mental: a última chamada</h3>
      <p className="text-sm text-[#C39BD3] mb-6">
        Ou você controla a mente, ou a procrastinação te controla. Suas respostas já revelaram o que te prende.
      </p>
      <div className="mt-6">
        <button
          onClick={() => {
            play(SFX.ping)
            gainXp(5, "p10_cta_diag")
            onNext()
          }}
          className="w-full flex items-center justify-between rounded-2xl p-4 ring-1 ring-white/10 transition shadow-[0_20px_60px_rgba(0,0,0,.35)] bg-gradient-to-br from-[#F25C54] to-[#FF3B3B] hover:scale-[1.02]"
        >
          <span className="text-left text-[15px] font-bold">VER MEU DIAGNÓSTICO PERSONALIZADO</span>
          <ChevronRight className="size-5 opacity-80" />
        </button>
      </div>
      <p className="mt-4 text-xs opacity-80 italic">Clareza sem ação é autoengano.</p>
    </Frame>
  )
}

// ========================= P11 – Diagnóstico Dinâmico =========================
export function Page11({ progress, xp, avatarState, onNext, gainXp, answers }: PageProps) {
  const severity: "ALTO" | "MÉDIO" | "EXTREMO" = useMemo(() => {
    const s = typeof answers.scroll === "number" ? answers.scroll : 5
    const d = String(answers.delay || "")
    if (s >= 8 || d === "Sempre") return "EXTREMO"
    if (s >= 5 || d === "Frequentemente") return "ALTO"
    return "MÉDIO"
  }, [answers])

  const bullets = [
    `Área mais afetada: ${(answers.damages?.[0] || "carreira")}${answers.damages?.[1] ? ` e ${answers.damages?.[1]}` : ""}.`,
    `Gatilho de fuga: ${answers.scroll >= 7 ? "celular" : "adiamento/ansiedade"}.`,
    `Quebra de foco em: ${answers.age ? "horários críticos a ajustar" : "a definir"}.`,
  ]

  return (
    <Frame>
      <Hud progress={progress} xp={xp} avatarState={avatarState} />
      <h3 className="text-xl md:text-2xl font-extrabold tracking-tight text-white mb-4">Diagnóstico Final</h3>
      <div className="rounded-2xl p-5 ring-1 ring-white/10 bg-gradient-to-br from-[#1f3550] to-[#0f1c2b]">
        <div className="text-sm opacity-90">Seu nível de procrastinação:</div>
        <div className={`mt-1 text-2xl font-black ${
          severity === "EXTREMO" ? "text-red-400" : severity === "ALTO" ? "text-orange-300" : "text-[#FFCC48]"}`}>
          {severity}
        </div>
        <p className="mt-3 text-sm text-[#C39BD3]">
          {severity === "EXTREMO"
            ? "Você está na beira do abismo. Ou muda, ou afunda."
            : severity === "ALTO"
            ? "Piloto automático comendo tua energia e confiança."
            : "Você tenta, mas se sabota mais do que avança."}
        </p>
        <ul className="mt-4 grid gap-2 text-sm list-disc list-inside">
          {bullets.map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>
      </div>
      <div className="mt-6 flex justify-end">
        <CTA
          onClick={() => {
            gainXp(10, "p11_diag")
            onNext()
          }}
        >
          Continuar
        </CTA>
      </div>
      <p className="mt-4 text-xs opacity-80 italic">A dor de agora é a conta do que adiou.</p>
    </Frame>
  )
}

// ========================= P12 – Compromisso de Tempo =========================
export function Page12({ progress, xp, avatarState, onNext, gainXp, setAnswer }: PageProps) {
  const options = [
    { v: "5", t: "5 min/dia — Começar agora." },
    { v: "10", t: "10 min/dia — Pronto pra mudar." },
    { v: "15", t: "15 min/dia — Compromisso de verdade." },
    { v: "20+", t: "20+ min/dia — Vou dar tudo." },
  ]
  return (
    <Frame>
      <Hud progress={progress} xp={xp} avatarState={avatarState} />
      <h3 className="text-xl md:text-2xl font-extrabold tracking-tight text-white mb-3">Quanto tempo por dia você vai investir?</h3>
      <div className="grid md:grid-cols-2 gap-3">
        {options.map((o) => (
          <button
            key={o.v}
            onClick={() => {
              setAnswer("commitment", o.v)
              gainXp(9, "p12_commit")
              onNext()
            }}
            className="flex items-center justify-between w-full rounded-2xl p-4 ring-1 ring-white/10 transition bg-gradient-to-br from-[#5e348f] to-[#3d225e] hover:scale-[1.02] shadow-[0_20px_60px_rgba(0,0,0,.35)]"
          >
            <span className="text-left text-[15px]">{o.t}</span>
            <ChevronRight className="size-5 opacity-80" />
          </button>
        ))}
      </div>
      <p className="mt-4 text-xs opacity-80 italic">O futuro pune quem hesita.</p>
    </Frame>
  )
}

// ========================= P13 – Oferta Final =========================
export function Page13({ progress, xp, avatarState, onNext, gainXp }: PageProps) {
  return (
    <Frame>
      <Hud progress={progress} xp={xp} avatarState={avatarState} />
      <div className="rounded-2xl p-5 ring-1 ring-white/10 bg-gradient-to-br from-[#1f3550] to-[#0f1c2b] mb-4">
        <p className="text-sm">Em <b>5 dias</b> sente tração. Em <b>14 dias</b> rotina disciplinada — mesmo se já fracassou antes.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-3 mb-4">
        <div className="rounded-2xl p-4 ring-1 ring-white/10 bg-[#4B2E83]"><p className="text-sm">"Perdia cliente. Em 2 semanas fechei mais que em 3 meses."</p><div className="mt-2 text-xs opacity-80">João — vendedor</div></div>
        <div className="rounded-2xl p-4 ring-1 ring-white/10 bg-[#1d3a2b]"><p className="text-sm">"Travava no celular. Hoje termino o TCC e cumpro rotina."</p><div className="mt-2 text-xs opacity-80">Larissa — estudante</div></div>
        <div className="rounded-2xl p-4 ring-1 ring-white/10 bg-[#3b173b]"><p className="text-sm">"Não era preguiça; era falta de clareza. Faturei mais."</p><div className="mt-2 text-xs opacity-80">Camila — empreendedora</div></div>
      </div>

      <div className="rounded-2xl p-4 ring-1 ring-white/10 bg-gradient-to-br from-[#6a3a38] to-[#3a1f1e] mb-4">
        <p className="text-sm">A cada hora, dezenas entram. <b>Bônus Técnica X</b> limitado. Se voltar amanhã, pode não ter.</p>
      </div>

      <div className="flex items-center justify-between rounded-2xl p-5 ring-1 ring-white/10 bg-black/20">
        <div>
          <div className="text-sm opacity-90">Plano personalizado vitalício</div>
          <div className="text-2xl font-black text-[#FFCC48]">R$ 37</div>
          <div className="text-xs opacity-80">Acesso imediato + Bônus Técnica X (limitado)</div>
        </div>
        <CTA
          color={THEME.coral}
          onClick={() => {
            gainXp(5, "p13_cta")
            onNext()
          }}
        >
          QUERO ESMAGAR A PROCRASTINAÇÃO — R$37 VITALÍCIO
        </CTA>
      </div>

      <p className="mt-5 text-xs opacity-80 italic">Ou você ri da procrastinação hoje, ou ela ri da tua cara amanhã.</p>
    </Frame>
  )
}