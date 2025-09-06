import React from 'react';
import { motion } from 'framer-motion';
import { NewsCard } from '../shared/news-card';

const newsData = [
  {
    tag: "Produtividade",
    age: "2 horas atrás",
    title: "Como o vício de scroll mata seu foco: 3h40 por dia no celular",
    excerpt: "Estudo mostra que o brasileiro perde mais de 1.300 horas por ano no celular. Especialistas revelam como reverter hoje.",
    author: "Por Equipe Destrava Aí",
    color: "from-[#5e348f] to-[#3d225e]",
    stat: "2.8k"
  },
  {
    tag: "Psicologia",
    age: "6 horas atrás",
    title: "80% adiam tarefas importantes mesmo sabendo do prejuízo",
    excerpt: "Investigação com 10 mil pessoas mostra padrões mentais e como quebrar o loop de procrastinação.",
    author: "Por Dra. Marina Silva",
    color: "from-[#6a3a38] to-[#3a1f1e]",
    stat: "4.2k"
  },
  {
    tag: "Tecnologia",
    age: "8 horas atrás",
    title: "IA que treina foco: como destravar em 14 dias com gamificação",
    excerpt: "Ferramentas digitais ajudam a reconstruir disciplina com plano adaptativo e suporte inteligente.",
    author: "Por Tech Destrava",
    color: "from-[#1f3550] to-[#0f1c2b]",
    stat: "2.9k"
  }
];

export function NewsSection() {
  return (
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
        {newsData.map((news, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true }}
          >
            <NewsCard {...news} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}