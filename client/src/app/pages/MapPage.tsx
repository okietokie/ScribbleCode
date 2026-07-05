import { WorldMapCanvas } from '../components/world/WorldMapCanvas'
import { useProgressionStore } from '../../app/store/useProgressionStore'

export default function MapPage() {
  const { profile, isInitialized, initializePlayer } = useProgressionStore()

  // Initialize player on mount (using localStorage ID or generate one)
  if (!isInitialized) {
    const storedPlayerId = localStorage.getItem('scribblecode_player_id') || `player_${Date.now()}`
    localStorage.setItem('scribblecode_player_id', storedPlayerId)
    initializePlayer(storedPlayerId)
  }

  const handleNodeSelect = (lessonId: string) => {
    console.log('Selected lesson:', lessonId)
    // Navigate to learn page with lesson ID
    window.location.href = `/learn?lesson=${lessonId}`
  }

  return (
    <div className="w-full h-full">
      <h1 className="text-4xl font-bold mb-6 text-center">JavaScript Forest</h1>
      <p className="text-body text-ink/80 text-center mb-4">
        Explore your learning journey through the magical forest
      </p>
      <div className="w-full h-[calc(100vh-200px)] border-2 border-ink/20 rounded-lg overflow-hidden bg-paper">
        <WorldMapCanvas
          worldId="js-world-1-basics"
          progress={null}
          onNodeSelect={handleNodeSelect}
          className="w-full h-full"
        />
      </div>
    </div>
  )
}
