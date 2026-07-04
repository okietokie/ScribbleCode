import { motion } from 'framer-motion';
import { HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: 'What is ScribbleCode?',
    answer: 'ScribbleCode is an interactive learning platform that teaches React through gamified adventures. Instead of watching videos, you\'ll complete hands-on coding challenges in a notebook-themed world.',
  },
  {
    question: 'Who is it for?',
    answer: 'ScribbleCode is perfect for beginners who want to learn React, developers transitioning from other frameworks, or anyone who learns better by doing rather than watching.',
  },
  {
    question: 'Do I need coding experience?',
    answer: 'Basic JavaScript knowledge helps, but we start from the fundamentals. If you\'re new to coding, begin with our JavaScript Forest to build a strong foundation.',
  },
  {
    question: 'Is it free?',
    answer: 'We offer free introductory lessons in each area. Full access to all worlds, boss battles, and projects requires a subscription.',
  },
  {
    question: 'How long are lessons?',
    answer: 'Lessons are designed to be bite-sized, typically taking 5-15 minutes to complete. Perfect for fitting learning into your busy schedule!',
  },
  {
    question: 'Will more courses be added?',
    answer: 'Absolutely! We\'re constantly expanding our world map with new lands covering advanced React patterns, TypeScript, testing, and more.',
  },
];

export const FAQSection = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-paper">
      <div className="max-w-3xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-primary font-bold text-ink mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-ink/70 max-w-2xl mx-auto font-secondary">
            Got questions? We've got answers.
          </p>
        </motion.div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={faq.question}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              className="card-hand border-2 border-ink shadow-paper overflow-hidden"
            >
              <details className="group">
                <summary className="flex items-center justify-between cursor-pointer list-none p-4 hover:bg-notebook-yellow/20 transition-colors">
                  <div className="flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-ink/60 flex-shrink-0" strokeWidth={1.5} />
                    <h3 className="font-primary font-semibold text-ink text-lg">
                      {faq.question}
                    </h3>
                  </div>
                  <motion.span
                    className="text-2xl text-ink/60 group-open:rotate-45 transition-transform duration-normal"
                  >
                    +
                  </motion.span>
                </summary>
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  className="px-4 pb-4 pt-0"
                >
                  <div className="pl-8 border-l-2 border-ink/20">
                    <p className="text-ink/80 font-secondary leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </motion.div>
              </details>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
