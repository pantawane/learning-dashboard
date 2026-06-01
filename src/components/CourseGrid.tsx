'use client';

import { motion } from 'framer-motion';
import { Course } from '@/types';
import CourseCard from '@/components/CourseCard';

interface CourseGridProps {
  courses: Course[];
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring' as const,
      stiffness: 300,
      damping: 20,
    },
  },
};

export default function CourseGrid({ courses }: CourseGridProps) {
  if (courses.length === 0) {
    return (
      <p className="text-zinc-500 text-sm">No courses found.</p>
    );
  }

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {courses.map((course) => (
        <motion.div
          key={course.id}
          variants={itemVariants}
          whileHover={{
            scale: 1.02,
            transition: {
              type: 'spring',
              stiffness: 300,
              damping: 20,
            },
          }}
        >
          <CourseCard
            id={course.id}   
            title={course.title}
            progress={course.progress}
            icon_name={course.icon_name}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}