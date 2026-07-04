import { motion } from 'framer-motion';

const testimonials = [
  {
    name: 'Alex Chen',
    role: 'Frontend Developer',
    content: 'Finally, a React course that doesn\'t feel like homework. The notebook aesthetic makes learning actually fun!',
    color: 'bg-notebook-yellow/40',
    rotation: '-rotate-1',
  },
  {
    name: 'Sarah Martinez',
    role: 'Career Changer',
    content: 'I\'ve tried so many tutorials. This is the first one where I actually stuck with it. The gamification works!',
    color: 'bg-notebook-blue/40',
    rotation: 'rotate-1',
  },
  {
    name: 'Jordan Kim',
    role: 'Student',
    content: 'The bite-sized lessons fit perfectly into my schedule. I love earning stickers for completing challenges.',
    color: 'bg-notebook-green/40',
    rotation: '-rotate-2',
  },
  {
    name: 'Taylor Brooks',
    role: 'Self-Taught Dev',
    content: 'Boss battles are genius! They make testing your knowledge feel like an achievement, not a chore.',
    color: 'bg-notebook-purple/40',
    rotation: 'rotate-2',
  },
];

export const TestimonialsSection = () => {
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
            What Learners Say
          </h2>
          <p className="text-lg text-ink/70 max-w-2xl mx-auto font-secondary">
            Join thousands of developers on their coding adventure.
          </p>
        </motion.div>

        {/* Testimonials Grid - Sticky Notes Style */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ y: 40, opacity: 0, rotate: 0 }}
              whileInView={{ y: 0, opacity: 1, rotate: testimonial.rotation }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ 
                scale: 1.05, 
                rotate: 0,
                boxShadow: '8px 8px 0px rgba(43, 43, 43, 0.2)'
              }}
              className={`${testimonial.color} rounded-hand border-2 border-ink shadow-sticker p-6 cursor-pointer transition-shadow duration-normal`}
            >
              {/* Tape decoration */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-notebook-yellow/60 rotate-1" />
              
              {/* Content */}
              <blockquote className="relative z-10">
                <p className="text-sm font-secondary text-ink leading-relaxed mb-4">
                  "{testimonial.content}"
                </p>
                <footer className="border-t-2 border-ink/30 pt-3">
                  <p className="font-primary font-bold text-ink text-sm">
                    {testimonial.name}
                  </p>
                  <p className="text-xs text-ink/60 font-secondary">
                    {testimonial.role}
                  </p>
                </footer>
              </blockquote>
            </motion.div>
          ))}
        </div>

        {/* Disclaimer */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.4 }}
          className="text-center text-xs text-ink/50 font-secondary mt-8"
        >
          * Sample testimonials for demonstration purposes
        </motion.p>
      </div>
    </section>
  );
};
