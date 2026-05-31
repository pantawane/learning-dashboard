'use client';

import React from 'react';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import { Course } from '@/types';

type CourseCardProps = Pick<Course, 'title' | 'progress' | 'icon_name'>;

export default function CourseCard({ title, progress, icon_name }: CourseCardProps) {
  // Get the icon component, fallback to Code2
  const IconComponent = (Icons as any)[icon_name] || Icons.Code2;

  // Clamp progress to [0, 100]
  const safeProgress = Math.min(Math.max(progress, 0), 100);

  return (
    <motion.div
      className="relative rounded-2xl p-5 bg-[#111111] border border-white/[0.06] overflow-hidden group"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' seed='2'/%3C/filter%3E%3Crect width='400' height='400' filter='url(%23noiseFilter)' opacity='0.02'/%3E%3C/svg%3E")`,
        backgroundSize: '200px 200px'
      }}
      whileHover={{
        boxShadow: '0 0 20px rgba(6, 182, 212, 0.15)'
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
    >
      {/* Icon */}
      <div className="mb-4">
        <IconComponent className="w-8 h-8 text-cyan-500" />
      </div>

      {/* Title */}
      <h3 className="text-sm font-semibold text-white mb-4 line-clamp-2">
        {title}
      </h3>

      {/* Progress Label */}
      <div className="text-xs text-white/60 mb-2">
        {progress}%
      </div>

      {/* Progress Bar */}
      <div className="relative w-full h-2 rounded-full bg-[#1e1e1e] overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{
            backgroundImage: 'linear-gradient(90deg, #06b6d4 0%, #3b82f6 100%)'
          }}
          initial={{ width: '0%' }}
          animate={{ width: `${safeProgress}%` }}
          transition={{
            duration: 1,
            ease: 'easeOut'
          }}
        />
      </div>
    </motion.div>
  );
}
