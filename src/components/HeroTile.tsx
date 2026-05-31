'use client';

export default function HeroTile() {
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/5 bg-gradient-to-br from-[#0f0f0f] to-[#1a1a1a] p-8 md:p-12">
      {/* Subtle animated background glow */}
      <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-gradient-to-b from-purple-500 to-transparent opacity-5 blur-3xl" />

      {/* Content */}
      <div className="relative z-10 space-y-4">
        {/* Greeting */}
        <h1 className="text-4xl md:text-5xl font-bold text-white">
          Welcome back, Vansh 👋
        </h1>

        {/* Current Date */}
        <p className="text-sm text-gray-500">{currentDate}</p>

        {/* Motivational Quote */}
        <p className="text-sm italic text-gray-600">
          Every streak begins with a single step. Keep the momentum going!
        </p>

        {/* Streak Badge */}
        <div className="pt-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-500/20 to-orange-600/20 px-4 py-2 backdrop-blur-sm border border-orange-500/30">
            <span className="text-xl">🔥</span>
            <span className="font-semibold text-orange-400">12 Day Streak</span>
          </div>
        </div>
      </div>
 
    </div>
  );
}
