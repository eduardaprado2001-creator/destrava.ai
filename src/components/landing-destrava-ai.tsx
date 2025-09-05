import { useEffect, useRef, useState } from "react"
import { Quote } from "lucide-react"
import { motion } from "framer-motion"
import { GamificationLayer } from "./gamification-layer-refined"
import QuizDestravaAiNew from "./quiz-destrava-ai-new"

function NewsCard({
  tag,
  age,
  title,
  excerpt,
  author,
  color,
  stat,
}: { tag: string; age: string; title: string; excerpt: string; author: string; color: string; stat: string }) {
  const handleClick = () => {
    const id = `news_${title}`
    const key = "destravaai_newsreads_set"
    const set = new Set<string>(JSON.parse(localStorage.getItem(key) || "[]"))
    if (!set.has(id)) {
      set.add(id)
      localStorage.setItem(key, JSON.stringify([...set]))
      const aggKey = "destravaai_newsreads_count"
      const n = Number(localStorage.getItem(aggKey) || 0) + 1
      localStorage.setItem(aggKey, String(n))
      if (n === 1) (window as any).__ga?.gainXp(10, "leu_1_noticia")
      if (n === 3) (window as any).__ga?.gainXp(40, "leu_3_noticias")
    }
  }

  return (
    <article
      onClick={handleClick}
      className={`cursor-pointer rounded-2xl bg-gradient-to-br ${color} p-5 text-[#FCEEE3] shadow-[0_20px_60px_rgba(0,0,0,.35)] ring-1 ring-white/10 hover:scale-105 transition-transform duration-300`}
    >
      <div className="flex items-center gap-3 text-[11px] opacity-80">
        <span className="rounded-full bg-white/10 px-2 py-0.5">{tag}</span>
        <span>•</span>
        <span>{age}</span>
      </div>
      <h4 className="mt-3 text-lg font-extrabold tracking-tight text-white">{title}</h4>
      <p className="mt-2 text-sm opacity-90">{excerpt}</p>
      <div className="mt-4 flex items-center justify-between text-xs opacity-80">
        <span>{author}</span>
        <span>👁️ {stat}</span>
      </div>
    </article>
  )
}

function TestimonialCard({ name, city, text, color }: { name: string; city: string; text: string; color: string }) {
  return (
    <div className={`rounded-2xl p-5 text-[#FCEEE3] ring-1 ring-white/10 ${color}`}>
      <div className="flex items-center gap-2 text-[#FFCC48]">
        <Quote className="size-4" />
        <span className="text-xs">Depoimento</span>
      </div>
      <p className="mt-3 text-sm leading-relaxed">"{text}"</p>
      <div className="mt-4 text-xs opacity-80">
        {name} — {city}
      </div>
    </div>
  )
}

export default function LandingDestravaAi() {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [showQuiz, setShowQuiz] = useState(false)
  
  useEffect(() => {
    audioRef.current = new Audio(
      "data:audio/mp3;base64,//uQZAAAAAAAAAAAAAAAAAAAAAAAWGluZwAAAA8AAAACAAACcQAA...", // (silencioso de 1s — placeholder)
    )
  }, [])

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#2b1a4e] via-[#3c2569] to-[#4B2E83] text-white">
      <GamificationLayer />

      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-6xl px-4 py-5 flex items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-2xl bg-[#F25C54] grid place-items-center shadow-[0_0_30px_rgba(242,92,84,.45)] overflow-hidden">
            <img src="/ChatGPT Image 20 de ago. de 2025, 19_59_46.png" alt="Destrava Aí" className="w-full h-full object-cover" />
          </div>
          <div className="leading-tight">
            <p className="text-lg font-extrabold tracking-tight">Destrava Aí</p>
            <p className="text-xs text-[#C39BD3]">Produtividade sem enrolação</p>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-6 text-sm text-[#FCEEE3]">
          <a className="hover:text-white/90 transition" href="#noticias">
            Notícias
          </a>
          <a className="hover:text-white/90 transition" href="#relatos">
            Relatos
          </a>
          <a className="hover:text-white/90 transition" href="#como-funciona">
            Como funciona
          </a>
          <a
            className="px-4 py-2 rounded-xl bg-[#F25C54] hover:bg-[#ff6f68] transition shadow-[0_10px_30px_rgba(242,92,84,.35)]"
            href="#quiz"
            onClick={() => (window as any).__ga?.gainXp(20, "cta_click")}
          >
            Começar
          </a>
        </nav>
      </motion.header>

      <section className="relative mx-auto max-w-6xl px-4 pb-12 pt-16 md:pt-20">
        <div className="text-center">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8 flex justify-center"
          >
            <div className="size-16 rounded-2xl bg-[#F25C54] grid place-items-center shadow-[0_0_30px_rgba(242,92,84,.45)] overflow-hidden">
              <img src="/ChatGPT Image 20 de ago. de 2025, 19_59_46.png" alt="Destrava Aí" className="w-full h-full object-cover" />
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[0.9] text-[#FCEEE3] mb-6"
          >
            ⚡ Daqui a 1 ano, sua vida vai estar <span className="text-red-500">IGUAL</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-xl md:text-2xl text-red-400 font-bold mb-4 max-w-4xl mx-auto leading-relaxed"
          >
            Imagine olhar pra trás e ver 12 meses jogados no lixo, sem progresso, sem conquistas e odiando o espelho.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg md:text-xl text-[#C39BD3] mb-8 max-w-3xl mx-auto leading-relaxed"
          >
            Descubra agora o que tá te sabotando e receba um plano comprovado pra sair desse ciclo antes que seja tarde
            demais.
          </motion.p>
        </div>
      </section>

      <section id="noticias" className="mx-auto max-w-6xl px-4 pb-10">
        <motion.h2
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-2 text-xl md:text-2xl font-extrabold tracking-tight text-white/95"
        >
          <span>ÚLTIMAS NOTÍCIAS</span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, staggerChildren: 0.2 }}
          viewport={{ once: true }}
          className="mt-6 grid gap-5 md:grid-cols-3"
        >
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <NewsCard
              tag="Produtividade"
              age="2 horas atrás"
              title="Como o vício de scroll mata seu foco: 3h40 por dia no celular"
              excerpt="Estudo mostra que o brasileiro perde mais de 1.300 horas por ano no celular. Especialistas revelam como reverter hoje."
              author="Por Equipe Destrava Aí"
              color="from-[#5e348f] to-[#3d225e]"
              stat="2.8k"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <NewsCard
              tag="Psicologia"
              age="6 horas atrás"
              title="80% adiam tarefas importantes mesmo sabendo do prejuízo"
              excerpt="Investigação com 10 mil pessoas mostra padrões mentais e como quebrar o loop de procrastinação."
              author="Por Dra. Marina Silva"
              color="from-[#6a3a38] to-[#3a1f1e]"
              stat="4.2k"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <NewsCard
              tag="Tecnologia"
              age="8 horas atrás"
              title="IA que treina foco: como destravar em 14 dias com gamificação"
              excerpt="Ferramentas digitais ajudam a reconstruir disciplina com plano adaptativo e suporte inteligente."
              author="Por Tech Destrava"
              color="from-[#1f3550] to-[#0f1c2b]"
              stat="2.9k"
            />
          </motion.div>
        </motion.div>
      </section>

      <section id="relatos" className="mx-auto max-w-6xl px-4 pb-20">
        <motion.h3
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-2xl font-extrabold tracking-tight"
        >
          Relatos Reais de Quem Destravou
        </motion.h3>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, staggerChildren: 0.2 }}
          viewport={{ once: true }}
          className="mt-6 grid gap-5 md:grid-cols-3"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <TestimonialCard
              name="Bianca Lima, 28 anos"
              city="São Paulo, SP"
              text="Eu prometia todo domingo que ia mudar. O app me deu choque de realidade e um plano simples. Em 2 semanas entreguei o TCC travado há meses."
              color="bg-[#4B2E83]"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <TestimonialCard
              name="Roberto Silva, 35 anos"
              city="Rio de Janeiro, RJ"
              text="Minha esposa sempre dizia que meu problema era enrolação. Quando comecei o plano e cortei o scroll, nossa vida melhorou 100%."
              color="bg-[#1d3a2b]"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <TestimonialCard
              name="Mariana Costa, 31 anos"
              city="Belo Horizonte, MG"
              text="Parei 2 anos na inércia. Com o Destrava Aí, em 14 dias voltei a treinar, estudar e crescer no trabalho — sem ansiedade me travar."
              color="bg-[#3b173b]"
            />
          </motion.div>
        </motion.div>
      </section>

      <section id="como-funciona" className="mx-auto max-w-6xl px-4 pb-16">
        <div className="relative">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-20 -left-20 h-96 w-96 rounded-full bg-red-600/40 blur-[120px]" />
            <div className="absolute -bottom-20 -right-20 h-96 w-96 rounded-full bg-purple-900/50 blur-[120px]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-80 w-80 rounded-full bg-black/30 blur-[100px]" />
          </div>

          <div className="relative text-center">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              whileInView={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="flex justify-center mb-8"
            >
              <div className="size-16 rounded-2xl bg-gradient-to-br from-red-600 to-red-800 grid place-items-center shadow-[0_20px_60px_rgba(220,38,38,.8)] ring-2 ring-red-500/30">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
              </div>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[0.9] text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.9)] mb-8"
            >
              Você Tá Perdendo Sua Vida <span className="text-red-500">e Nem Percebe…</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-lg md:text-xl text-gray-300 leading-relaxed font-medium max-w-3xl mx-auto mb-12"
            >
              Cada minuto enrolando é um passo a mais na mesma vida que você diz odiar. Quer ver o estrago real que a
              procrastinação tá causando? Responda o quiz e encare a verdade na sua cara.
            </motion.p>

            <motion.a
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.3 }}
              viewport={{ once: true }}
              onClick={() => {
                (window as any).__ga?.gainXp?.(50, "cta_click")
                setShowQuiz(true)
              }}
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold text-xl rounded-2xl shadow-[0_20px_60px_rgba(220,38,38,.6)] hover:shadow-[0_25px_70px_rgba(220,38,38,.8)] transform transition-all duration-300 ring-2 ring-red-500/30 hover:ring-red-400/50"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
              Quero Encarar a Verdade Agora
            </motion.a>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              viewport={{ once: true }}
              className="mt-4 text-sm text-gray-400"
            >
              Resultado imediato • 100% anônimo • Choque de realidade garantido
            </motion.p>
          </div>
        </div>
      </section>

      {showQuiz && <QuizDestravaAiNew />}

      <footer className="border-t border-white/10 bg-[#381f66]/60 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-[#FCEEE3] flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="size-8 rounded-xl bg-[#F25C54] grid place-items-center overflow-hidden">
              <img src="/ChatGPT Image 20 de ago. de 2025, 19_59_46.png" alt="Destrava Aí" className="w-full h-full object-cover" />
            </div>
            <span>© {new Date().getFullYear()} Destrava Aí — Todos os direitos reservados</span>
          </div>
          <div className="flex items-center gap-5">
            <a className="hover:text-white" href="#politica">
              Política de Privacidade
            </a>
            <a className="hover:text-white" href="#termos">
              Termos
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}