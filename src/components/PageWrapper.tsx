'use client';

import { motion } from 'framer-motion';

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

interface PageWrapperProps {
  children: React.ReactNode;
}

export { childVariants };

export default function PageWrapper({ children }: PageWrapperProps) {
  return (
    <motion.div
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      className="flex-1 p-6 overflow-y-auto"
    >
      {children}
    </motion.div>
  );
}