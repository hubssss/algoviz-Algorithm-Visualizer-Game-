'use client';

import { useEffect, useRef } from 'react';
import { Point, Centroid } from '@/lib/algorithms/kmeans';
import { motion } from 'framer-motion';

interface KMeansVisualizationProps {
  points: Point[];
  centroids: Centroid[];
}

const clusterColors = [
  '#3B82F6', // blue
  '#EF4444', // red
  '#10B981', // green
  '#F59E0B', // amber
  '#8B5CF6', // purple
  '#EC4899', // pink
  '#14B8A6', // teal
  '#F97316', // orange
];

export default function KMeansVisualization({
  points,
  centroids,
}: KMeansVisualizationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw connections from points to centroids (optional)
    if (centroids.length > 0) {
      points.forEach((point) => {
        if (point.cluster !== undefined) {
          const centroid = centroids[point.cluster];
          if (centroid) {
            ctx.beginPath();
            ctx.strokeStyle = `${clusterColors[point.cluster % clusterColors.length]}20`;
            ctx.lineWidth = 1;
            ctx.moveTo(point.x, point.y);
            ctx.lineTo(centroid.x, centroid.y);
            ctx.stroke();
          }
        }
      });
    }

    // Draw points
    points.forEach((point) => {
      ctx.beginPath();
      ctx.arc(point.x, point.y, 6, 0, 2 * Math.PI);
      ctx.fillStyle =
        point.cluster !== undefined
          ? clusterColors[point.cluster % clusterColors.length]
          : '#94a3b8';
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.stroke();
    });

    // Draw centroids
    centroids.forEach((centroid) => {
      // Draw cross
      ctx.beginPath();
      ctx.strokeStyle = clusterColors[centroid.cluster % clusterColors.length];
      ctx.lineWidth = 4;
      ctx.moveTo(centroid.x - 12, centroid.y);
      ctx.lineTo(centroid.x + 12, centroid.y);
      ctx.moveTo(centroid.x, centroid.y - 12);
      ctx.lineTo(centroid.x, centroid.y + 12);
      ctx.stroke();

      // Draw outer circle
      ctx.beginPath();
      ctx.arc(centroid.x, centroid.y, 10, 0, 2 * Math.PI);
      ctx.strokeStyle = clusterColors[centroid.cluster % clusterColors.length];
      ctx.lineWidth = 3;
      ctx.stroke();
    });
  }, [points, centroids]);

  return (
    <div className="relative">
      <canvas
        ref={canvasRef}
        width={600}
        height={400}
        className="border-2 border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-900 shadow-lg"
      />

      {/* Legend */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="mt-4 flex flex-wrap gap-4"
      >
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 rounded-full bg-gray-400"></div>
          <span className="text-sm">Unassigned Point</span>
        </div>
        {centroids.map((centroid, i) => (
          <div key={i} className="flex items-center space-x-2">
            <div
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: clusterColors[i % clusterColors.length] }}
            ></div>
            <span className="text-sm">Cluster {i + 1}</span>
          </div>
        ))}
        <div className="flex items-center space-x-2">
          <div className="relative w-4 h-4">
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{ color: '#3B82F6' }}
            >
              ✕
            </div>
          </div>
          <span className="text-sm">Centroid</span>
        </div>
      </motion.div>
    </div>
  );
}