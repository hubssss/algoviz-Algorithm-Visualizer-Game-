'use client';

import { motion } from 'framer-motion';
import { useVisualizationStore } from '@/lib/store';

interface ControlPanelProps {
  onReset: () => void;
  onGenerate: () => void;
}

export default function ControlPanel({ onReset, onGenerate }: ControlPanelProps) {
  const { currentStep, isPlaying, speed, steps, play, pause, nextStep, prevStep, setSpeed } =
    useVisualizationStore();

  const handlePlayPause = () => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  };

  const speedOptions = [
    { label: '0.5x', value: 0.5 },
    { label: '1x', value: 1 },
    { label: '2x', value: 2 },
    { label: '3x', value: 3 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border-2 border-gray-200 dark:border-gray-700"
    >
      <h3 className="text-lg font-bold mb-4">Controls</h3>

      {/* Playback Controls */}
      <div className="flex flex-wrap gap-3 mb-6">
        <button
          onClick={prevStep}
          disabled={currentStep === 0}
          className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-colors"
        >
          ⏮ Previous
        </button>

        <button
          onClick={handlePlayPause}
          disabled={steps.length === 0}
          className="px-6 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPlaying ? '⏸ Pause' : '▶ Play'}
        </button>

        <button
          onClick={nextStep}
          disabled={currentStep >= steps.length - 1}
          className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-colors"
        >
          Next ⏭
        </button>
      </div>

      {/* Speed Control */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Speed</label>
        <div className="flex gap-2">
          {speedOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setSpeed(option.value)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                speed === option.value
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Progress */}
      <div className="mb-6">
        <div className="flex justify-between text-sm mb-2">
          <span className="font-medium">Progress</span>
          <span className="text-gray-600 dark:text-gray-400">
            Step {currentStep + 1} of {steps.length}
          </span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <motion.div
            className="bg-blue-500 h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{
              width: steps.length > 0 ? `${((currentStep + 1) / steps.length) * 100}%` : '0%',
            }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <button
          onClick={onGenerate}
          className="flex-1 px-4 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white font-medium transition-colors"
        >
          🎲 New Data
        </button>
        <button
          onClick={onReset}
          className="flex-1 px-4 py-2 rounded-lg bg-purple-500 hover:bg-purple-600 text-white font-medium transition-colors"
        >
          🔄 Reset
        </button>
      </div>
    </motion.div>
  );
}