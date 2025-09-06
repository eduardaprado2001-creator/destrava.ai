"use client"

import React, { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Page01Start } from "../pages/quiz/page-01-start"
import { Page02Age } from "../pages/quiz/page-02-age"
import { Page03Scroll } from "../pages/quiz/page-03-scroll"
import { Page04Mirror } from "../pages/quiz/page-04-mirror"
import { Page10Loading } from "../pages/quiz/page-10-loading"
import { Page11Diagnosis } from "../pages/quiz/page-11-diagnosis"
import { Page12Commitment } from "../pages/quiz/page-12-commitment"
import { Page13Offer } from "../pages/quiz/page-13-offer"

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
  const [currentPage, setCurrentPage] = useState(1) // Páginas: 1,2,3,4,10,11,12,13
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
    // Pula da página 4 direto para 10 (removemos páginas 5-9)
    if (currentPage === 4) {
      setCurrentPage(10)
    } else if (currentPage >= 13) {
      // Fim do quiz
      return
    } else {
      setCurrentPage(prev => prev + 1)
    }
    // Scroll para o topo da página quando muda de página
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // HUD Component
  const Hud = () => (
    <div className="mb-6 flex items-center justify-between text-xs">
      <div className="flex items-center gap-3">
        <span className="px-2 py-1 rounded-full bg-white/10 text-[#FCEEE3]">XP {xp}/140</span>
        <span className="px-2 py-1 rounded-full bg-white/10 text-[#FCEEE3]">
          Avatar: {avatarState}
        </span>
      </div>
      <div className="flex-1 mx-4 h-2 rounded-full bg-white/10 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ type: "spring", stiffness: 140, damping: 22 }}
          className="h-full rounded-full bg-gradient-to-r from-[#F25C54] to-[#FF3B3B]"
        />
      </div>
      <span className="opacity-80 text-[#FCEEE3]">{progress}%</span>
    </div>
  )

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

          <div className="relative mx-auto max-w-3xl w-full">
            <Hud />
            
            {currentPage === 1 && (
              <Page01Start onNext={onNext} gainXp={gainXp} />
            )}
            
            {currentPage === 2 && (
              <Page02Age onNext={onNext} gainXp={gainXp} setAnswer={setAnswer} />
            )}
            
            {currentPage === 3 && (
              <Page03Scroll onNext={onNext} gainXp={gainXp} setAnswer={setAnswer} />
            )}
            
            {currentPage === 4 && (
              <Page04Mirror onNext={onNext} gainXp={gainXp} setAnswer={setAnswer} />
            )}
            
            {currentPage === 10 && (
              <Page10Loading onNext={onNext} gainXp={gainXp} setAnswer={setAnswer} />
            )}
            
            {currentPage === 11 && (
              <Page11Diagnosis onNext={onNext} gainXp={gainXp} answers={answers} />
            )}
            
            {currentPage === 12 && (
              <Page12Commitment onNext={onNext} gainXp={gainXp} setAnswer={setAnswer} />
            )}
            
            {currentPage === 13 && (
              <Page13Offer onNext={onNext} gainXp={gainXp} />
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  )
}