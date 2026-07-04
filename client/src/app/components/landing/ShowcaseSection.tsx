import { motion } from 'framer-motion';
import { Monitor, Map, BookOpen, Trophy, Sword, Award } from 'lucide-react';

const previews = [
  {
    title: 'Dashboard',
    icon: Monitor,
    description: 'Track your progress and stats',
    color: 'bg-notebook-blue/20',
  },
  {
    title: 'World Map',
    icon: Map,
    description: 'Explore themed learning lands',
    color: 'bg-notebook-green/20',
  },
  {
    title: 'Lessons',
    icon: BookOpen,
    description: 'Interactive coding challenges',
    color: 'bg-notebook-yellow/20',
  },
  {
    title: 'Achievements',
    icon: Trophy,
    description: 'Earn badges and stickers',
    color: 'bg-notebook-purple/20',
  },
  {
    title: 'Boss Battles',
    icon: Sword,
    description: 'Test your skills',
    color: 'bg-notebook-red/20',
  },
  {
    title: 'Certificates',
    icon: Award,
    description: 'Showcase your accomplishments',
    color: 'bg-notebook-blue/20',
  },
];

export const ShowcaseSection = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-paper">
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
            Explore the Adventure
          </h2>
          <p className="text-lg text-ink/70 max-w-2xl mx-auto font-secondary">
            A complete learning experience designed to keep you engaged.
          </p>
        </motion.div>

        {/* Preview Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {previews.map((preview, index) => (
            <motion.div
              key={preview.title}
              initial={{ y: 40, opacity: 0, scale: 0.95 }}
              whileInView={{ y: 0, opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -5, rotate: -1 }}
              className="group"
            >
              <div className={`card-hand ${preview.color} border-2 border-ink shadow-paper hover:shadow-paper-hover transition-all duration-normal`}>
                {/* Mock UI Preview */}
                <div className="bg-paper-page rounded-hand border-2 border-ink p-4 mb-4 min-h-[120px] flex items-center justify-center">
                  <preview.icon className="w-16 h-16 text-ink/40" strokeWidth={1.5} />
                </div>

                {/* Info */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-hand bg-paper-page border-2 border-ink flex items-center justify-center shadow-sticker">
                    <preview.icon className="w-5 h-5 text-ink" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="font-primary font-bold text-ink">
                      {preview.title}
                    </h3>
                    <p className="text-sm text-ink/70 font-secondary">
                      {preview.description}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
