import React from 'react';
import { motion } from 'framer-motion';

interface NewsCardProps {
  tag: string;
  age: string;
  title: string;
  excerpt: string;
  author: string;
  color: string;
  stat: string;
}

export function NewsCard({ tag, age, title, excerpt, author, color, stat }: NewsCardProps) {
  const handleClick = () => {
    const id = `news_${title}`;
    const key = "destravaai_newsreads_set";
    const set = new Set<string>(JSON.parse(localStorage.getItem(key) || "[]"));
    
    if (!set.has(id)) {
      set.add(id);
      localStorage.setItem(key, JSON.stringify([...set]));
      const aggKey = "destravaai_newsreads_count";
      const n = Number(localStorage.getItem(aggKey) || 0) + 1;
      localStorage.setItem(aggKey, String(n));
      
      if (n === 1) (window as any).__ga?.gainXp(10, "leu_1_noticia");
      if (n === 3) (window as any).__ga?.gainXp(40, "leu_3_noticias");
    }
  };

  return (
    <motion.article
      onClick={handleClick}
      className={`cursor-pointer rounded-2xl bg-gradient-to-br ${color} p-6 text-[#FCEEE3] shadow-[0_20px_60px_rgba(0,0,0,.35)] ring-1 ring-white/10 transition-all duration-300 hover:shadow-[0_25px_70px_rgba(0,0,0,.4)]`}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center gap-3 text-[11px] opacity-80">
        <span className="rounded-full bg-white/15 px-3 py-1 font-medium">{tag}</span>
        <span>•</span>
        <span>{age}</span>
      </div>
      <h4 className="mt-4 text-xl font-bold tracking-tight text-white leading-tight">{title}</h4>
      <p className="mt-3 text-sm opacity-90 leading-relaxed">{excerpt}</p>
      <div className="mt-5 flex items-center justify-between text-xs opacity-80">
        <span className="font-medium">{author}</span>
        <span className="flex items-center gap-1">
          <span>👁️</span>
          <span>{stat}</span>
        </span>
      </div>
    </motion.article>
  );
}