'use client';

import { motion } from 'framer-motion';
import { Course } from '@/types';
import Topbar from '@/components/Topbar';
import HeroTile from '@/components/HeroTile';
import StatsBar from '@/components/StatsBar';
import ActivityTile from '@/components/ActivityTile';

interface PageWrapperProps {
  children: React.ReactNode;
  courses: Course[];
}

const pageVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: 'easeOut' as const,
      staggerChildren: 0.08,
    },
  },
};

const childVariants = {
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

export default function PageWrapper({ children, courses }: PageWrapperProps) {
  return (
    <motion.div
      className="flex-1 p-6 overflow-y-auto"
      variants={pageVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={childVariants}>
        <Topbar />
      </motion.div>

      <motion.section className="mb-6" variants={childVariants}>
        <HeroTile />
      </motion.section>

      <motion.div variants={childVariants}>
        <StatsBar courses={courses} />
      </motion.div>

      <motion.div variants={childVariants}>
        {children}
      </motion.div>
    </motion.div>
  );
}