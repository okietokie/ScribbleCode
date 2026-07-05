import { useParams } from 'react-router-dom';
import { WorldMapCanvas } from '../components/world/WorldMapCanvas'
import { useProgressionStore } from '../../app/store/useProgressionStore'
import { worldManager } from '../../services/world/WorldManager'

export default function MapPage() {
  const { worldId } = useParams<{ worldId: string }>();
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

  // Get world title from WorldManager
  const world = worldId ? worldManager.getWorld(worldId) : worldManager.getActiveWorld();
  const worldTitle = world?.title || 'Learning World';

  return (
    <div className="w-full h-full">
      <h1 className="text-4xl font-bold mb-6 text-center">{worldTitle}</h1>
      <p className="text-body text-ink/80 text-center mb-4">
        Explore your learning journey through the magical world
      </p>
      <div className="w-full h-[calc(100vh-200px)] border-2 border-ink/20 rounded-lg overflow-hidden bg-paper">
        <WorldMapCanvas
          worldId={worldId}
          progress={null}
          onNodeSelect={handleNodeSelect}
          className="w-full h-full"
        />
      </div>
    </div>
  )
}
