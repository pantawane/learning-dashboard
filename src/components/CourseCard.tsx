'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import { Course } from '@/types';

type CourseCardProps = Pick<Course, 'id' | 'title' | 'progress' | 'icon_name'>;

export default function CourseCard({ id, title, progress, icon_name }: CourseCardProps) {
  const IconComponent = (Icons as Record<string, any>)[icon_name] ?? Icons.Code2;
  const safeProgress = Math.min(Math.max(progress, 0), 100);

  return (
    <Link href={`/courses/${id}`} className="block">
      <motion.article
        className="relative rounded-2xl p-5 bg-[#111111] border border-white/[0.06] overflow-hidden cursor-pointer"
        whileHover={{
          boxShadow: '0 0 20px rgba(6, 182, 212, 0.15)',
          borderColor: 'rgba(6, 182, 212, 0.2)',
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      >
        {/* Completion Badge */}
        {safeProgress === 100 && (
          <motion.div
            className="absolute top-3 right-3 z-20 flex items-center gap-1 bg-emerald-500/20 border border-emerald-500/30 rounded-full px-2 py-0.5"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20, delay: 0.5 }}
          >
            <svg
              className="w-3 h-3 text-emerald-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={3}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-[10px] font-semibold text-emerald-400">Done</span>
          </motion.div>
        )}

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
            <span
              className={`text-xs font-medium ${
                safeProgress === 100 ? 'text-emerald-400' : 'text-cyan-400'
              }`}
            >
              {safeProgress}%
            </span>
          </div>

          {/* Progress Bar */}
          <div className="relative w-full h-1.5 rounded-full bg-[#1e1e1e] overflow-hidden">
            <motion.div
              className="absolute inset-y-0 left-0 rounded-full"
              style={{
                width: `${safeProgress}%`,
                transformOrigin: 'left center',
                backgroundImage:
                  safeProgress === 100
                    ? 'linear-gradient(90deg, #10b981 0%, #34d399 100%)'
                    : 'linear-gradient(90deg, #06b6d4 0%, #3b82f6 100%)',
              }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, ease: 'easeOut' }}
            />
          </div>
        </div>
      </motion.article>
    </Link>
  );
}