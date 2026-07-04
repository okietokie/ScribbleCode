import { motion, useScroll, useTransform } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'Features', href: '#features' },
  { name: 'Learning Path', href: '#journey' },
  { name: 'Roadmap', href: '#roadmap' },
  { name: 'FAQ', href: '#faq' },
];

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const backgroundColor = useTransform(scrollY, [0, 100], ['transparent', 'rgba(250, 246, 233, 0.95)']);
  const shadow = useTransform(scrollY, [0, 100], ['none', '0 4px 6px -1px rgba(0, 0, 0, 0.1)']);

  return (
    <>
      <motion.nav
        style={{ backgroundColor, boxShadow: shadow }}
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm transition-all duration-normal"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <motion.a
              href="#home"
              whileHover={{ scale: 1.05, rotate: -2 }}
              className="flex items-center gap-2 font-primary font-bold text-xl sm:text-2xl text-ink"
            >
              <span className="text-3xl">📓</span>
              ScribbleCode
            </motion.a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  whileHover={{ y: -2 }}
                  className="px-4 py-2 font-secondary text-ink/80 hover:text-ink hover:bg-notebook-yellow/30 rounded-hand transition-colors text-sm"
                >
                  {link.name}
                </motion.a>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="hidden lg:flex items-center gap-3">
              <motion.a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 font-secondary text-ink border-2 border-ink rounded-hand hover:bg-notebook-yellow/30 transition-colors text-sm"
              >
                GitHub
              </motion.a>
              <motion.button
                whileHover={{ scale: 1.05, rotate: -1 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary px-6 py-2 text-sm"
              >
                Get Started
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-ink"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" strokeWidth={2} />
              ) : (
                <Menu className="w-6 h-6" strokeWidth={2} />
              )}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ 
          opacity: isMenuOpen ? 1 : 0, 
          y: isMenuOpen ? 0 : -20,
          pointerEvents: isMenuOpen ? 'auto' : 'none'
        }}
        transition={{ duration: 0.3 }}
        className="fixed top-16 sm:top-20 left-0 right-0 z-40 bg-paper border-b-2 border-ink lg:hidden"
      >
        <div className="px-4 py-6 space-y-2">
          {navLinks.map((link, index) => (
            <motion.a
              key={link.name}
              href={link.href}
              initial={{ x: -20, opacity: 0 }}
              animate={{ 
                x: isMenuOpen ? 0 : -20, 
                opacity: isMenuOpen ? 1 : 0 
              }}
              transition={{ delay: index * 0.05, duration: 0.2 }}
              onClick={() => setIsMenuOpen(false)}
              className="block px-4 py-3 font-secondary text-ink/80 hover:text-ink hover:bg-notebook-yellow/30 rounded-hand transition-colors"
            >
              {link.name}
            </motion.a>
          ))}
          
          <div className="pt-4 space-y-3 border-t-2 border-ink/20 mt-4">
            <motion.a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ x: -20, opacity: 0 }}
              animate={{ 
                x: isMenuOpen ? 0 : -20, 
                opacity: isMenuOpen ? 1 : 0 
              }}
              transition={{ delay: navLinks.length * 0.05, duration: 0.2 }}
              className="block px-4 py-3 font-secondary text-ink border-2 border-ink rounded-hand text-center"
            >
              GitHub
            </motion.a>
            <motion.button
              initial={{ x: -20, opacity: 0 }}
              animate={{ 
                x: isMenuOpen ? 0 : -20, 
                opacity: isMenuOpen ? 1 : 0 
              }}
              transition={{ delay: (navLinks.length + 1) * 0.05, duration: 0.2 }}
              onClick={() => setIsMenuOpen(false)}
              className="w-full btn-primary px-6 py-3"
            >
              Get Started
            </motion.button>
          </div>
        </div>
      </motion.div>
    </>
  );
};
