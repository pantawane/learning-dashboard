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
import { motion } from 'framer-motion';

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
  collapsed: 64,
  expanded: 240,
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
      <motion.aside
        className="hidden md:flex flex-col h-screen bg-[#0a0a0a] border-r border-gray-800 overflow-hidden flex-shrink-0"
        animate={{
          width: isCollapsed ? sidebarWidth.collapsed : sidebarWidth.expanded,
          minWidth: isCollapsed ? sidebarWidth.collapsed : sidebarWidth.expanded,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
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
                className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-colors relative ${
                  activeItem === id
                    ? 'text-cyan-400'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {/* Animated active background */}
                {activeItem === id && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute inset-0 rounded-lg bg-[#1a1a1a]"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    style={{ zIndex: 0 }}
                  />
                )}

                {/* Glowing left border */}
                {activeItem === id && (
                  <motion.div
                    layoutId="activeItemBorder"
                    className="absolute left-0 top-2 bottom-2 w-1 bg-cyan-400 rounded-r-full"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    style={{ zIndex: 1 }}
                  />
                )}

                <span className="relative z-10 flex items-center gap-3">
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  {!isCollapsed && (
                    <motion.span
                      className="text-sm font-medium whitespace-nowrap"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      {label}
                    </motion.span>
                  )}
                </span>
              </button>
            </motion.div>
          ))}
        </motion.nav>
      </motion.aside>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#0a0a0a] border-t border-gray-800 flex items-center justify-around h-16">
        {navItems.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => handleItemClick(id)}
            className={`flex flex-col items-center justify-center w-full h-full gap-1 transition-colors relative ${
              activeItem === id ? 'text-cyan-400' : 'text-gray-400 hover:text-white'
            }`}
            aria-label={label}
          >
            {activeItem === id && (
              <motion.div
                layoutId="mobileActiveIndicator"
                className="absolute top-0 left-0 right-0 h-0.5 bg-cyan-400"
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />
            )}
            <Icon className="w-5 h-5" />
            <span className="text-xs font-medium">{label}</span>
          </button>
        ))}
      </nav>

      {/* Mobile spacer */}
      <div className="md:hidden h-16" />
    </>
  );
}