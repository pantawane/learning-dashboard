'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Search, X } from 'lucide-react';

const notifications = [
  { id: 1, text: 'You completed 75% of Advanced React Patterns', time: '2h ago', unread: true },
  { id: 2, text: 'New course available: Next.js 16 Mastery', time: '5h ago', unread: true },
  { id: 3, text: 'Your streak is on fire! 12 days 🔥', time: '1d ago', unread: false },
];

export default function Topbar() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <motion.header
      className="flex items-center justify-between mb-6 gap-4"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      {/* Search Bar */}
      <motion.div
        className="flex items-center gap-2 bg-[#111111] border rounded-xl px-4 py-2.5 flex-1 max-w-sm"
        animate={{
          borderColor: searchFocused ? 'rgba(6,182,212,0.4)' : 'rgba(255,255,255,0.06)',
          boxShadow: searchFocused ? '0 0 16px rgba(6,182,212,0.1)' : 'none',
        }}
        transition={{ duration: 0.2 }}
      >
        <Search className="w-4 h-4 text-zinc-500 flex-shrink-0" />
        <input
          type="text"
          placeholder="Search courses..."
          className="bg-transparent text-sm text-white placeholder-zinc-600 outline-none w-full"
          onFocus={() => setSearchFocused(true)}
          onBlur={() => setSearchFocused(false)}
        />
      </motion.div>

      {/* Right Side */}
      <div className="flex items-center gap-3">
        {/* Notification Bell */}
        <div className="relative">
          <motion.button
            className="relative w-10 h-10 rounded-xl bg-[#111111] border border-white/[0.06] flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <motion.span
                className="absolute -top-1 -right-1 w-4 h-4 bg-cyan-500 rounded-full text-[10px] font-bold text-white flex items-center justify-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 500, damping: 20 }}
              >
                {unreadCount}
              </motion.span>
            )}
          </motion.button>

          {/* Notification Dropdown */}
          <AnimatePresence>
            {showNotifications && (
              <motion.div
                className="absolute right-0 top-12 w-80 bg-[#111111] border border-white/[0.08] rounded-2xl shadow-2xl z-50 overflow-hidden"
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              >
                <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.06]">
                  <h3 className="text-sm font-semibold text-white">Notifications</h3>
                  <button
                    onClick={() => setShowNotifications(false)}
                    className="text-zinc-500 hover:text-white transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                {notifications.map((n, i) => (
                  <motion.div
                    key={n.id}
                    className={`px-4 py-3 border-b border-white/[0.04] hover:bg-white/[0.03] transition-colors cursor-pointer ${
                      n.unread ? 'bg-cyan-500/[0.03]' : ''
                    }`}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <div className="flex items-start gap-3">
                      {n.unread && (
                        <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 flex-shrink-0" />
                      )}
                      <div className={n.unread ? '' : 'ml-4'}>
                        <p className="text-xs text-zinc-300 leading-relaxed">{n.text}</p>
                        <p className="text-xs text-zinc-600 mt-1">{n.time}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Avatar */}
        <motion.div
          className="flex items-center gap-3 bg-[#111111] border border-white/[0.06] rounded-xl px-3 py-2 cursor-pointer"
          whileHover={{
            scale: 1.02,
            borderColor: 'rgba(6,182,212,0.3)',
            transition: { type: 'spring', stiffness: 300, damping: 20 },
          }}
        >
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-xs font-bold text-white">
            V
          </div>
          <div className="hidden sm:block">
            <p className="text-xs font-medium text-white leading-none">Vansh</p>
            <p className="text-[10px] text-zinc-500 mt-0.5">Student</p>
          </div>
        </motion.div>
      </div>
    </motion.header>
  );
}