import { motion } from 'framer-motion';
import { useWorldSelection } from '../../hooks/useWorldSelection';
import { WorldCard } from './WorldCard';

interface WorldSelectionScreenProps {
  onWorldSelect: (worldId: string) => void;
  className?: string;
}

/**
 * World Selection Screen - Allows users to choose which learning world to explore
 */
export function WorldSelectionScreen({ 
  onWorldSelect, 
  className = '' 
}: WorldSelectionScreenProps) {
  const { worlds, activeWorldId, isLoading, selectWorld, isWorldUnlocked } = useWorldSelection();
  
  if (isLoading) {
    return (
      <div className={`flex items-center justify-center min-h-screen ${className}`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4" />
          <p className="text-xl text-gray-600 font-semibold">Loading worlds...</p>
        </div>
      </div>
    );
  }
  
  const unlockedCount = worlds.filter(w => isWorldUnlocked(w.id)).length;
  const totalXPEarned = worlds.reduce((acc, world) => {
    // In a real implementation, this would fetch actual progress
    return acc;
  }, 0);
  
  return (
    <div className={`min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 ${className}`}>
      {/* Header */}
      <header className="bg-white/80 backdrop-blur shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              🗺️ Choose Your Learning Adventure
            </h1>
            <p className="text-gray-600 text-lg">
              Select a world to begin your coding journey
            </p>
            
            {/* Stats */}
            <div className="flex gap-6 mt-4">
              <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-lg">
                <span className="text-2xl">🌍</span>
                <div>
                  <p className="text-xs text-gray-500">Worlds Available</p>
                  <p className="font-bold text-blue-600">{unlockedCount} / {worlds.length}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-lg">
                <span className="text-2xl">⭐</span>
                <div>
                  <p className="text-xs text-gray-500">Total XP</p>
                  <p className="font-bold text-green-600">{totalXPEarned}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {worlds.length === 0 ? (
          <div className="text-center py-20">
            <span className="text-6xl mb-4 block">🚧</span>
            <h2 className="text-2xl font-bold text-gray-700 mb-2">No Worlds Available Yet</h2>
            <p className="text-gray-600">Check back soon for new learning adventures!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {worlds.map((world, index) => {
              const isUnlocked = isWorldUnlocked(world.id);
              const isActive = world.id === activeWorldId;
              
              // Get progress for this world (placeholder - would fetch from progression store)
              const progress = 0;
              
              return (
                <motion.div
                  key={world.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <WorldCard
                    world={world}
                    isUnlocked={isUnlocked}
                    isActive={isActive}
                    progress={progress}
                    onSelect={(worldId) => {
                      selectWorld(worldId);
                      onWorldSelect(worldId);
                    }}
                  />
                </motion.div>
              );
            })}
          </div>
        )}
        
        {/* Coming Soon Section */}
        <motion.section 
          className="mt-12 p-8 bg-white/60 rounded-xl border-2 border-dashed border-gray-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="text-2xl font-bold text-gray-700 mb-4 text-center">
            🚀 More Worlds Coming Soon!
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['TypeScript Tower', 'Node.js Nexus', 'Python Plains', 'CSS Castle'].map((name, i) => (
              <div key={i} className="text-center p-4 bg-gray-100 rounded-lg opacity-60">
                <span className="text-3xl mb-2 block">🔒</span>
                <p className="font-semibold text-gray-600">{name}</p>
              </div>
            ))}
          </div>
        </motion.section>
      </main>
    </div>
  );
}
