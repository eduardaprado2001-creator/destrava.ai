import React from 'react';
import { Quote } from 'lucide-react';
import { motion } from 'framer-motion';

interface TestimonialCardProps {
  name: string;
  city: string;
  text: string;
  color: string;
}

export function TestimonialCard({ name, city, text, color }: TestimonialCardProps) {
  return (
    <motion.div
      className={`rounded-2xl p-6 text-[#FCEEE3] ring-1 ring-white/10 shadow-[0_15px_40px_rgba(0,0,0,.3)] ${color}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02, y: -2 }}
    >
      <div className="flex items-center gap-2 text-[#FFCC48] mb-3">
        <Quote className="size-5" />
        <span className="text-xs font-semibold uppercase tracking-wider">Depoimento</span>
      </div>
      <p className="text-sm leading-relaxed font-medium">"{text}"</p>
      <div className="mt-5 text-xs opacity-80 font-medium">
        <span className="text-white">{name}</span>
        <span className="mx-2">—</span>
        <span>{city}</span>
      </div>
    </motion.div>
  );
}