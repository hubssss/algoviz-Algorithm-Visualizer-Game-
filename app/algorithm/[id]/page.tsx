'use client';

import { useParams } from 'next/navigation';
import { algorithms } from '@/data/algorithms';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useVisualizationStore, useProgressStore } from '@/lib/store';
import KMeansVisualization from '@/components/visualizations/KMeansVisualization';
import ControlPanel from '@/components/algorithm/ControlPanel';
import {
  generateRandomPoints,
  runKMeans,
  Point,
  Centroid,
} from '@/lib/algorithms/kmeans';
import Link from 'next/link';

export default function AlgorithmPage() {
  const params = useParams();
  const algorithmId = params.id as string;
  const algorithm = algorithms.find((a) => a.id === algorithmId);

  const [k, setK] = useState(3);
  const [pointCount, setPointCount] = useState(50);
  const [codeLanguage, setCodeLanguage] = useState<'python' | 'javascript'>('python');

  const { currentStep, isPlaying, speed, steps, setCurrentStep, pause, reset } =
    useVisualizationStore();
  const completeAlgorithm = useProgressStore((state) => state.completeAlgorithm);

  useEffect(() => {
    if (algorithm?.id === 'k-means') {
      handleGenerate();
    }
  }, []);

  useEffect(() => {
    if (isPlaying && currentStep < steps.length - 1) {
      const timer = setTimeout(() => {
        setCurrentStep(currentStep + 1);
      }, 1000 / speed);
      return () => clearTimeout(timer);
    } else if (currentStep >= steps.length - 1) {
      pause();
      if (algorithm) {
        completeAlgorithm(algorithm.id);
      }
    }
  }, [isPlaying, currentStep, steps.length, speed]);

  const handleGenerate = () => {
    reset();
    const points = generateRandomPoints(pointCount);
    const algorithmSteps = runKMeans(points, k);

    useVisualizationStore.setState({ steps: algorithmSteps });
  };

  const handleReset = () => {
    reset();
  };

  if (!algorithm) {
    return (
      <div className="min-h-screen pt-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Algorithm not found</h1>
          <Link href="/" className="text-blue-500 hover:underline">
            Return to homepage
          </Link>
        </div>
      </div>
    );
  }

  const currentState = steps[currentStep]?.state || { points: [], centroids: [] };

  const pythonCode = `from sklearn.cluster import KMeans
import numpy as np

# Create sample data
X = np.array([[1, 2], [5, 8], [1.5, 1.8], [8, 8], [1, 0.6], [9, 11]])

# Create KMeans instance with k=3
kmeans = KMeans(n_clusters=3, random_state=0)

# Fit the model
kmeans.fit(X)

# Get cluster labels and centroids
labels = kmeans.labels_
centroids = kmeans.cluster_centers_

print(f"Cluster labels: {labels}")
print(f"Centroids: {centroids}")`;

  const javascriptCode = `// K-Means implementation in JavaScript

function kMeans(points, k, maxIterations = 100) {
  // Initialize centroids randomly
  let centroids = initializeCentroids(points, k);

  for (let i = 0; i < maxIterations; i++) {
    // Assign points to nearest centroid
    const clusters = assignClusters(points, centroids);

    // Calculate new centroids
    const newCentroids = updateCentroids(clusters, k);

    // Check for convergence
    if (centroidsEqual(centroids, newCentroids)) {
      break;
    }

    centroids = newCentroids;
  }

  return { centroids, clusters };
}

function euclideanDistance(p1, p2) {
  return Math.sqrt(
    Math.pow(p1.x - p2.x, 2) +
    Math.pow(p1.y - p2.y, 2)
  );
}`;

  return (
    <div className="min-h-screen pt-20 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link
            href="/"
            className="text-blue-500 hover:underline mb-4 inline-block"
          >
            ← Back to Algorithms
          </Link>

          <div className="flex items-start gap-6">
            <div
              className="text-6xl w-24 h-24 flex items-center justify-center rounded-2xl border-4 shadow-lg"
              style={{
                backgroundColor: `${algorithm.color}20`,
                borderColor: algorithm.color,
              }}
            >
              {algorithm.icon}
            </div>

            <div className="flex-1">
              <h1 className="text-4xl font-bold mb-2">{algorithm.name}</h1>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
                {algorithm.description}
              </p>

              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-2 rounded-lg bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 font-medium">
                  {algorithm.category.replace('-', ' ').toUpperCase()}
                </span>
                <span className="px-4 py-2 rounded-lg bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 font-medium">
                  {algorithm.difficulty.toUpperCase()}
                </span>
                <span className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 font-mono text-sm">
                  Time: {algorithm.timeComplexity}
                </span>
                <span className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 font-mono text-sm">
                  Space: {algorithm.spaceComplexity}
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Visualization */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border-2 border-gray-200 dark:border-gray-700 mb-6"
            >
              <h2 className="text-2xl font-bold mb-4">Visualization</h2>

              {/* Parameters */}
              {algorithm.id === 'k-means' && (
                <div className="grid grid-cols-2 gap-4 mb-6">
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
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Points: {pointCount}
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
                </div>
              )}

              {algorithm.id === 'k-means' && (
                <KMeansVisualization
                  points={currentState.points}
                  centroids={currentState.centroids}
                />
              )}

              {/* Step Description */}
              {steps[currentStep] && (
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-2 border-blue-200 dark:border-blue-800"
                >
                  <p className="font-medium text-blue-900 dark:text-blue-100">
                    {steps[currentStep].description}
                  </p>
                </motion.div>
              )}
            </motion.div>

            {/* Code Preview */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border-2 border-gray-200 dark:border-gray-700"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Code</h2>
                <div className="flex gap-2">
                  <button
                    onClick={() => setCodeLanguage('python')}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      codeLanguage === 'python'
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-200 dark:bg-gray-700'
                    }`}
                  >
                    Python
                  </button>
                  <button
                    onClick={() => setCodeLanguage('javascript')}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      codeLanguage === 'javascript'
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-200 dark:bg-gray-700'
                    }`}
                  >
                    JavaScript
                  </button>
                </div>
              </div>

              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                <code>{codeLanguage === 'python' ? pythonCode : javascriptCode}</code>
              </pre>
            </motion.div>
          </div>

          {/* Side Panel */}
          <div className="space-y-6">
            {/* Controls */}
            <ControlPanel onReset={handleReset} onGenerate={handleGenerate} />

            {/* Use Case */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border-2 border-gray-200 dark:border-gray-700"
            >
              <h3 className="text-lg font-bold mb-3">💡 Real-World Use Case</h3>
              <p className="text-gray-700 dark:text-gray-300">{algorithm.useCase}</p>
            </motion.div>

            {/* Complexity */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border-2 border-gray-200 dark:border-gray-700"
            >
              <h3 className="text-lg font-bold mb-3">⏱️ Complexity</h3>
              <div className="space-y-2">
                <div>
                  <span className="font-medium">Time: </span>
                  <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded">
                    {algorithm.timeComplexity}
                  </code>
                </div>
                <div>
                  <span className="font-medium">Space: </span>
                  <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded">
                    {algorithm.spaceComplexity}
                  </code>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}