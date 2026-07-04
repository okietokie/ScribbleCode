import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-ink text-paper py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Column */}
          <div className="md:col-span-2">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-2xl font-primary font-bold mb-4">ScribbleCode</h3>
              <p className="text-paper/70 font-secondary leading-relaxed max-w-md mb-4">
                Learn React through interactive adventures. Tiny lessons, real coding 
                challenges, and a world waiting to be explored.
              </p>
              <div className="flex items-center gap-2 text-paper/60 text-sm font-secondary">
                <span>Made with</span>
                <Heart className="w-4 h-4 text-notebook-red fill-notebook-red" strokeWidth={2} />
                <span>for learners everywhere</span>
              </div>
            </motion.div>
          </div>

          {/* Quick Links */}
          <div>
            <motion.h4
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-primary font-bold text-lg mb-4"
            >
              Quick Links
            </motion.h4>
            <ul className="space-y-2">
              {['Home', 'Learn', 'Map', 'Achievements', 'Playground'].map((link) => (
                <motion.li
                  key={link}
                  initial={{ x: -10, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                >
                  <a
                    href="#"
                    className="text-paper/70 hover:text-paper font-secondary transition-colors text-sm"
                  >
                    {link}
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <motion.h4
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="font-primary font-bold text-lg mb-4"
            >
              Resources
            </motion.h4>
            <ul className="space-y-2">
              {['Curriculum', 'FAQ', 'Blog', 'Community', 'Support'].map((link) => (
                <motion.li
                  key={link}
                  initial={{ x: -10, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                >
                  <a
                    href="#"
                    className="text-paper/70 hover:text-paper font-secondary transition-colors text-sm"
                  >
                    {link}
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="border-t border-paper/20 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4"
        >
          {/* Copyright */}
          <p className="text-paper/50 text-sm font-secondary">
            © {currentYear} ScribbleCode. All rights reserved.
          </p>

          {/* Legal Links */}
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="text-paper/50 hover:text-paper font-secondary text-sm transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-paper/50 hover:text-paper font-secondary text-sm transition-colors"
            >
              Terms of Service
            </a>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <motion.a
              href="#"
              whileHover={{ scale: 1.1, rotate: -5 }}
              whileTap={{ scale: 0.95 }}
              className="text-paper/70 hover:text-paper transition-colors"
              aria-label="GitHub"
            >
              <span className="text-xl">🐙</span>
            </motion.a>
            <motion.a
              href="#"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              className="text-paper/70 hover:text-paper transition-colors"
              aria-label="Twitter"
            >
              <span className="text-xl">𝕏</span>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};
