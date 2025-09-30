'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { algorithms, algorithmCategories } from '@/data/algorithms';
import { generateRandomPoints, runKMeans, Point } from '@/lib/algorithms/kmeans';
import KMeansVisualization from '@/components/visualizations/KMeansVisualization';
import { useVisualizationStore } from '@/lib/store';
import { AlgorithmCategory } from '@/types';

export default function PlaygroundPage() {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('k-means');
  const [k, setK] = useState(3);
  const [pointCount, setPointCount] = useState(50);
  const [customData, setCustomData] = useState<string>('');
  const [dataSource, setDataSource] = useState<'random' | 'custom'>('random');

  const { currentStep, steps } = useVisualizationStore();

  useEffect(() => {
    handleGenerate();
  }, []);

  const handleGenerate = () => {
    if (selectedAlgorithm === 'k-means') {
      let points: Point[];

      if (dataSource === 'custom' && customData) {
        try {
          const parsed = JSON.parse(customData);
          points = parsed.map((p: any) => ({ x: p.x || p[0], y: p.y || p[1] }));
        } catch (e) {
          alert('Invalid JSON format. Using random data instead.');
          points = generateRandomPoints(pointCount);
        }
      } else {
        points = generateRandomPoints(pointCount);
      }

      const algorithmSteps = runKMeans(points, k);
      useVisualizationStore.setState({ steps: algorithmSteps, currentStep: 0 });
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      setCustomData(text);
      setDataSource('custom');
    };
    reader.readAsText(file);
  };

  const currentState = steps[currentStep]?.state || { points: [], centroids: [] };

  const availableAlgorithms = algorithms.filter((algo) => algo.id === 'k-means');

  return (
    <div className="min-h-screen pt-20 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-green-500 via-teal-500 to-blue-500 bg-clip-text text-transparent">
            Algorithm Playground
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Experiment with algorithms using custom datasets and parameters
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Panel - Configuration */}
          <div className="lg:col-span-1 space-y-6">
            {/* Algorithm Selection */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border-2 border-gray-200 dark:border-gray-700"
            >
              <h2 className="text-xl font-bold mb-4">Select Algorithm</h2>
              <select
                value={selectedAlgorithm}
                onChange={(e) => setSelectedAlgorithm(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {availableAlgorithms.map((algo) => (
                  <option key={algo.id} value={algo.id}>
                    {algo.icon} {algo.name}
                  </option>
                ))}
              </select>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                More algorithms coming soon!
              </p>
            </motion.div>

            {/* Data Source */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border-2 border-gray-200 dark:border-gray-700"
            >
              <h2 className="text-xl font-bold mb-4">Data Source</h2>
              <div className="flex gap-3 mb-4">
                <button
                  onClick={() => setDataSource('random')}
                  className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
                    dataSource === 'random'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
                  }`}
                >
                  Random
                </button>
                <button
                  onClick={() => setDataSource('custom')}
                  className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
                    dataSource === 'custom'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
                  }`}
                >
                  Custom
                </button>
              </div>

              {dataSource === 'random' && (
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Number of Points: {pointCount}
                  </label>
                  <input
                    type="range"
                    min="20"
                    max="100"
                    step="10"
                    value={pointCount}
                    onChange={(e) => setPointCount(parseInt(e.target.value))}
                    className="w-full"
                  />
                </div>
              )}

              {dataSource === 'custom' && (
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Upload CSV or JSON
                  </label>
                  <input
                    type="file"
                    accept=".csv,.json,.txt"
                    onChange={handleFileUpload}
                    className="w-full px-3 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg text-sm"
                  />
                  <textarea
                    value={customData}
                    onChange={(e) => setCustomData(e.target.value)}
                    placeholder='[{"x": 10, "y": 20}, {"x": 30, "y": 40}]'
                    className="w-full mt-3 px-3 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 text-sm font-mono"
                    rows={6}
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                    Format: JSON array with x, y coordinates
                  </p>
                </div>
              )}
            </motion.div>

            {/* Parameters */}
            {selectedAlgorithm === 'k-means' && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border-2 border-gray-200 dark:border-gray-700"
              >
                <h2 className="text-xl font-bold mb-4">Parameters</h2>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Number of Clusters (K): {k}
                  </label>
                  <input
                    type="range"
                    min="2"
                    max="8"
                    value={k}
                    onChange={(e) => setK(parseInt(e.target.value))}
                    className="w-full"
                  />
                </div>
              </motion.div>
            )}

            {/* Run Button */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <button
                onClick={handleGenerate}
                className="w-full px-6 py-4 bg-gradient-to-r from-green-500 to-teal-500 text-white font-bold rounded-xl hover:shadow-lg transition-all"
              >
                🚀 Run Algorithm
              </button>
            </motion.div>

            {/* Example Datasets */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border-2 border-gray-200 dark:border-gray-700"
            >
              <h2 className="text-lg font-bold mb-3">Example Datasets</h2>
              <div className="space-y-2">
                <button
                  onClick={() => {
                    setCustomData(
                      JSON.stringify(
                        [
                          { x: 100, y: 100 },
                          { x: 110, y: 105 },
                          { x: 300, y: 300 },
                          { x: 310, y: 305 },
                          { x: 500, y: 100 },
                          { x: 510, y: 105 },
                        ],
                        null,
                        2
                      )
                    );
                    setDataSource('custom');
                  }}
                  className="w-full text-left px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-sm"
                >
                  📊 Three Clusters
                </button>
                <button
                  onClick={() => {
                    const circle = [];
                    for (let i = 0; i < 30; i++) {
                      const angle = (i / 30) * 2 * Math.PI;
                      circle.push({
                        x: 300 + Math.cos(angle) * 150,
                        y: 200 + Math.sin(angle) * 150,
                      });
                    }
                    setCustomData(JSON.stringify(circle, null, 2));
                    setDataSource('custom');
                  }}
                  className="w-full text-left px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-sm"
                >
                  ⭕ Circle Pattern
                </button>
              </div>
            </motion.div>
          </div>

          {/* Right Panel - Visualization */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border-2 border-gray-200 dark:border-gray-700"
            >
              <h2 className="text-2xl font-bold mb-6">Visualization</h2>

              {selectedAlgorithm === 'k-means' && (
                <div className="flex justify-center">
                  <KMeansVisualization
                    points={currentState.points}
                    centroids={currentState.centroids}
                  />
                </div>
              )}

              {/* Step Info */}
              {steps[currentStep] && (
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-2 border-blue-200 dark:border-blue-800"
                >
                  <p className="font-medium text-blue-900 dark:text-blue-100">
                    Step {currentStep + 1} of {steps.length}:{' '}
                    {steps[currentStep].description}
                  </p>
                </motion.div>
              )}

              {/* Stats */}
              <div className="mt-6 grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                  <div className="text-2xl font-bold text-blue-500">
                    {currentState.points.length}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Data Points
                  </div>
                </div>
                <div className="text-center p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                  <div className="text-2xl font-bold text-purple-500">
                    {currentState.centroids.length}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Clusters
                  </div>
                </div>
                <div className="text-center p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                  <div className="text-2xl font-bold text-green-500">
                    {steps.length}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Total Steps
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Tips */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-6 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-2xl p-6 border-2 border-yellow-200 dark:border-yellow-800"
            >
              <h3 className="text-lg font-bold mb-3 text-yellow-900 dark:text-yellow-100">
                💡 Playground Tips
              </h3>
              <ul className="space-y-2 text-sm text-yellow-800 dark:text-yellow-200">
                <li>• Use custom data to test algorithms with real datasets</li>
                <li>• Try different parameter values to see how they affect results</li>
                <li>• Upload CSV files with x,y coordinates for batch processing</li>
                <li>• Use example datasets to quickly test different patterns</li>
                <li>• Adjust K value to find optimal cluster count</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}