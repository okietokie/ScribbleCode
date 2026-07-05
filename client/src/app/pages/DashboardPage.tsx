import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { WorldSelectionScreen } from '../components/world/WorldSelectionScreen';
import { worldManager } from '../services/world/WorldManager';

/**
 * Dashboard Page - Main landing page after login
 * Shows world selection and overall progress
 */
export default function DashboardPage() {
  const navigate = useNavigate();
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    async function initialize() {
      await worldManager.initialize();
      setIsInitialized(true);
    }
    
    initialize();
  }, []);

  const handleWorldSelect = (worldId: string) => {
    // Navigate to the map page for the selected world
    navigate(`/map/${worldId}`);
  };

  if (!isInitialized) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4" />
          <p className="text-xl text-gray-600 font-semibold">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
      <WorldSelectionScreen onWorldSelect={handleWorldSelect} />
    </div>
  );
}
