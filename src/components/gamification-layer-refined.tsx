import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Star, Target, Award, Zap } from 'lucide-react';

interface Achievement {
  id: string;
  title: string;
  description: string;
  xpReward: number;
  unlocked: boolean;
  icon: React.ReactNode;
}

interface UserProgress {
  xp: number;
  level: number;
  achievements: string[];
}

const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'leu_1_noticia',
    title: 'Primeiro Leitor',
    description: 'Leu sua primeira notícia',
    xpReward: 10,
    unlocked: false,
    icon: <Target className="size-4" />
  },
  {
    id: 'leu_3_noticias',
    title: 'Leitor Ativo',
    description: 'Leu 3 notícias',
    xpReward: 40,
    unlocked: false,
    icon: <Trophy className="size-4" />
  },
  {
    id: 'level_2',
    title: 'Subiu de Nível',
    description: 'Alcançou o nível 2',
    xpReward: 0,
    unlocked: false,
    icon: <Star className="size-4" />
  },
];

const XP_LEVELS = [0, 50, 150, 300, 500, 750, 1050, 1400, 1800, 2250];

export function GamificationLayer() {
  const [progress, setProgress] = useState<UserProgress>({ xp: 0, level: 1, achievements: [] });
  const [showNotification, setShowNotification] = useState(false);
  const [notification, setNotification] = useState<{ type: 'xp' | 'level' | 'achievement'; message: string; xp?: number }>({ type: 'xp', message: '' });
  const [showDashboard, setShowDashboard] = useState(false);

  useEffect(() => {
    // Initialize gamification on window object
    (window as any).__ga = {
      gainXp: (amount: number, achievementId?: string) => {
        const currentXp = Number(localStorage.getItem('destravaai_xp') || '0');
        const newXp = currentXp + amount;
        localStorage.setItem('destravaai_xp', String(newXp));
        
        const newLevel = calculateLevel(newXp);
        const currentLevel = progress.level;
        
        setProgress(prev => ({ ...prev, xp: newXp, level: newLevel }));
        
        // Show XP notification
        setNotification({ type: 'xp', message: `+${amount} XP`, xp: amount });
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 3000);
        
        // Check for level up
        if (newLevel > currentLevel) {
          setTimeout(() => {
            setNotification({ type: 'level', message: `Nível ${newLevel} alcançado!` });
            setShowNotification(true);
            setTimeout(() => setShowNotification(false), 4000);
          }, 1500);
        }
        
        // Check for achievement unlock
        if (achievementId) {
          const achievements = JSON.parse(localStorage.getItem('destravaai_achievements') || '[]');
          if (!achievements.includes(achievementId)) {
            achievements.push(achievementId);
            localStorage.setItem('destravaai_achievements', JSON.stringify(achievements));
            
            const achievement = ACHIEVEMENTS.find(a => a.id === achievementId);
            if (achievement) {
              setTimeout(() => {
                setNotification({ type: 'achievement', message: `Conquista desbloqueada: ${achievement.title}` });
                setShowNotification(true);
                setTimeout(() => setShowNotification(false), 4000);
              }, 2500);
            }
          }
        }
      }
    };

    // Load progress from localStorage
    const savedXp = Number(localStorage.getItem('destravaai_xp') || '0');
    const savedAchievements = JSON.parse(localStorage.getItem('destravaai_achievements') || '[]');
    const level = calculateLevel(savedXp);
    
    setProgress({ xp: savedXp, level, achievements: savedAchievements });
  }, []);

  const calculateLevel = (xp: number): number => {
    for (let i = XP_LEVELS.length - 1; i >= 0; i--) {
      if (xp >= XP_LEVELS[i]) {
        return i + 1;
      }
    }
    return 1;
  };

  const getXpForNextLevel = (): number => {
    return XP_LEVELS[progress.level] || XP_LEVELS[XP_LEVELS.length - 1];
  };

  const getXpProgress = (): number => {
    const currentLevelXp = XP_LEVELS[progress.level - 1] || 0;
    const nextLevelXp = getXpForNextLevel();
    const progressXp = progress.xp - currentLevelXp;
    const totalXpNeeded = nextLevelXp - currentLevelXp;
    return (progressXp / totalXpNeeded) * 100;
  };

  const unlockedAchievements = ACHIEVEMENTS.map(achievement => ({
    ...achievement,
    unlocked: progress.achievements.includes(achievement.id)
  }));

  return (
    <>
      {/* Fixed Gamification UI */}
      <div className="fixed top-4 right-4 z-50 flex items-center gap-3">
        <motion.div
          className="rounded-full bg-black/30 backdrop-blur-md px-4 py-2 text-sm font-medium text-white ring-1 ring-white/20"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center gap-2">
            <Zap className="size-4 text-yellow-400" />
            <span>Nível {progress.level}</span>
            <span className="text-yellow-400">{progress.xp} XP</span>
          </div>
        </motion.div>
        
        <motion.button
          onClick={() => setShowDashboard(true)}
          className="rounded-full bg-gradient-to-r from-purple-600 to-blue-600 p-3 text-white shadow-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <Trophy className="size-5" />
        </motion.button>
      </div>

      {/* XP Progress Bar */}
      <div className="fixed top-20 right-4 z-50 w-64">
        <div className="rounded-full bg-black/30 backdrop-blur-md p-2 ring-1 ring-white/20">
          <div className="h-2 rounded-full bg-white/20 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${getXpProgress()}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </div>
          <div className="mt-1 text-xs text-white/80 text-center">
            {progress.xp} / {getXpForNextLevel()} XP
          </div>
        </div>
      </div>

      {/* Notification System */}
      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ opacity: 0, y: -100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.8 }}
            className="fixed top-32 right-4 z-50 max-w-sm"
          >
            <div className={`rounded-xl p-4 backdrop-blur-lg ring-1 shadow-2xl ${
              notification.type === 'xp' ? 'bg-yellow-500/90 text-yellow-900 ring-yellow-400/50' :
              notification.type === 'level' ? 'bg-purple-500/90 text-white ring-purple-400/50' :
              'bg-emerald-500/90 text-white ring-emerald-400/50'
            }`}>
              <div className="flex items-center gap-2">
                {notification.type === 'xp' && <Zap className="size-5" />}
                {notification.type === 'level' && <Star className="size-5" />}
                {notification.type === 'achievement' && <Award className="size-5" />}
                <span className="font-bold">{notification.message}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Gamification Dashboard Modal */}
      <AnimatePresence>
        {showDashboard && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
            onClick={() => setShowDashboard(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl rounded-2xl bg-gradient-to-br from-[#1a1a2e] to-[#16213e] p-8 shadow-2xl ring-1 ring-white/10"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  <Trophy className="size-6 text-yellow-400" />
                  Seu Progresso
                </h2>
                <button
                  onClick={() => setShowDashboard(false)}
                  className="text-white/60 hover:text-white transition-colors"
                >
                  ✕
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Stats */}
                <div className="space-y-4">
                  <div className="rounded-xl bg-gradient-to-r from-purple-600/20 to-blue-600/20 p-4 ring-1 ring-white/10">
                    <div className="flex items-center gap-2 mb-2">
                      <Star className="size-5 text-yellow-400" />
                      <span className="font-semibold">Nível {progress.level}</span>
                    </div>
                    <div className="text-2xl font-bold text-white">{progress.xp} XP</div>
                    <div className="text-sm text-white/60">
                      {getXpForNextLevel() - progress.xp} XP para o próximo nível
                    </div>
                    
                    <div className="mt-3 h-3 rounded-full bg-white/10 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full transition-all duration-700"
                        style={{ width: `${getXpProgress()}%` }}
                      />
                    </div>
                  </div>

                  <div className="rounded-xl bg-gradient-to-r from-emerald-600/20 to-teal-600/20 p-4 ring-1 ring-white/10">
                    <div className="flex items-center gap-2 mb-2">
                      <Target className="size-5 text-emerald-400" />
                      <span className="font-semibold">Notícias Lidas</span>
                    </div>
                    <div className="text-2xl font-bold text-white">
                      {Number(localStorage.getItem('destravaai_newsreads_count') || '0')}
                    </div>
                  </div>
                </div>

                {/* Achievements */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Award className="size-5 text-purple-400" />
                    Conquistas
                  </h3>
                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    {unlockedAchievements.map((achievement) => (
                      <div
                        key={achievement.id}
                        className={`rounded-lg p-3 ring-1 transition-all ${
                          achievement.unlocked
                            ? 'bg-emerald-500/20 ring-emerald-400/30 text-white'
                            : 'bg-white/5 ring-white/10 text-white/60'
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <span className={achievement.unlocked ? 'text-emerald-400' : 'text-white/40'}>
                            {achievement.icon}
                          </span>
                          <span className="font-medium text-sm">{achievement.title}</span>
                          {achievement.unlocked && <span className="text-xs text-emerald-400">✓</span>}
                        </div>
                        <div className="text-xs opacity-80">{achievement.description}</div>
                        {achievement.xpReward > 0 && (
                          <div className="text-xs mt-1 text-yellow-400">+{achievement.xpReward} XP</div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}