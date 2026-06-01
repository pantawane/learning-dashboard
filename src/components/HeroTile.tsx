'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function HeroTile() {
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    setCurrentDate(
      new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    );
  }, []);

  const userName = process.env.NEXT_PUBLIC_USER_NAME ?? 'Vansh';

  return (
    <motion.div
      className="relative overflow-hidden rounded-2xl border border-white/5 bg-gradient-to-br from-[#0f0f0f] to-[#1a1a1a] p-8 md:p-12"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      {/* Background glow */}
      <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-gradient-to-b from-purple-500 to-transparent opacity-5 blur-3xl pointer-events-none" />
      <div className="absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-gradient-to-t from-cyan-500 to-transparent opacity-5 blur-3xl pointer-events-none" />

      <div className="relative z-10 space-y-4">
        {/* Greeting */}
        <motion.h1
          className="text-4xl md:text-5xl font-bold text-white"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Welcome back, {userName} 👋
        </motion.h1>

        {/* Date */}
        <motion.p
          className="text-sm text-gray-500 min-h-[20px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {currentDate}
        </motion.p>

        {/* Quote */}
        <motion.p
          className="text-sm italic text-gray-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          Every streak begins with a single step. Keep the momentum going!
        </motion.p>

        {/* Streak Badge */}
        <motion.div
          className="pt-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-500/20 to-orange-600/20 px-4 py-2 border border-orange-500/30"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <span className="text-xl">🔥</span>
            <span className="font-semibold text-orange-400">12 Day Streak</span>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}