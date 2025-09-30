'use client';

import { useThemeStore } from '@/lib/store';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Header() {
  const { isDark, toggle } = useThemeStore();

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg bg-opacity-80 border-b"
      style={{
        backgroundColor: isDark ? 'rgba(15, 23, 42, 0.8)' : 'rgba(248, 250, 252, 0.8)',
        borderColor: 'var(--border)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-3">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="text-3xl"
            >
              🧠
            </motion.div>
            <span className="font-bold text-xl bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              AlgoViz
            </span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="hover:text-blue-500 transition-colors font-medium"
            >
              Algorithms
            </Link>
            <Link
              href="/playground"
              className="hover:text-blue-500 transition-colors font-medium"
            >
              Playground
            </Link>
            <Link
              href="/badges"
              className="hover:text-blue-500 transition-colors font-medium"
            >
              Badges
            </Link>
          </nav>

          <button
            onClick={toggle}
            className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            aria-label="Toggle theme"
          >
            <motion.div
              initial={false}
              animate={{ rotate: isDark ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {isDark ? '🌙' : '☀️'}
            </motion.div>
          </button>
        </div>
      </div>
    </motion.header>
  );
}