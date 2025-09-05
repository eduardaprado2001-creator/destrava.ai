"use client"

import React, { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Page01, Page02, Page03, Page04, Page05, Page06, Page07, 
  Page08, Page09, Page10, Page11, Page12, Page13, 
  type PageProps 
} from "./quiz-pages-transformacao"

/**
 * QuizDestravaAiNew – Controlador principal do quiz com 13 páginas
 * Usa as páginas separadas do quiz-pages-transformacao.tsx
 */

const AVATAR_STATES = [
  "Sombra, olhos cansados.",
  "Foco leve nos olhos.",
  "Pescoço erguendo.",
  "Reflexo distorcido ao fundo.",
  "Fendas de luz no peito.",
  "Postura firme.",
  "Luz no olhar.",
  "Olhos fechados, download de consciência.",
  "Rosto meio luz/meio sombra.",
  "Armadura psíquica ativando (nível 5).",
  "Armadura 7/10.",
  "9/10, olhos em brasa.",
  "10/10, armadura completa.",
]

const PROGRESS_MAP = [8, 16, 24, 32, 40, 48, 56, 64, 72, 80, 88, 96, 100]

export default function QuizDestravaAiNew() {
  const [currentPage, setCurrentPage] = useState(1)
  const [xp, setXp] = useState(0)
  const [answers, setAnswers] = useState<Record<string, any>>({})

  const progress = PROGRESS_MAP[currentPage - 1] || 0
  const avatarState = AVATAR_STATES[currentPage - 1] || "Iniciando..."

  const gainXp = (amount: number, reason?: string) => {
    setXp(prev => {
      const newXp = prev + amount
      // Integração com sistema de gamificação global
      if ((window as any).__ga) {
        (window as any).__ga.gainXp(amount, reason)
      }
      return newXp
    })
  }

  const setAnswer = (key: string, value: any) => {
    setAnswers(prev => ({ ...prev, [key]: value }))
  }

  const onNext = () => {
    setCurrentPage(prev => Math.min(prev + 1, 13))
  }

  const pageProps: PageProps = {
    progress,
    xp,
    avatarState,
    answers,
    setAnswer,
    gainXp,
    onNext,
  }

  const PageComponents = [
    Page01, Page02, Page03, Page04, Page05, Page06, Page07,
    Page08, Page09, Page10, Page11, Page12, Page13
  ]

  const CurrentPageComponent = PageComponents[currentPage - 1]

  return (
    <section id="quiz" className="relative mx-auto max-w-6xl px-4 py-12">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
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

          <CurrentPageComponent {...pageProps} />
        </motion.div>
      </AnimatePresence>
    </section>
  )
}