import { motion } from 'framer-motion';
import { Code, Gamepad2, Trophy, Target, Zap, BookOpen, Layers, Rocket } from 'lucide-react';

const features = [
  {
    icon: Code,
    title: 'Interactive Lessons',
    description: 'Learn by doing with hands-on coding challenges in every lesson.',
    color: 'bg-notebook-yellow/30'
  },
  {
    icon: Gamepad2,
    title: 'Live Playground',
    description: 'Write and test code instantly with our built-in editor.',
    color: 'bg-notebook-blue/30'
  },
  {
    icon: Trophy,
    title: 'Boss Battles',
    description: 'Test your skills against epic coding challenges.',
    color: 'bg-notebook-red/30'
  },
  {
    icon: Zap,
    title: 'XP & Levels',
    description: 'Earn experience points and level up as you progress.',
    color: 'bg-notebook-green/30'
  },
  {
    icon: Target,
    title: 'Daily Challenges',
    description: 'Keep your streak alive with bite-sized daily missions.',
    color: 'bg-notebook-purple/30'
  },
  {
    icon: BookOpen,
    title: 'Achievements',
    description: 'Unlock badges and stickers for your accomplishments.',
    color: 'bg-notebook-yellow/30'
  },
  {
    icon: Layers,
    title: 'React Projects',
    description: 'Build real-world projects to solidify your knowledge.',
    color: 'bg-notebook-blue/30'
  },
  {
    icon: Rocket,
    title: 'World Exploration',
    description: 'Journey through themed lands mastering each concept.',
    color: 'bg-notebook-green/30'
  }
];

export const FeaturesSection = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-paper-page">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-primary font-bold text-ink mb-4">
            Your Adventure Awaits
          </h2>
          <p className="text-lg text-ink/70 max-w-2xl mx-auto font-secondary">
            Everything you need to master React, wrapped in a handcrafted learning experience.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -8, rotate: -1 }}
              className="group"
            >
              <div className={`card-hand h-full ${feature.color} border-2 border-ink hover:shadow-paper-hover transition-all duration-normal`}>
                <div className="flex flex-col items-center text-center p-4">
                  {/* Icon */}
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-16 h-16 rounded-hand bg-paper-page border-2 border-ink flex items-center justify-center mb-4 shadow-sticker"
                  >
                    <feature.icon className="w-8 h-8 text-ink" strokeWidth={1.5} />
                  </motion.div>

                  {/* Title */}
                  <h3 className="text-xl font-primary font-bold text-ink mb-2">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-ink/80 font-secondary leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
