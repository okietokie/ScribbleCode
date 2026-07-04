import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, Clock, BookOpen } from 'lucide-react';

const comparisons = [
  {
    aspect: 'Learning Style',
    scribbleCode: 'Interactive missions',
    traditional: 'Passive videos',
  },
  {
    aspect: 'Lesson Format',
    scribbleCode: 'Bite-sized lessons',
    traditional: 'Long lectures',
  },
  {
    aspect: 'Approach',
    scribbleCode: 'Hands-on practice',
    traditional: 'Memorization',
  },
  {
    aspect: 'Outcome',
    scribbleCode: 'Building confidence',
    traditional: 'Copying code',
  },
];

export const ComparisonSection = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-paper-page">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-primary font-bold text-ink mb-4">
            Why ScribbleCode?
          </h2>
          <p className="text-lg text-ink/70 max-w-2xl mx-auto font-secondary">
            A better way to learn React through hands-on adventure.
          </p>
        </motion.div>

        {/* Comparison Table */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="card-hand border-2 border-ink shadow-paper overflow-hidden"
        >
          {/* Header */}
          <div className="grid grid-cols-3 gap-4 p-4 bg-notebook-yellow/30 border-b-2 border-ink">
            <div className="text-center font-primary font-bold text-ink">
              Aspect
            </div>
            <div className="text-center font-primary font-bold text-ink">
              ScribbleCode
            </div>
            <div className="text-center font-primary font-bold text-ink/60">
              Traditional
            </div>
          </div>

          {/* Rows */}
          <div className="divide-y-2 divide-ink/20">
            {comparisons.map((item, index) => (
              <motion.div
                key={item.aspect}
                initial={{ x: -20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                className="grid grid-cols-3 gap-4 p-4 items-center hover:bg-notebook-yellow/10 transition-colors"
              >
                <div className="text-center font-secondary text-ink">
                  {item.aspect}
                </div>
                <div className="text-center font-primary font-semibold text-ink flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-notebook-green" strokeWidth={2} />
                  {item.scribbleCode}
                </div>
                <div className="text-center font-secondary text-ink/60 flex items-center justify-center gap-2">
                  <XCircle className="w-5 h-5" strokeWidth={2} />
                  {item.traditional}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
