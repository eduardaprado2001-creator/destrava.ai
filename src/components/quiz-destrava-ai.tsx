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

  // === Definição das Páginas (15) ===
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
      // P10 – Loading + social + coleta
      {
        id: 10,
        kind: "loading",
        title: "Processamento Neural",
        hudAvatar: "Olhos fechados, download de consciência.",
        progress: 68,
        xpReward: 5,
        insight: "Quem assume o compromisso, colhe o resultado.",
      },
      // P11 – Futuro sem ação + pergunta extra
      {
        id: 11,
        kind: "radio",
        title: "O futuro sem ação",
        hudAvatar: "Rosto meio luz/meio sombra.",
        progress: 72,
        xpReward: 5,
        question: "Quantas vezes você começou algo cheio de energia… e largou no meio, se sentindo um fracassado?",
        choices: [
          { label: "Muitas vezes, é um padrão na minha vida", value: "muitas" },
          { label: "Algumas vezes, mas me destrói", value: "algumas" },
          { label: "Raramente, mas já aconteceu", value: "raro" },
          { label: "Nunca (mentira que ninguém marca 😈)", value: "nunca" },
        ],
        insight: "Cada desistência é uma mini‑morte.",
      },
      // P12 – Virada + CTA diagnóstico
      {
        id: 12,
        kind: "checkbox",
        title: "Virada mental: a última chamada",
        hudAvatar: "Armadura psíquica ativando (nível 5).",
        progress: 76,
        xpReward: 5,
        question: "",
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
        maxSelections: 11,
        insight: "Clareza sem ação é autoengano.",
      },
      // P13 – Diagnóstico dinâmico
      {
        id: 13,
        kind: "diagnosis",
        title: "Diagnóstico Final: a verdade nua",
        hudAvatar: "Armadura 7/10.",
        progress: 84,
        xpReward: 10,
        insight: "A dor de agora é a conta do que adiou.",
      },
      // P14 – Compromisso
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
      // P15 – Oferta final única
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

      {/* Warning Section */}
      {stepData.id === 1 && (
        <div className="mt-8 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="rounded-xl bg-gradient-to-r from-red-900/40 to-red-800/40 p-6 ring-1 ring-red-500/30"
          >
            <div className="flex items-start gap-3">
              <span className="text-2xl">💀</span>
              <p className="text-white leading-relaxed">
                "Você está preso num ciclo de adiamento que já tá roubando sua energia, destruindo sua autoconfiança e atrasando seus maiores sonhos.
                E se você continuar assim, sua vida não vai só ficar parada… ela vai andar pra trás."
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="rounded-xl bg-gradient-to-r from-gray-900/40 to-gray-800/40 p-6 ring-1 ring-gray-500/30"
          >
            <div className="flex items-start gap-3 mb-4">
              <span className="text-xl">❌</span>
              <h4 className="text-red-400 font-bold">Se nada mudar, daqui a meses você vai:</h4>
            </div>
            <ul className="space-y-2 ml-8 text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-red-400 mt-1">•</span>
                <span>Perder oportunidades que nunca mais voltam.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 mt-1">•</span>
                <span>Ver sua carreira e seu dinheiro travados.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 mt-1">•</span>
                <span>Se sentir cada vez mais frustrado, pesado e arrependido.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 mt-1">•</span>
                <span>Olhar pro espelho e odiar a pessoa que deixou tudo escapar.</span>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="rounded-xl bg-gradient-to-r from-emerald-900/40 to-emerald-800/40 p-6 ring-1 ring-emerald-500/30"
          >
            <div className="flex items-start gap-3 mb-4">
              <span className="text-xl">✨</span>
              <h4 className="text-emerald-400 font-bold">Mas há esperança:</h4>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <span className="text-xl">⚡</span>
                <p className="text-white leading-relaxed">
                  "Se você agir HOJE, pode reverter esse ciclo em poucas semanas e conquistar foco, disciplina e orgulho real — mesmo que já tenha tentado antes sem sucesso."
                </p>
              </div>
              
              <div className="flex items-start gap-3">
                <span className="text-xl">👉</span>
                <p className="text-emerald-200 leading-relaxed">
                  Não importa quantas vezes você fracassou, o plano certo vai virar sua mente e transformar sua vida.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      <motion.div 
        
        <!-- Seção de Aviso -->
        <div style="margin-top: 24px; space-y: 16px;">
          <div style="padding: 20px; background: linear-gradient(135deg, #7f1d1d, #991b1b); border-radius: 16px; border: 1px solid rgba(255,255,255,0.1); margin-bottom: 16px;">
            <p style="font-size: 16px; font-weight: bold; color: white; margin-bottom: 12px;">💀 "Você está preso num ciclo de adiamento que já tá roubando sua energia, destruindo sua autoconfiança e atrasando seus maiores sonhos.</p>
            <p style="font-size: 16px; color: #fca5a5;">E se você continuar assim, sua vida não vai só ficar parada… ela vai andar pra trás."</p>
          </div>
          
          <div style="padding: 20px; background: linear-gradient(135deg, #374151, #1f2937); border-radius: 16px; border: 1px solid rgba(255,255,255,0.1); margin-bottom: 16px;">
            <p style="font-size: 16px; font-weight: bold; color: #ef4444; margin-bottom: 12px;">❌ Se nada mudar, daqui a meses você vai:</p>
            <ul style="list-style: none; padding: 0; margin: 0; color: #d1d5db;">
              <li style="margin-bottom: 8px; font-size: 14px;">• Perder oportunidades que nunca mais voltam.</li>
              <li style="margin-bottom: 8px; font-size: 14px;">• Ver sua carreira e seu dinheiro travados.</li>
              <li style="margin-bottom: 8px; font-size: 14px;">• Se sentir cada vez mais frustrado, pesado e arrependido.</li>
              <li style="margin-bottom: 8px; font-size: 14px;">• Olhar pro espelho e odiar a pessoa que deixou tudo escapar.</li>
            </ul>
          </div>
          
          <div style="padding: 20px; background: linear-gradient(135deg, #065f46, #047857); border-radius: 16px; border: 1px solid rgba(255,255,255,0.1); margin-bottom: 16px;">
            <p style="font-size: 16px; font-weight: bold; color: #10b981; margin-bottom: 12px;">✨ Mas há esperança:</p>
            <p style="font-size: 16px; color: white; margin-bottom: 12px;">⚡ "Se você agir HOJE, pode reverter esse ciclo em poucas semanas e conquistar foco, disciplina e orgulho real — mesmo que já tenha tentado antes sem sucesso."</p>
            <p style="font-size: 16px; color: #6ee7b7;">👉 Não importa quantas vezes você fracassou, o plano certo vai virar sua mente e transformar sua vida.</p>
          </div>
        </div>
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

        {/* Conteúdo especial para a página Virada mental */}
        {stepData.id === 12 && (
          <motion.div
            className="space-y-4 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="bg-red-900/30 border border-red-500/30 rounded-2xl p-4">
              <p className="text-red-400 font-bold mb-2">🚨 Chega de dicas soltas que não funcionam.</p>
              <p className="text-white">O que você precisa é de um plano brutalmente claro, feito só pra você.</p>
            </div>

            <div className="bg-gradient-to-br from-[#1f3550] to-[#0f1c2b] rounded-2xl p-4 ring-1 ring-white/10">
              <p className="text-white font-bold mb-3">A real é simples:</p>
              <div className="space-y-2 text-sm">
                <p className="flex items-start gap-2">
                  <span className="text-[#F25C54]">👉</span>
                  <span>Seus próprios pensamentos estão te sabotando.</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-[#F25C54]">👉</span>
                  <span>Eles te fazem enrolar, perder tempo e desperdiçar ANOS da sua vida.</span>
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#4B2E83] to-[#3c2569] rounded-2xl p-4 ring-1 ring-white/10">
              <p className="text-white mb-3">
                <span className="text-yellow-400">⚡</span> Mas quando você acerta a mente, a procrastinação desmorona.
              </p>
              <p className="text-[#C39BD3] mb-3">
                No lugar dela nasce a versão sua que faz, termina e conquista.
              </p>
              <p className="text-white font-bold">
                Isso não é teoria de coach. <span className="text-[#F25C54]">👉 É sobrevivência.</span>
              </p>
            </div>

            <div className="bg-gray-900/50 border border-gray-600/30 rounded-2xl p-4">
              <p className="text-white mb-2">
                <span className="text-[#F25C54]">👉</span> Ou você muda agora, ou daqui a 1 ano sua vida vai estar exatamente igual — ou pior.
              </p>
              <p className="text-red-400 font-bold">
                <span className="text-red-500">💀</span> Essa pode ser sua última chance de virar o jogo.
              </p>
            </div>

            <div className="bg-gradient-to-br from-[#3b173b] to-[#2a1129] rounded-2xl p-4 ring-1 ring-white/10">
              <p className="text-white">
                <span className="text-yellow-400">📌</span> "Pra montar seu plano personalizado, marque os tópicos que mais fazem sentido pra você — e que vão se tornar sua arma contra a procrastinação."
              </p>
              <p className="text-[#C39BD3] mt-3 font-medium">
                Selecione todas as opções aplicáveis:
              </p>
            </div>
          </motion.div>
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
    const [phase, setPhase] = useState(0)
    const [loadingProgress, setLoadingProgress] = useState(0)
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [agree1, setAgree1] = useState(false)
    const [agree2, setAgree2] = useState(false)

    useEffect(() => {
      // Som de processamento/carregamento
      play(SFX.processing)

      // Fase 0: Carregamento inicial
      const timer1 = setTimeout(() => setPhase(1), 2000)
      
      // Fase 1: Choque de realidade
      const timer2 = setTimeout(() => setPhase(2), 4000)
      
      // Fase 2: Projeção de futuro
      const timer3 = setTimeout(() => setPhase(3), 6000)

      // Progresso da barra
      const progressInterval = setInterval(() => {
        setLoadingProgress(prev => {
          if (prev >= 100) {
            clearInterval(progressInterval)
            return 100
          }
          return prev + 2
        })
      }, 100)

      return () => {
        clearTimeout(timer1)
        clearTimeout(timer2)
        clearTimeout(timer3)
        clearInterval(progressInterval)
      }
    }, [])

    const handleContinue = () => {
      if (email && agree1 && agree2) {
        play(SFX.click)
        setAnswers(prev => ({ ...prev, email, phone }))
        next(stepData.xpReward, `step_${stepData.id}`)
      } else {
        play(SFX.error)
      }
    }

    return (
      <Container>
        <Hud />
        
        {/* Fase 0: Carregamento inicial */}
        <AnimatePresence>
          {phase >= 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-6"
            >
              <div className="flex items-center justify-center mb-4">
                <Loader2 className="size-8 animate-spin text-[#F25C54]" />
              </div>
              <p className="text-lg text-[#C39BD3]">
                🔄 Estamos avaliando suas respostas e preparando o diagnóstico personalizado para você…
              </p>
              
              {/* Barra de progresso */}
              <div className="mt-4 w-full bg-white/10 rounded-full h-2 overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#F25C54] to-[#FF3B3B] rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${loadingProgress}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Fase 1: Choque de realidade */}
        <AnimatePresence>
          {phase >= 1 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6"
            >
              <h3 className="text-xl md:text-2xl font-extrabold tracking-tight text-white mb-4">
                Processamento Neural
              </h3>
              
              <div className="bg-red-900/30 border border-red-500/30 rounded-2xl p-4 mb-4">
                <p className="text-red-400 font-bold mb-3">🚨 A verdade é dura:</p>
                <p className="text-white mb-4">
                  Se você continuar permitindo que a procrastinação controle sua vida, não vai ser apenas o seu tempo que será roubado…
                </p>
                <p className="text-red-300 font-bold mb-4">👉 Sua vida inteira vai ser engolida.</p>
                
                <div className="space-y-2 text-sm">
                  <p className="flex items-start gap-2">
                    <span className="text-red-400">❌</span>
                    <span>Sua carreira continuará travada e sem progressos.</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="text-red-400">❌</span>
                    <span>Seu dinheiro vai escorrer pelos dedos, sem saber como retomar o controle.</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="text-red-400">❌</span>
                    <span>Seus relacionamentos vão se enfraquecer, e você vai se afastar daquilo que importa.</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="text-red-400">❌</span>
                    <span>Sua confiança vai pro lixo, deixando você se sentindo incapaz de mudar.</span>
                  </p>
                </div>
                
                <p className="mt-4 text-white font-medium">
                  E o pior de tudo: as respostas que você forneceu até agora já revelam os pontos exatos onde você está se sabotando.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Fase 2: Projeção de futuro */}
        <AnimatePresence>
          {phase >= 2 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6"
            >
              <div className="bg-gray-900/50 border border-gray-600/30 rounded-2xl p-4">
                <p className="text-gray-300 font-bold mb-3">💀 "Se você não tomar uma atitude agora, daqui a 1 ano sua vida será a mesma."</p>
                <p className="text-gray-400">
                  E em 5 anos, talvez você nem se reconheça mais: cansado, frustrado, arrependido, enterrando sonhos que poderiam ser sua realidade.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Fase 3: Call to Action */}
        <AnimatePresence>
          {phase >= 3 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-center mb-6">
                <p className="text-2xl font-bold text-[#F25C54] mb-2">⚡ É agora ou nunca.</p>
                <p className="text-xl font-bold text-white mb-6">⏳ Agora é a hora de agir.</p>
              </div>

              <div className="space-y-4 mb-6">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agree1}
                    onChange={(e) => setAgree1(e.target.checked)}
                    className="mt-1 size-4 rounded border-white/20 bg-white/10 text-[#F25C54] focus:ring-[#F25C54]"
                  />
                  <span className="text-sm">
                    📈 Concordo em aplicar 5–15 min/dia do plano e quero dar o primeiro passo para a mudança.
                  </span>
                </label>

                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agree2}
                    onChange={(e) => setAgree2(e.target.checked)}
                    className="mt-1 size-4 rounded border-white/20 bg-white/10 text-[#F25C54] focus:ring-[#F25C54]"
                  />
                  <span className="text-sm">
                    ✔️ Quero receber apenas o essencial e focar no que vai me transformar.
                  </span>
                </label>
              </div>

              <div className="space-y-4 mb-6">
                <input
                  type="email"
                  placeholder="📧 Seu e-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-white/60 focus:border-[#F25C54] focus:ring-1 focus:ring-[#F25C54] outline-none"
                  required
                />
                <input
                  type="tel"
                  placeholder="📱 Seu WhatsApp"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full p-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-white/60 focus:border-[#F25C54] focus:ring-1 focus:ring-[#F25C54] outline-none"
                />
              </div>

              <button
                onClick={handleContinue}
                disabled={!email || !agree1 || !agree2}
                className="w-full rounded-2xl bg-[#F25C54] hover:bg-[#ff6f68] disabled:bg-gray-600 disabled:cursor-not-allowed p-4 font-bold text-white transition-all duration-300 shadow-[0_15px_40px_rgba(242,92,84,.4)] hover:shadow-[0_20px_50px_rgba(242,92,84,.6)]"
              >
                🔘 Continuar
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {stepData.insight && phase >= 3 && (
          <motion.p 
            className="mt-6 text-xs opacity-80 italic text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            💬 {stepData.insight}
          </motion.p>
        )}
      </Container>
    )
  }

  // === Componente Diagnóstico ===
  const PageDiagnosis: React.FC<{ stepData: StepQuestion }> = ({ stepData }) => {
    // Análise personalizada baseada nas respostas
    const scrollLevel = answers.scrollLevel || 5
    const age = answers.step_2 || ''
    const delayFreq = answers.step_3 || ''
    const mirrorPain = answers.step_5 || ''
    const damages = answers.step_6 || ['carreira']
    const priority = answers.step_7 || ''
    const vision12 = answers.step_8 || ''
    const quitPattern = answers.step_11 || ''
    
    // Cálculo do nível de procrastinação baseado em múltiplos fatores
    let severityScore = 0
    
    // Pontuação baseada no scroll
    if (scrollLevel >= 8) severityScore += 3
    else if (scrollLevel >= 6) severityScore += 2
    else if (scrollLevel >= 4) severityScore += 1
    
    // Pontuação baseada na frequência de procrastinação
    if (delayFreq === 'sempre') severityScore += 3
    else if (delayFreq === 'frequentemente') severityScore += 2
    else if (delayFreq === 'asvezes') severityScore += 1
    
    // Pontuação baseada na dor no espelho
    if (mirrorPain === 'sempre') severityScore += 2
    else if (mirrorPain === 'muitas') severityScore += 1
    
    // Pontuação baseada no padrão de desistência
    if (quitPattern === 'muitas') severityScore += 2
    else if (quitPattern === 'algumas') severityScore += 1
    
    // Determinar nível e descrição personalizada
    let level = "BAIXO"
    let levelColor = "text-green-400"
    let description = ""
    let personalizedInsights: string[] = []
    
    if (severityScore >= 8) {
      level = "EXTREMO"
      levelColor = "text-red-400"
      description = "Você está na beira do abismo. A procrastinação dominou sua vida completamente."
    } else if (severityScore >= 5) {
      level = "ALTO"
      levelColor = "text-orange-400"
      description = "Piloto automático destruindo sua energia, tempo e autoestima diariamente."
    } else if (severityScore >= 3) {
      level = "MÉDIO"
      levelColor = "text-yellow-400"
      description = "Você tenta, mas se sabota mais do que avança. Está na hora de quebrar esse ciclo."
    } else {
      level = "CONTROLADO"
      levelColor = "text-green-400"
      description = "Você tem controle, mas ainda há pontos de melhoria para otimizar sua produtividade."
    }

    // Insights personalizados baseados nas respostas específicas
    if (damages.length > 0) {
      const damageText = damages.length === 1 ? damages[0] : `${damages[0]} e ${damages[1]}`
      personalizedInsights.push(`🎯 Área mais prejudicada: ${damageText}`)
    }
    
    if (scrollLevel >= 7) {
      personalizedInsights.push(`📱 Vício digital severo: ${scrollLevel}/10 no scroll destrutivo`)
    } else if (scrollLevel >= 4) {
      personalizedInsights.push(`📱 Distração digital moderada: precisa de controle`)
    }
    
    if (age.includes('30-39') || age.includes('40-49') || age.includes('50+')) {
      personalizedInsights.push(`⏰ Urgência temporal: cada ano perdido é mais difícil de recuperar`)
    } else if (age.includes('21-29')) {
      personalizedInsights.push(`🚀 Janela de oportunidade: ainda está nos anos mais produtivos`)
    }
    
    if (delayFreq === 'sempre' || delayFreq === 'frequentemente') {
      personalizedInsights.push(`🔄 Padrão crônico: procrastinação virou seu modo padrão de operação`)
    }
    
    if (mirrorPain === 'sempre' || mirrorPain === 'muitas') {
      personalizedInsights.push(`💔 Autoestima em queda: você sabe que está desperdiçando seu potencial`)
    }
    
    if (quitPattern === 'muitas' || quitPattern === 'algumas') {
      personalizedInsights.push(`❌ Ciclo de desistência: histórico de projetos abandonados`)
    }
    
    if (priority === 'tudo') {
      personalizedInsights.push(`🎪 Falta de foco: tentar fazer tudo ao mesmo tempo é receita para não fazer nada`)
    } else if (priority) {
      personalizedInsights.push(`🎯 Prioridade identificada: ${priority} precisa de atenção imediata`)
    }
    
    // Se não tiver insights suficientes, adicionar alguns genéricos baseados no nível
    if (personalizedInsights.length < 3) {
      if (level === "EXTREMO") {
        personalizedInsights.push(`🚨 Estado crítico: procrastinação controlando 80%+ das suas decisões`)
        personalizedInsights.push(`⚰️ Zona de perigo: sonhos morrendo por falta de ação`)
      } else if (level === "ALTO") {
        personalizedInsights.push(`⚠️ Alerta vermelho: padrões destrutivos bem estabelecidos`)
        personalizedInsights.push(`🔥 Ponto de virada: ainda dá tempo, mas a janela está fechando`)
      } else if (level === "MÉDIO") {
        personalizedInsights.push(`⚖️ Equilíbrio instável: oscila entre produtivo e procrastinador`)
        personalizedInsights.push(`🎢 Montanha-russa: momentos de foco seguidos de autossabotagem`)
      }
    }

    const handleContinue = () => {
      play(SFX.click)
      next(stepData.xpReward, `step_${stepData.id}`)
    }

    return (
      <Container>
        <Hud />
        <motion.h3 
          className="text-xl md:text-2xl font-extrabold tracking-tight text-white mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {stepData.title}
        </motion.h3>

        <motion.div
          className="bg-gradient-to-br from-[#1f3550] to-[#0f1c2b] rounded-2xl p-6 ring-1 ring-white/10 mb-6"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-sm opacity-90 mb-2">Seu nível de procrastinação:</div>
          <div className={`text-4xl font-black mb-4 ${levelColor}`}>
            {level}
          </div>
          <p className="text-[#C39BD3] mb-4 leading-relaxed">
            {description}
          </p>
          <div className="space-y-3 text-sm">
            {personalizedInsights.slice(0, 4).map((insight, index) => (
              <motion.li
                key={index}
                className="flex items-start gap-3 p-2 rounded-lg bg-white/5"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.15 }}
              >
                <span className="text-[#F25C54] text-base leading-none">{insight.split(' ')[0]}</span>
                <span className="flex-1">{insight.substring(insight.indexOf(' ') + 1)}</span>
              </motion.li>
            ))}
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

  // === Componente Oferta ===
  const PageOffer: React.FC<{ stepData: StepQuestion }> = ({ stepData }) => {
    const handlePurchase = () => {
      play(SFX.victory)
      giveXp(50, "purchase_intent")
      // Aqui você adicionaria a integração com o sistema de pagamento
      alert("Redirecionando para pagamento...")
    }

    return (
      <Container>
        <Hud />
        <motion.h3 
          className="text-xl md:text-2xl font-extrabold tracking-tight text-white mb-6 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {stepData.title}
        </motion.h3>

        {/* Benefício principal */}
        <motion.div
          className="bg-gradient-to-br from-[#1f3550] to-[#0f1c2b] rounded-2xl p-6 ring-1 ring-white/10 mb-6"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm text-[#C39BD3] mb-2">✨ Transformação Garantida</p>
          <p className="text-white font-bold">
            Em <span className="text-[#F25C54]">5 dias</span> você sente tração. Em <span className="text-[#F25C54]">14 dias</span>, rotina disciplinada — mesmo se já fracassou antes.
          </p>
        </motion.div>

        {/* Depoimentos rápidos */}
        <motion.div
          className="grid md:grid-cols-3 gap-4 mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="bg-[#4B2E83] rounded-xl p-4 ring-1 ring-white/10">
            <p className="text-sm mb-2">"Perdia cliente. Em 2 semanas fechei mais que em 3 meses."</p>
            <div className="text-xs opacity-80">João — vendedor</div>
          </div>
          <div className="bg-[#1d3a2b] rounded-xl p-4 ring-1 ring-white/10">
            <p className="text-sm mb-2">"Travava no celular. Hoje termino o TCC e cumpro rotina."</p>
            <div className="text-xs opacity-80">Larissa — estudante</div>
          </div>
          <div className="bg-[#3b173b] rounded-xl p-4 ring-1 ring-white/10">
            <p className="text-sm mb-2">"Não era preguiça; era falta de clareza. Faturei mais."</p>
            <div className="text-xs opacity-80">Camila — empreendedora</div>
          </div>
        </motion.div>

        {/* Urgência */}
        <motion.div
          className="bg-gradient-to-br from-[#6a3a38] to-[#3a1f1e] rounded-2xl p-4 ring-1 ring-white/10 mb-6"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="text-sm text-center">
            A cada hora, dezenas entram. <span className="font-bold text-[#FFCC48]">Bônus Técnica X</span> limitado. Se voltar amanhã, pode não ter.
          </p>
        </motion.div>

        {/* Oferta principal */}
        <motion.div
          className="bg-black/20 rounded-2xl p-6 ring-1 ring-white/10 mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm opacity-90 mb-1">Plano personalizado vitalício</div>
              <div className="text-4xl font-black text-[#FFCC48] mb-1">R$ 37</div>
              <div className="text-xs opacity-80">Acesso imediato + Bônus Técnica X (limitado)</div>
            </div>
            <motion.button
              onClick={handlePurchase}
              className="bg-[#39FF88] hover:bg-[#2dd66f] text-black font-black px-6 py-4 rounded-2xl transition-all duration-300 shadow-[0_15px_40px_rgba(57,255,136,.4)] hover:shadow-[0_20px_50px_rgba(57,255,136,.6)]"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              QUERO ESMAGAR A PROCRASTINAÇÃO
            </motion.button>
          </div>
        </motion.div>

        {stepData.insight && (
          <motion.p 
            className="mt-6 text-xs opacity-80 italic text-center"
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

  // === Render Principal ===
  const currentStepData = steps.find(s => s.id === step)
  if (!currentStepData) return null

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#2b1a4e] via-[#3c2569] to-[#4B2E83] text-white p-4 flex items-center justify-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.4 }}
          className="w-full"
        >
          {currentStepData.kind === "radio" && (
            <PageRadio 
              stepData={currentStepData} 
              onSelect={(value) => {
                const key = `step_${currentStepData.id}` as keyof Answers
                setAnswers(prev => ({ ...prev, [key]: value }))
              }} 
            />
          )}
          
          {currentStepData.kind === "checkbox" && (
            <PageCheckbox 
              stepData={currentStepData} 
              onSelect={(values) => {
                const key = `step_${currentStepData.id}` as keyof Answers
                setAnswers(prev => ({ ...prev, [key]: values }))
              }} 
            />
          )}
          
          {currentStepData.kind === "slider" && (
            <PageSlider stepData={currentStepData} />
          )}
          
          {currentStepData.kind === "loading" && (
            <PageLoading stepData={currentStepData} />
          )}
          
          {currentStepData.kind === "diagnosis" && (
            <PageDiagnosis stepData={currentStepData} />
          )}
          
          {currentStepData.kind === "commitment" && (
            <PageRadio 
              stepData={currentStepData} 
              onSelect={(value) => {
                setAnswers(prev => ({ ...prev, commitment: value }))
              }} 
            />
          )}
          
          {currentStepData.kind === "offer" && (
            <PageOffer stepData={currentStepData} />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}