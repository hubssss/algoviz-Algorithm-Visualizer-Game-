'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { algorithms } from '@/data/algorithms';
import { Algorithm } from '@/types';
import Link from 'next/link';

export default function ConstellationMap() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [selectedAlgo, setSelectedAlgo] = useState<Algorithm | null>(null);
  const [hoveredAlgo, setHoveredAlgo] = useState<string | null>(null);

  return (
    <div className="relative w-full h-[600px] bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 rounded-3xl overflow-hidden border-2 border-purple-500/30 shadow-2xl">
      {/* Stars background */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 1, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* SVG for connections */}
      <svg ref={svgRef} className="absolute inset-0 w-full h-full">
        {algorithms.map((algo) =>
          algo.connections.map((connId) => {
            const connAlgo = algorithms.find((a) => a.id === connId);
            if (!connAlgo) return null;

            const isHighlighted =
              hoveredAlgo === algo.id || hoveredAlgo === connId;

            return (
              <motion.line
                key={`${algo.id}-${connId}`}
                x1={algo.position.x}
                y1={algo.position.y}
                x2={connAlgo.position.x}
                y2={connAlgo.position.y}
                stroke={isHighlighted ? algo.color : '#ffffff30'}
                strokeWidth={isHighlighted ? 2 : 1}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
              />
            );
          })
        )}
      </svg>

      {/* Algorithm nodes */}
      {algorithms.map((algo, index) => (
        <motion.div
          key={algo.id}
          className="absolute cursor-pointer"
          style={{
            left: algo.position.x,
            top: algo.position.y,
            x: '-50%',
            y: '-50%',
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: index * 0.05, type: 'spring' }}
          whileHover={{ scale: 1.3, zIndex: 10 }}
          onHoverStart={() => setHoveredAlgo(algo.id)}
          onHoverEnd={() => setHoveredAlgo(null)}
        >
          <Link href={`/algorithm/${algo.id}`}>
            <div
              className="relative group"
              onClick={() => setSelectedAlgo(algo)}
            >
              {/* Glow effect */}
              <div
                className="absolute inset-0 rounded-full blur-xl opacity-60 group-hover:opacity-100 transition-opacity"
                style={{ backgroundColor: algo.color }}
              />

              {/* Node */}
              <div
                className="relative w-16 h-16 rounded-full flex items-center justify-center text-2xl border-2 backdrop-blur-sm"
                style={{
                  backgroundColor: `${algo.color}30`,
                  borderColor: algo.color,
                }}
              >
                {algo.icon}
              </div>

              {/* Tooltip */}
              <AnimatePresence>
                {hoveredAlgo === algo.id && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap z-20 border border-gray-700"
                  >
                    <div className="font-semibold">{algo.name}</div>
                    <div className="text-xs text-gray-400">{algo.difficulty}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Link>
        </motion.div>
      ))}

      {/* Zoom instruction */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white/60 text-sm">
        Click on any node to explore the algorithm
      </div>
    </div>
  );
}