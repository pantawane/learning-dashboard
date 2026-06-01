'use client';

import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import { ArrowLeft, Clock, BookOpen, TrendingUp, Play } from 'lucide-react';
import { Course } from '@/types';
import { useRouter } from 'next/navigation';

interface CourseDetailClientProps {
  course: Course;
}

const pageVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: 'easeOut' as const,
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring' as const,
      stiffness: 300,
      damping: 25,
    },
  },
};

export default function CourseDetailClient({ course }: CourseDetailClientProps) {
  const router = useRouter();
  const IconComponent = (Icons as Record<string, any>)[course.icon_name] ?? Icons.Code2;
  const safeProgress = Math.min(Math.max(course.progress, 0), 100);
  const lessonsCompleted = Math.round(((safeProgress / 100) * (course.lessons_count ?? 12)));

  return (
    <div className="min-h-screen bg-[#080808]">
      <motion.div
        className="max-w-3xl mx-auto px-6 py-10"
        variants={pageVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Back Button */}
        <motion.button
          variants={itemVariants}
          onClick={() => router.back()}
          className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors mb-8 group"
          whileHover={{ x: -4 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">Back to Dashboard</span>
        </motion.button>

        {/* Hero Card */}
        <motion.div
          variants={itemVariants}
          className="relative rounded-2xl bg-gradient-to-br from-[#111111] to-[#0f0f0f] border border-white/[0.06] p-8 mb-6 overflow-hidden"
        >
          {/* Background glow */}
          <div className="absolute -right-20 -top-20 w-64 h-64 rounded-full bg-cyan-500/5 blur-3xl pointer-events-none" />

          <div className="relative z-10">
            {/* Icon + Badge Row */}
            <div className="flex items-start justify-between mb-6">
              <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                <IconComponent className="w-7 h-7 text-cyan-400" />
              </div>
              {safeProgress === 100 && (
                <motion.div
                  className="flex items-center gap-1.5 bg-emerald-500/20 border border-emerald-500/30 rounded-full px-3 py-1"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20, delay: 0.3 }}
                >
                  <svg className="w-3 h-3 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-xs font-semibold text-emerald-400">Completed</span>
                </motion.div>
              )}
            </div>

            {/* Title */}
            <h1 className="text-2xl font-bold text-white mb-3">{course.title}</h1>

            {/* Description */}
            <p className="text-sm text-zinc-400 leading-relaxed mb-6">
              {course.description ?? 'Master the fundamentals and advanced concepts in this comprehensive course.'}
            </p>

            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              {[
                { icon: BookOpen, label: 'Lessons', value: course.lessons_count ?? 12 },
                { icon: Clock, label: 'Duration', value: course.duration ?? '8h 30m' },
                { icon: TrendingUp, label: 'Progress', value: `${safeProgress}%` },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="bg-[#1a1a1a] rounded-xl px-4 py-3 text-center">
                  <Icon className="w-4 h-4 text-zinc-500 mx-auto mb-1" />
                  <p className="text-sm font-semibold text-white">{value}</p>
                  <p className="text-xs text-zinc-600">{label}</p>
                </div>
              ))}
            </div>

            {/* Progress Section */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs text-zinc-500">
                  {lessonsCompleted} of {course.lessons_count ?? 12} lessons completed
                </span>
                <span className={`text-xs font-medium ${safeProgress === 100 ? 'text-emerald-400' : 'text-cyan-400'}`}>
                  {safeProgress}%
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-[#1e1e1e] overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    width: `${safeProgress}%`,
                    backgroundImage: safeProgress === 100
                      ? 'linear-gradient(90deg, #10b981 0%, #34d399 100%)'
                      : 'linear-gradient(90deg, #06b6d4 0%, #3b82f6 100%)',
                    transformOrigin: 'left center',
                  }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
                />
              </div>
            </div>

            {/* Continue Button */}
            <motion.button
              className="w-full flex items-center justify-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-black font-semibold text-sm rounded-xl py-3 transition-colors"
              whileHover={{
                scale: 1.02,
                boxShadow: '0 0 24px rgba(6, 182, 212, 0.4)',
                transition: { type: 'spring', stiffness: 300, damping: 20 },
              }}
              whileTap={{ scale: 0.98 }}
            >
              <Play className="w-4 h-4 fill-black" />
              {safeProgress === 0 ? 'Start Course' : safeProgress === 100 ? 'Review Course' : 'Continue Learning'}
            </motion.button>
          </div>
        </motion.div>

        {/* Lessons Preview */}
        <motion.div
          variants={itemVariants}
          className="rounded-2xl bg-[#111111] border border-white/[0.06] p-6"
        >
          <h2 className="text-sm font-semibold text-white mb-4">Course Lessons</h2>
          <div className="space-y-2">
            {Array.from({ length: Math.min(course.lessons_count ?? 12, 6) }, (_, i) => {
              const isCompleted = i < lessonsCompleted;
              const isCurrent = i === lessonsCompleted && safeProgress < 100;
              return (
                <motion.div
                  key={i}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                    isCurrent ? 'bg-cyan-500/10 border border-cyan-500/20' : 'hover:bg-white/[0.03]'
                  }`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + i * 0.06 }}
                >
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-[10px] font-bold ${
                    isCompleted
                      ? 'bg-emerald-500/20 text-emerald-400'
                      : isCurrent
                      ? 'bg-cyan-500/20 text-cyan-400'
                      : 'bg-[#1e1e1e] text-zinc-600'
                  }`}>
                    {isCompleted ? '✓' : i + 1}
                  </div>
                  <span className={`text-sm ${isCompleted ? 'text-zinc-500 line-through' : isCurrent ? 'text-white' : 'text-zinc-400'}`}>
                    Lesson {i + 1}
                  </span>
                  {isCurrent && (
                    <span className="ml-auto text-[10px] font-medium text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded-full">
                      Up Next
                    </span>
                  )}
                </motion.div>
              );
            })}
            {(course.lessons_count ?? 12) > 6 && (
              <p className="text-xs text-zinc-600 text-center pt-2">
                +{(course.lessons_count ?? 12) - 6} more lessons
              </p>
            )}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}