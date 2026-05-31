'use client';

import { useState } from 'react';
import {
  LayoutDashboard,
  BookOpen,
  TrendingUp,
  Settings,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SidebarProps {
  activeItem?: string;
  onItemClick?: (item: string) => void;
}

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'courses', label: 'Courses', icon: BookOpen },
  { id: 'progress', label: 'Progress', icon: TrendingUp },
  { id: 'settings', label: 'Settings', icon: Settings },
];

const sidebarWidth = {
  collapsed: 64, // px
  expanded: 240, // px
};

const navContainerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.13,
    },
  },
};

const navItemVariants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring' as const, stiffness: 300, damping: 25 },
  },
};

export default function Sidebar({
  activeItem: activeItemProp,
  onItemClick,
}: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeItemState, setActiveItemState] = useState('dashboard');

  const activeItem = activeItemProp ?? activeItemState;

  function handleItemClick(item: string) {
    onItemClick?.(item);
    if (activeItemProp === undefined) {
      setActiveItemState(item);
    }
  }

  return (
    <>
      {/* Desktop Sidebar */}
      <AnimatePresence initial={false} mode="wait">
        <motion.aside
          key={isCollapsed ? 'collapsed' : 'expanded'}
          className={`hidden md:flex flex-col h-screen bg-[#0a0a0a] border-r border-gray-800 transition-all duration-300`}
          initial={{
            width: isCollapsed ? sidebarWidth.expanded : sidebarWidth.collapsed,
          }}
          animate={{
            width: isCollapsed ? sidebarWidth.collapsed : sidebarWidth.expanded,
          }}
          exit={{
            width: isCollapsed ? sidebarWidth.expanded : sidebarWidth.collapsed,
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          style={{
            minWidth: isCollapsed ? sidebarWidth.collapsed : sidebarWidth.expanded,
            maxWidth: isCollapsed ? sidebarWidth.collapsed : sidebarWidth.expanded,
            overflow: 'hidden',
          }}
        >
          {/* Toggle Button */}
          <div className="flex items-center justify-end p-4">
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-2 rounded-lg bg-[#1a1a1a] text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
              aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              {isCollapsed ? (
                <ChevronRight className="w-5 h-5" />
              ) : (
                <ChevronLeft className="w-5 h-5" />
              )}
            </button>
          </div>

          {/* Navigation Items */}
          <motion.nav
            className="flex-1 px-3 py-6 space-y-3"
            variants={navContainerVariants}
            initial="hidden"
            animate="show"
          >
            {navItems.map(({ id, label, icon: Icon }) => (
              <motion.div key={id} variants={navItemVariants}>
                <button
                  onClick={() => handleItemClick(id)}
                  className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-colors relative group ${
                    activeItem === id
                      ? 'bg-[#1a1a1a] text-cyan-400'
                      : 'text-gray-400 hover:text-white hover:bg-[#1a1a1a]'
                  }`}
                  style={{ overflow: 'hidden' }}
                >
                  {/* Framer Motion animated active indicator */}
                  <AnimatePresence>
                    {activeItem === id && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="absolute left-0 top-0 bottom-0 w-full h-full rounded-lg bg-[#1a1a1a] z-0"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        style={{ zIndex: 0, pointerEvents: 'none' }}
                      />
                    )}
                  </AnimatePresence>
                  {/* Glowing left border for active item */}
                  {activeItem === id && (
                    <motion.div
                      className="absolute left-0 top-0 bottom-0 w-1 bg-cyan-400 rounded-r-full shadow-lg shadow-cyan-400 blur-sm"
                      layoutId="activeItemBorder"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      style={{ zIndex: 1, pointerEvents: 'none' }}
                    />
                  )}

                  <span className="relative z-10 flex items-center gap-3">
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    {/* Label - hidden when collapsed */}
                    {!isCollapsed && (
                      <span className="text-sm font-medium whitespace-nowrap">
                        {label}
                      </span>
                    )}
                  </span>
                </button>
              </motion.div>
            ))}
          </motion.nav>
        </motion.aside>
      </AnimatePresence>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[#0a0a0a] border-t border-gray-800 flex items-center justify-around h-20">
        {navItems.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => handleItemClick(id)}
            className={`flex flex-col items-center justify-center w-full h-full gap-1 transition-colors relative group ${
              activeItem === id
                ? 'text-cyan-400'
                : 'text-gray-400 hover:text-white'
            }`}
            aria-label={label}
          >
            {/* Glowing top border for active item in mobile */}
            {activeItem === id && (
              <div className="absolute top-0 left-0 right-0 h-1 bg-cyan-400 shadow-lg shadow-cyan-400" />
            )}

            <Icon className="w-6 h-6" />
            <span className="text-xs font-medium">{label}</span>
          </button>
        ))}
      </nav>

      {/* Mobile bottom navigation spacer */}
      <div className="md:hidden h-20" />
    </>
  );
}
