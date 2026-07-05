import { motion } from 'framer-motion';
import { BookOpen, Code, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const NotebookHero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-paper py-20 px-4 sm:px-6 lg:px-8">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating paper scraps */}
        <motion.div
          className="absolute top-20 left-10 w-24 h-32 bg-paper-page rounded-hand border-2 border-ink/10 shadow-paper opacity-60"
          animate={{ 
            y: [0, -15, 0],
            rotate: [0, 3, 0, -3, 0]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-40 right-10 w-32 h-24 bg-notebook-yellow/20 rounded-hand-lg border-2 border-ink/10 shadow-paper opacity-60"
          animate={{ 
            y: [0, 20, 0],
            rotate: [0, -2, 0, 2, 0]
          }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        
        {/* Drifting clouds */}
        <motion.div
          className="absolute top-32 right-1/4 w-40 h-20 bg-white/50 rounded-full blur-xl"
          animate={{ x: [0, 30, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute top-60 left-1/3 w-32 h-16 bg-white/40 rounded-full blur-lg"
          animate={{ x: [0, -25, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear", delay: 2 }}
        />
      </div>

      <div className="relative max-w-6xl mx-auto text-center z-10">
        {/* Animated notebook opening effect */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0, rotateY: 30 }}
          animate={{ scale: 1, opacity: 1, rotateY: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="inline-block mb-8"
        >
          <div className="relative">
            <BookOpen className="w-20 h-20 sm:w-24 sm:h-24 text-ink" strokeWidth={1.5} />
            <motion.div
              className="absolute -top-2 -right-2"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
            >
              <Sparkles className="w-8 h-8 text-notebook-yellow fill-notebook-yellow/30" strokeWidth={1.5} />
            </motion.div>
          </div>
        </motion.div>

        {/* Main heading */}
        <motion.h1
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-5xl sm:text-6xl lg:text-7xl font-primary font-bold text-ink mb-6"
        >
          Learn. Play. Build.
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-lg sm:text-xl text-ink/80 max-w-2xl mx-auto mb-8 font-secondary leading-relaxed"
        >
          Master React through interactive adventures, not boring lectures. 
          Tiny lessons, real coding challenges, and a world waiting to be explored.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <motion.button
            whileHover={{ scale: 1.05, rotate: -1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/learn')}
            className="btn-primary text-lg px-8 py-4"
          >
            Start Your Adventure
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05, rotate: 1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/map')}
            className="btn-secondary text-lg px-8 py-4"
          >
            Explore the World
          </motion.button>
        </motion.div>

        {/* Animated doodles */}
        <motion.div
          className="absolute -bottom-20 -left-10 hidden lg:block"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ delay: 0.8, duration: 1.5 }}
        >
          <svg width="120" height="80" viewBox="0 0 120 80" className="opacity-60">
            <motion.path
              d="M10 40 Q30 10, 50 40 T90 40 T110 40"
              fill="none"
              stroke="#2B2B2B"
              strokeWidth="2"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, delay: 0.8 }}
            />
          </svg>
        </motion.div>

        <motion.div
          className="absolute -bottom-10 -right-10 hidden lg:block"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 1, type: "spring", stiffness: 150 }}
        >
          <Code className="w-16 h-16 text-notebook-blue opacity-60" strokeWidth={1.5} />
        </motion.div>
      </div>
    </section>
  );
};
