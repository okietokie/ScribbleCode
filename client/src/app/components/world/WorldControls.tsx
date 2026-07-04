import { motion } from 'framer-motion';

interface WorldControlsProps {
  zoom: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onZoomReset: () => void;
  onCenterCurrent: () => void;
}

/**
 * World map navigation controls
 */
export function WorldControls({
  zoom,
  onZoomIn,
  onZoomOut,
  onZoomReset,
  onCenterCurrent,
}: WorldControlsProps) {
  return (
    <div className="absolute bottom-4 right-4 z-10 flex flex-col gap-2">
      {/* Zoom controls */}
      <motion.div
        className="bg-white/90 backdrop-blur rounded-lg shadow-lg border border-gray-200 overflow-hidden"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      >
        {/* Zoom in */}
        <button
          onClick={onZoomIn}
          className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 active:bg-gray-200 transition-colors border-b border-gray-200"
          aria-label="Zoom in"
        >
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>
        
        {/* Zoom out */}
        <button
          onClick={onZoomOut}
          className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 active:bg-gray-200 transition-colors"
          aria-label="Zoom out"
        >
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
          </svg>
        </button>
      </motion.div>
      
      {/* Utility controls */}
      <motion.div
        className="bg-white/90 backdrop-blur rounded-lg shadow-lg border border-gray-200 overflow-hidden"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25, delay: 0.1 }}
      >
        {/* Reset zoom */}
        <button
          onClick={onZoomReset}
          className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 active:bg-gray-200 transition-colors border-b border-gray-200"
          aria-label="Reset view"
          title="Reset view"
        >
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
          </svg>
        </button>
        
        {/* Center on current */}
        <button
          onClick={onCenterCurrent}
          className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 active:bg-gray-200 transition-colors"
          aria-label="Go to current lesson"
          title="Go to current lesson"
        >
          <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </button>
      </motion.div>
      
      {/* Zoom level indicator */}
      <motion.div
        className="bg-white/90 backdrop-blur rounded-lg shadow-lg px-3 py-2 text-center"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25, delay: 0.2 }}
      >
        <span className="text-xs font-semibold text-gray-600">
          {Math.round(zoom * 100)}%
        </span>
      </motion.div>
    </div>
  );
}
