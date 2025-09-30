'use client';

import { motion } from 'framer-motion';
import { algorithms, algorithmCategories } from '@/data/algorithms';
import AlgorithmCard from '@/components/ui/AlgorithmCard';
import ConstellationMap from '@/components/ui/ConstellationMap';
import { useState } from 'react';
import { AlgorithmCategory } from '@/types';

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<AlgorithmCategory | 'all'>('all');
  const [viewMode, setViewMode] = useState<'constellation' | 'grid'>('constellation');

  const filteredAlgorithms =
    selectedCategory === 'all'
      ? algorithms
      : algorithms.filter((algo) => algo.category === selectedCategory);

  return (
    <div className="min-h-screen pt-20 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Interactive Algorithm Visualizer
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Explore, visualize, and master data science algorithms through interactive
            experiences
          </p>
        </motion.div>

        {/* View Mode Toggle */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex justify-center mb-8"
        >
          <div className="inline-flex rounded-lg border-2 border-gray-200 dark:border-gray-700 p-1">
            <button
              onClick={() => setViewMode('constellation')}
              className={`px-6 py-2 rounded-md transition-all ${
                viewMode === 'constellation'
                  ? 'bg-blue-500 text-white'
                  : 'hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              🌌 Constellation
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`px-6 py-2 rounded-md transition-all ${
                viewMode === 'grid'
                  ? 'bg-blue-500 text-white'
                  : 'hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              📊 Grid View
            </button>
          </div>
        </motion.div>

        {/* Constellation Map View */}
        {viewMode === 'constellation' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="mb-12"
          >
            <ConstellationMap />
          </motion.div>
        )}

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: viewMode === 'constellation' ? 0.5 : 0.3 }}
          className="mb-8"
        >
          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-6 py-3 rounded-xl font-medium transition-all ${
                selectedCategory === 'all'
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                  : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              All Algorithms
            </button>
            {algorithmCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id as AlgorithmCategory)}
                className={`px-6 py-3 rounded-xl font-medium transition-all ${
                  selectedCategory === category.id
                    ? 'text-white shadow-lg'
                    : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
                style={
                  selectedCategory === category.id
                    ? { backgroundColor: category.color }
                    : {}
                }
              >
                <span className="mr-2">{category.icon}</span>
                {category.name}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Grid View */}
        {viewMode === 'grid' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredAlgorithms.map((algo, index) => (
              <motion.div
                key={algo.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <AlgorithmCard algorithm={algo} />
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { label: 'Algorithms', value: algorithms.length, icon: '🧮' },
            { label: 'Categories', value: algorithmCategories.length, icon: '📚' },
            { label: 'Difficulty Levels', value: 3, icon: '⭐' },
            { label: 'Interactive', value: '100%', icon: '🎮' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 + index * 0.1 }}
              className="text-center p-6 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 border-2 border-gray-200 dark:border-gray-700"
            >
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-3xl font-bold text-blue-500">{stat.value}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}