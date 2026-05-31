'use client';

import { useMemo } from 'react';
import { Calendar } from 'lucide-react';

const COLORS = ['#166534', '#15803d', '#16a34a', '#22c55e'];

function seededRandom(seed: number): number {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

export default function ActivityTile() {
  const gridData = useMemo(() => {
    return Array.from({ length: 84 }, (_, i) => {
      const rand = seededRandom(i);
      const isActive = rand > 0.4;
      return {
        id: i,
        color: isActive ? COLORS[Math.floor(seededRandom(i + 100) * COLORS.length)] : '#1a1a1a',
        title: isActive ? 'Active' : 'No activity',
      };
    });
  }, []);

  return (
    <div className="rounded-2xl bg-[#0f0f0f] border border-white/5 p-5 h-full">
      <div className="flex items-center gap-2 mb-4">
        <Calendar className="w-4 h-4 text-zinc-400" />
        <h3 className="text-sm font-medium text-zinc-200">Learning Activity</h3>
      </div>
      <p className="text-xs text-zinc-500 mb-4">Last 12 weeks</p>
      <div
        className="grid gap-1"
        style={{ gridTemplateColumns: 'repeat(12, minmax(0, 1fr))' }}
      >
        {gridData.map((square) => (
          <div
            key={square.id}
            className="h-4 w-4 rounded-sm"
            style={{ backgroundColor: square.color }}
            title={square.title}
          />
        ))}
      </div>
    </div>
  );
}