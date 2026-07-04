import { motion } from 'framer-motion';
import { TreePine, Mountain, Library, Home, MountainSnow, Crosshair, Anchor, Castle, Sword } from 'lucide-react';

const locations = [
  { name: 'JavaScript Forest', icon: TreePine, description: 'Master the basics', color: 'bg-notebook-green/30' },
  { name: 'ES6 Mountains', icon: Mountain, description: 'Modern syntax peaks', color: 'bg-notebook-blue/30' },
  { name: 'Module Library', icon: Library, description: 'Import & export halls', color: 'bg-notebook-yellow/30' },
  { name: 'React Village', icon: Home, description: 'Component homeland', color: 'bg-notebook-red/30' },
  { name: 'Hook Highlands', icon: MountainSnow, description: 'State & effect heights', color: 'bg-notebook-purple/30' },
  { name: 'Router Crossroads', icon: Crosshair, description: 'Navigation hub', color: 'bg-notebook-green/30' },
  { name: 'API Harbor', icon: Anchor, description: 'Data fetching docks', color: 'bg-notebook-blue/30' },
  { name: 'State Kingdom', icon: Castle, description: 'Global state realm', color: 'bg-notebook-yellow/30' },
  { name: 'Boss Castle', icon: Sword, description: 'Final challenges', color: 'bg-notebook-red/30' },
];

export const LearningJourney = () => {
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
            Your Learning Journey
          </h2>
          <p className="text-lg text-ink/70 max-w-2xl mx-auto font-secondary">
            Travel through themed lands, mastering each concept along the way.
          </p>
        </motion.div>

        {/* Journey Map */}
        <div className="relative">
          {/* Connecting Line */}
          <svg
            className="absolute left-1/2 top-0 bottom-0 w-full h-full -translate-x-1/2 pointer-events-none hidden lg:block"
            style={{ zIndex: 0 }}
          >
            <motion.path
              d="M 50% 50 L 50% 95%"
              fill="none"
              stroke="#2B2B2B"
              strokeWidth="3"
              strokeDasharray="8 8"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 2, delay: 0.3 }}
            />
          </svg>

          {/* Location Nodes */}
          <div className="space-y-8 lg:space-y-0">
            {locations.map((location, index) => (
              <motion.div
                key={location.name}
                initial={{ x: index % 2 === 0 ? -60 : 60, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.6 }}
                className={`relative flex items-center ${
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                }`}
              >
                {/* Content Card */}
                <div className={`flex-1 ${index % 2 === 0 ? 'lg:pr-12 lg:text-right' : 'lg:pl-12 lg:text-left'} z-10`}>
                  <motion.div
                    whileHover={{ scale: 1.02, rotate: index % 2 === 0 ? -1 : 1 }}
                    className={`card-hand ${location.color} border-2 border-ink inline-block`}
                  >
                    <div className="flex items-center gap-3 p-4">
                      <div className="w-12 h-12 rounded-hand bg-paper-page border-2 border-ink flex items-center justify-center shadow-sticker">
                        <location.icon className="w-6 h-6 text-ink" strokeWidth={1.5} />
                      </div>
                      <div>
                        <h3 className="text-lg font-primary font-bold text-ink">
                          {location.name}
                        </h3>
                        <p className="text-sm text-ink/70 font-secondary">
                          {location.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Center Node */}
                <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-notebook-yellow border-3 border-ink shadow-sticker items-center justify-center z-20">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15 + 0.3, type: "spring", stiffness: 200 }}
                    className="w-3 h-3 rounded-full bg-ink"
                  />
                </div>

                {/* Spacer */}
                <div className="flex-1 hidden lg:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
