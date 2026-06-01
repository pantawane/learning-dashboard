'use client';

import { motion } from 'framer-motion';
import { BookOpen, TrendingUp, Trophy, Flame } from 'lucide-react';
import { Course } from '@/types';

interface StatsBarProps {
  courses: Course[];
}

interface StatCardProps {
  label: string;
  value: string | number;
  icon: React.ElementType;
  color: string;
  delay: number;
}

function StatCard({ label, value, icon: Icon, color, delay }: StatCardProps) {
  return (
    <motion.div
      className="flex items-center gap-4 rounded-2xl bg-[#111111] border border-white/[0.06] px-5 py-4 flex-1"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25, delay }}
      whileHover={{
        scale: 1.02,
        boxShadow: `0 0 20px ${color}26`,
        transition: { type: 'spring', stiffness: 300, damping: 20 },
      }}
    >
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ backgroundColor: `${color}18` }}
      >
        <Icon className="w-5 h-5" style={{ color }} />
      </div>
      <div>
        <p className="text-xl font-bold text-white leading-none mb-1">{value}</p>
        <p className="text-xs text-zinc-500">{label}</p>
      </div>
    </motion.div>
  );
}

export default function StatsBar({ courses }: StatsBarProps) {
  const totalCourses = courses.length;
  const avgProgress =
    totalCourses > 0
      ? Math.round(courses.reduce((sum, c) => sum + c.progress, 0) / totalCourses)
      : 0;
  const completed = courses.filter((c) => c.progress === 100).length;
  const inProgress = courses.filter((c) => c.progress > 0 && c.progress < 100).length;

  const stats = [
    {
      label: 'Total Courses',
      value: totalCourses,
      icon: BookOpen,
      color: '#06b6d4',
      delay: 0.05,
    },
    {
      label: 'Avg Progress',
      value: `${avgProgress}%`,
      icon: TrendingUp,
      color: '#8b5cf6',
      delay: 0.1,
    },
    {
      label: 'Completed',
      value: completed,
      icon: Trophy,
      color: '#f59e0b',
      delay: 0.15,
    },
    {
      label: 'In Progress',
      value: inProgress,
      icon: Flame,
      color: '#f97316',
      delay: 0.2,
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
      {stats.map((stat) => (
        <StatCard key={stat.label} {...stat} />
      ))}
    </div>
  );
}