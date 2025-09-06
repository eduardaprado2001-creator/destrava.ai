import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingDestravaAi from './components/landing-destrava-ai';
import QuizDestravaAi from './components/quiz-destrava-ai-original';
import { GamificationLayer } from './components/gamification-layer-refined';

function App() {
  return (
    <Router>
      <div className="min-h-screen w-full bg-gradient-to-b from-[#2b1a4e] via-[#3c2569] to-[#4B2E83] text-white">
        <GamificationLayer />
        <Routes>
          <Route path="/" element={<LandingDestravaAi />} />
          <Route path="/quiz" element={<QuizDestravaAi />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;