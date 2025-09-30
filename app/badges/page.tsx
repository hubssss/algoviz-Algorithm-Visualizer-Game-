'use client';

import { motion } from 'framer-motion';
import { badges } from '@/data/badges';
import { useProgressStore } from '@/lib/store';
import { algorithms } from '@/data/algorithms';
import Link from 'next/link';

export default function BadgesPage() {
  const { completedAlgorithms, badges: earnedBadges } = useProgressStore();

  const checkBadgeEarned = (badgeId: string): boolean => {
    switch (badgeId) {
      case 'first-algorithm':
        return completedAlgorithms.length >= 1;
      case 'algorithms-3':
        return completedAlgorithms.length >= 3;
      case 'algorithms-5':
        return completedAlgorithms.length >= 5;
      case 'algorithms-10':
        return completedAlgorithms.length >= 10;
      case 'algorithms-all':
        return completedAlgorithms.length >= algorithms.length;
      case 'supervised-complete':
        return algorithms
          .filter((a) => a.category === 'supervised-learning')
          .every((a) => completedAlgorithms.includes(a.id));
      case 'unsupervised-complete':
        return algorithms
          .filter((a) => a.category === 'unsupervised-learning')
          .every((a) => completedAlgorithms.includes(a.id));
      case 'optimization-complete':
        return algorithms
          .filter((a) => a.category === 'optimization')
          .every((a) => completedAlgorithms.includes(a.id));
      case 'graph-complete':
        return algorithms
          .filter((a) => a.category === 'search-graph')
          .every((a) => completedAlgorithms.includes(a.id));
      case 'statistical-complete':
        return algorithms
          .filter((a) => a.category === 'statistical')
          .every((a) => completedAlgorithms.includes(a.id));
      case 'beginner-complete':
        return algorithms
          .filter((a) => a.difficulty === 'beginner')
          .every((a) => completedAlgorithms.includes(a.id));
      case 'intermediate-complete':
        return algorithms
          .filter((a) => a.difficulty === 'intermediate')
          .every((a) => completedAlgorithms.includes(a.id));
      case 'advanced-complete':
        return algorithms
          .filter((a) => a.difficulty === 'advanced')
          .every((a) => completedAlgorithms.includes(a.id));
      default:
        return earnedBadges.includes(badgeId);
    }
  };

  const earnedCount = badges.filter((badge) => checkBadgeEarned(badge.id)).length;
  const totalCount = badges.length;
  const progressPercentage = (earnedCount / totalCount) * 100;

  const badgeCategories = [
    { name: 'Beginner', badges: badges.slice(0, 3) },
    { name: 'Progress', badges: badges.slice(3, 7) },
    { name: 'Category Master', badges: badges.slice(7, 12) },
    { name: 'Special', badges: badges.slice(12, 16) },
    { name: 'Time-Based', badges: badges.slice(16, 18) },
    { name: 'Difficulty', badges: badges.slice(18, 21) },
  ];

  return (
    <div className="min-h-screen pt-20 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 bg-clip-text text-transparent">
            Achievement Badges
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Unlock badges as you explore and master algorithms
          </p>
        </motion.div>

        {/* Progress Overview */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl p-8 mb-12 text-white shadow-2xl"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="text-3xl font-bold mb-2">Your Progress</h2>
              <p className="text-lg opacity-90">
                You've earned {earnedCount} out of {totalCount} badges!
              </p>
            </div>
            <div className="text-center">
              <div className="text-6xl font-bold mb-2">{earnedCount}</div>
              <div className="text-sm opacity-90">Badges Earned</div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-6 bg-white/20 rounded-full h-4 overflow-hidden">
            <motion.div
              className="bg-white h-full rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </div>
          <div className="text-right mt-2 text-sm opacity-90">
            {progressPercentage.toFixed(1)}% Complete
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border-2 border-gray-200 dark:border-gray-700">
            <div className="text-4xl mb-3">📚</div>
            <div className="text-3xl font-bold text-blue-500">
              {completedAlgorithms.length}
            </div>
            <div className="text-gray-600 dark:text-gray-400">
              Algorithms Completed
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border-2 border-gray-200 dark:border-gray-700">
            <div className="text-4xl mb-3">🏆</div>
            <div className="text-3xl font-bold text-yellow-500">{earnedCount}</div>
            <div className="text-gray-600 dark:text-gray-400">Badges Earned</div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border-2 border-gray-200 dark:border-gray-700">
            <div className="text-4xl mb-3">🎯</div>
            <div className="text-3xl font-bold text-green-500">
              {totalCount - earnedCount}
            </div>
            <div className="text-gray-600 dark:text-gray-400">Badges to Unlock</div>
          </div>
        </motion.div>

        {/* Badge Categories */}
        {badgeCategories.map((category, categoryIndex) => (
          <motion.div
            key={category.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + categoryIndex * 0.1 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold mb-6">{category.name}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {category.badges.map((badge, index) => {
                const isEarned = checkBadgeEarned(badge.id);
                return (
                  <motion.div
                    key={badge.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 + categoryIndex * 0.1 + index * 0.05 }}
                    whileHover={{ scale: 1.05 }}
                    className={`relative rounded-2xl p-6 shadow-lg transition-all ${
                      isEarned
                        ? 'bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-2 border-yellow-400 dark:border-yellow-600'
                        : 'bg-gray-100 dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-700 opacity-60'
                    }`}
                  >
                    {/* Earned Badge */}
                    {isEarned && (
                      <div className="absolute -top-3 -right-3 bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold shadow-lg">
                        ✓
                      </div>
                    )}

                    {/* Badge Icon */}
                    <div
                      className={`text-6xl mb-4 ${
                        isEarned ? '' : 'grayscale opacity-50'
                      }`}
                    >
                      {badge.icon}
                    </div>

                    {/* Badge Name */}
                    <h3
                      className={`text-xl font-bold mb-2 ${
                        isEarned
                          ? 'text-gray-900 dark:text-gray-100'
                          : 'text-gray-500 dark:text-gray-400'
                      }`}
                    >
                      {badge.name}
                    </h3>

                    {/* Description */}
                    <p
                      className={`text-sm mb-3 ${
                        isEarned
                          ? 'text-gray-700 dark:text-gray-300'
                          : 'text-gray-500 dark:text-gray-400'
                      }`}
                    >
                      {badge.description}
                    </p>

                    {/* Requirement */}
                    <div
                      className={`text-xs font-medium px-3 py-1 rounded-full inline-block ${
                        isEarned
                          ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300'
                          : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                      }`}
                    >
                      {badge.requirement}
                    </div>

                    {/* Locked Overlay */}
                    {!isEarned && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-4xl opacity-50">🔒</div>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        ))}

        {/* Call to Action */}
        {earnedCount < totalCount && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-center mt-12 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-8 border-2 border-blue-200 dark:border-blue-800"
          >
            <h3 className="text-2xl font-bold mb-4">Keep Learning!</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Complete more algorithms to unlock additional badges
            </p>
            <Link
              href="/"
              className="inline-block px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold rounded-xl hover:shadow-lg transition-all"
            >
              Explore Algorithms
            </Link>
          </motion.div>
        )}

        {/* All Badges Earned */}
        {earnedCount === totalCount && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1 }}
            className="text-center mt-12 bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900/30 dark:to-orange-900/30 rounded-2xl p-12 border-4 border-yellow-400 dark:border-yellow-600"
          >
            <div className="text-8xl mb-6">🎉</div>
            <h3 className="text-4xl font-bold mb-4 text-yellow-600 dark:text-yellow-400">
              Congratulations!
            </h3>
            <p className="text-xl text-gray-700 dark:text-gray-300">
              You've unlocked all badges! You are a true Algorithm Master! 👑
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}