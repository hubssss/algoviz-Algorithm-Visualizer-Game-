'use client';

import { Algorithm } from '@/types';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useProgressStore } from '@/lib/store';

interface AlgorithmCardProps {
  algorithm: Algorithm;
}

export default function AlgorithmCard({ algorithm }: AlgorithmCardProps) {
  const completedAlgorithms = useProgressStore((state) => state.completedAlgorithms);
  const isCompleted = completedAlgorithms.includes(algorithm.id);

  const difficultyColors = {
    beginner: 'text-green-500',
    intermediate: 'text-yellow-500',
    advanced: 'text-red-500',
  };

  return (
    <Link href={`/algorithm/${algorithm.id}`}>
      <motion.div
        whileHover={{ scale: 1.05, y: -5 }}
        whileTap={{ scale: 0.98 }}
        className="relative group cursor-pointer"
      >
        <div
          className="rounded-2xl p-6 backdrop-blur-sm border-2 transition-all duration-300 hover:shadow-xl"
          style={{
            backgroundColor: 'var(--card)',
            borderColor: algorithm.color,
            boxShadow: `0 4px 20px ${algorithm.color}20`,
          }}
        >
          {/* Completion Badge */}
          {isCompleted && (
            <div className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
              ✓
            </div>
          )}

          {/* Icon */}
          <div className="text-5xl mb-4">{algorithm.icon}</div>

          {/* Title */}
          <h3 className="text-xl font-bold mb-2">{algorithm.name}</h3>

          {/* Difficulty */}
          <div className="flex items-center space-x-2 mb-3">
            <span className={`text-sm font-semibold ${difficultyColors[algorithm.difficulty]}`}>
              {algorithm.difficulty.charAt(0).toUpperCase() + algorithm.difficulty.slice(1)}
            </span>
            <span className="text-xs text-gray-500">•</span>
            <span className="text-xs text-gray-500">{algorithm.timeComplexity}</span>
          </div>

          {/* Description */}
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
            {algorithm.description}
          </p>

          {/* Hover Indicator */}
          <div className="mt-4 flex items-center text-sm font-medium group-hover:translate-x-2 transition-transform">
            <span style={{ color: algorithm.color }}>Explore</span>
            <span className="ml-1" style={{ color: algorithm.color }}>
              →
            </span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}