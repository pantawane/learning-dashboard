'use client';

import { useMemo } from 'react';
import { Calendar } from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { motion } from 'framer-motion';

const WEEKS = ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8', 'W9', 'W10', 'W11', 'W12'];

function seededRandom(seed: number): number {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

interface TooltipProps {
  active?: boolean;
  payload?: { value: number }[];
  label?: string;
}

function CustomTooltip({ active, payload, label }: TooltipProps) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#1a1a1a] border border-white/[0.08] rounded-xl px-3 py-2">
        <p className="text-xs text-zinc-400">{label}</p>
        <p className="text-sm font-semibold text-cyan-400">
          {payload[0].value} lessons
        </p>
      </div>
    );
  }
  return null;
}

export default function ActivityTile() {
  const chartData = useMemo(() => {
    return WEEKS.map((week, i) => ({
      week,
      lessons: Math.floor(seededRandom(i) * 10) + 1,
    }));
  }, []);

  const totalLessons = useMemo(
    () => chartData.reduce((sum, d) => sum + d.lessons, 0),
    [chartData]
  );

  const avgPerWeek = useMemo(
    () => Math.round(totalLessons / WEEKS.length),
    [totalLessons]
  );

  return (
    <motion.div
      className="rounded-2xl bg-[#0f0f0f] border border-white/5 p-5 h-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25, delay: 0.2 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-zinc-400" />
          <h3 className="text-sm font-medium text-zinc-200">Learning Activity</h3>
        </div>
        <span className="text-xs text-zinc-600">Last 12 weeks</span>
      </div>

      {/* Stats Row */}
      <div className="flex items-center gap-4 mb-4 mt-3">
        <div>
          <p className="text-lg font-bold text-white leading-none">{totalLessons}</p>
          <p className="text-[10px] text-zinc-600 mt-0.5">Total lessons</p>
        </div>
        <div className="w-px h-8 bg-white/[0.06]" />
        <div>
          <p className="text-lg font-bold text-cyan-400 leading-none">{avgPerWeek}</p>
          <p className="text-[10px] text-zinc-600 mt-0.5">Avg / week</p>
        </div>
      </div>

      {/* Chart */}
      <div className="w-full h-32">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{ top: 4, right: 4, left: -28, bottom: 0 }}
          >
            <defs>
              <linearGradient id="activityGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="week"
              tick={{ fill: '#52525b', fontSize: 9 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: '#52525b', fontSize: 9 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="lessons"
              stroke="#06b6d4"
              strokeWidth={2}
              fill="url(#activityGradient)"
              dot={false}
              activeDot={{
                r: 4,
                fill: '#06b6d4',
                strokeWidth: 0,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}