import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { GamificationLayer } from "./gamification-layer-refined"
import QuizDestravaAiNew from "./quiz-destrava-ai-new"
import { HeroSection } from "../pages/landing/hero-section"
import { NewsSection } from "../pages/landing/news-section"
import { TestimonialsSection } from "../pages/landing/testimonials-section"
import { CTASection } from "../pages/landing/cta-section"

export default function LandingDestravaAi() {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [showQuiz, setShowQuiz] = useState(false)
  
  useEffect(() => {
    audioRef.current = new Audio(
      "data:audio/mp3;base64,//uQZAAAAAAAAAAAAAAAAAAAAAAAWGluZwAAAA8AAAACAAACcQAA...", // (silencioso de 1s — placeholder)
    )
  }, [])

  const startQuiz = () => {
    setShowQuiz(true)
    // Scroll para o topo quando iniciar o quiz
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }, 100)
  }
  // Se showQuiz for true, mostra apenas o quiz
  if (showQuiz) {
    return (
      <div className="min-h-screen w-full bg-gradient-to-b from-[#2b1a4e] via-[#3c2569] to-[#4B2E83] text-white">
        <GamificationLayer />
        <QuizDestravaAiNew />
      </div>
    )
  }

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
            onClick={() => {
              (window as any).__ga?.gainXp(20, "cta_click")
              startQuiz()
            }}
          >
            Começar
          </a>
        </nav>
      </motion.header>

      <HeroSection onStartQuiz={startQuiz} />
      <NewsSection />
      <TestimonialsSection />
      <CTASection onStartQuiz={startQuiz} />
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