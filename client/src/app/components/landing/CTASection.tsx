import { motion } from 'framer-motion';
import { ArrowRight, Map } from 'lucide-react';

export const CTASection = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-notebook-yellow/30">
      <div className="max-w-4xl mx-auto text-center">
        {/* Main CTA Card */}
        <motion.div
          initial={{ y: 40, opacity: 0, scale: 0.95 }}
          whileInView={{ y: 0, opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="card-hand bg-paper-page border-3 border-ink shadow-paper-hover p-8 sm:p-12 relative overflow-hidden"
        >
          {/* Decorative elements */}
          <motion.div
            className="absolute -top-4 -right-4 w-24 h-24 bg-notebook-green/30 rounded-full border-2 border-ink"
            animate={{ rotate: [0, 10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute -bottom-4 -left-4 w-32 h-32 bg-notebook-blue/20 rounded-full border-2 border-ink"
            animate={{ rotate: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />

          {/* Content */}
          <div className="relative z-10">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              className="inline-block mb-6"
            >
              <div className="w-20 h-20 rounded-full bg-notebook-yellow border-2 border-ink flex items-center justify-center shadow-sticker">
                <Map className="w-10 h-10 text-ink" strokeWidth={1.5} />
              </div>
            </motion.div>

            <h2 className="text-4xl sm:text-5xl font-primary font-bold text-ink mb-4">
              Ready to Begin Your Adventure?
            </h2>
            <p className="text-lg text-ink/70 max-w-xl mx-auto mb-8 font-secondary leading-relaxed">
              Join thousands of developers learning React through interactive challenges, 
              boss battles, and hands-on projects.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.button
                whileHover={{ scale: 1.05, rotate: -1 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary text-lg px-8 py-4 flex items-center gap-2 group"
              >
                Start Your Adventure
                <ArrowRight 
                  className="w-5 h-5 group-hover:translate-x-1 transition-transform" 
                  strokeWidth={2} 
                />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05, rotate: 1 }}
                whileTap={{ scale: 0.95 }}
                className="btn-secondary text-lg px-8 py-4"
              >
                Explore the Curriculum
              </motion.button>
            </div>

            {/* Trust indicators */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.4 }}
              className="text-sm text-ink/60 font-secondary mt-8"
            >
              ✓ No credit card required for free lessons  
              ✓ Learn at your own pace  
              ✓ Cancel anytime
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
