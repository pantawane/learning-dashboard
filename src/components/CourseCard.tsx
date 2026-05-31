'use client';

import React from 'react';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import { Course } from '@/types';

type CourseCardProps = Pick<Course, 'title' | 'progress' | 'icon_name'>;

export default function CourseCard({ title, progress, icon_name }: CourseCardProps) {
  const IconComponent = (Icons as Record<string, any>)[icon_name] ?? Icons.Code2;
  const safeProgress = Math.min(Math.max(progress, 0), 100);

  return (
    <motion.article
      className="relative rounded-2xl p-5 bg-[#111111] border border-white/[0.06] overflow-hidden cursor-default"
      whileHover={{
        boxShadow: '0 0 20px rgba(6, 182, 212, 0.15)',
        borderColor: 'rgba(6, 182, 212, 0.2)',
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
    >
      {/* Grain texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' seed='2'/%3E%3Crect width='400' height='400' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px',
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        {/* Icon */}
        <div className="mb-4 w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center">
          <IconComponent className="w-5 h-5 text-cyan-400" />
        </div>

        {/* Title */}
        <h3 className="text-sm font-semibold text-white mb-4 line-clamp-2 leading-relaxed">
          {title}
        </h3>

        {/* Progress Label */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-zinc-500">Progress</span>
          <span className="text-xs font-medium text-cyan-400">{safeProgress}%</span>
        </div>

        {/* Progress Bar */}
        <div className="relative w-full h-1.5 rounded-full bg-[#1e1e1e] overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{
              backgroundImage: 'linear-gradient(90deg, #06b6d4 0%, #3b82f6 100%)',
            }}
            initial={{ width: '0%' }}
            animate={{ width: `${safeProgress}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
          />
        </div>
      </div>
    </motion.article>
  );
}