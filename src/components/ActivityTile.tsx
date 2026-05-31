'use client';

import { useMemo } from 'react';
import { Calendar } from 'lucide-react';

interface ActivitySquare {
  id: string;
  color: string;
}

export default function ActivityTile() {
  const gridData = useMemo(() => {
    const squares: ActivitySquare[] = [];
    const greenShades = ['#166534', '#15803d', '#16a34a', '#22c55e'];

    for (let i = 0; i < 84; i++) {
      const randomValue = Math.random();
      let color: string;

      if (randomValue < 0.7) {
        color = '#1a1a1a';
      } else {
        color = greenShades[Math.floor(Math.random() * greenShades.length)];
      }

      squares.push({
        id: `square-${i}`,
        color,
      });
    }

    return squares;
  }, []);

  return (
    <div className="rounded-2xl border border-white/5 bg-[#0f0f0f] p-5">
      <div className="mb-4 flex items-center gap-2">
        <Calendar className="h-5 w-5 text-cyan-400" />
        <h3 className="text-lg font-semibold text-white">Learning Activity</h3>
      </div>

      <p className="mb-4 text-sm text-gray-500">Last 12 weeks</p>

      <div className="grid gap-1" style={{ gridTemplateColumns: 'repeat(12, minmax(0, 1fr))' }}>
        {gridData.map((square) => (
          <div
            key={square.id}
            className="h-4 w-4 rounded-sm transition-all duration-200 hover:scale-125 hover:shadow-lg"
            style={{ backgroundColor: square.color }}
            title={square.color === '#1a1a1a' ? 'No activity' : 'Active'}
          />
        ))}
      </div>
    </div>
  );
}
