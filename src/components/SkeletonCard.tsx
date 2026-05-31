export default function SkeletonCard() {
    return (
      <div className="rounded-2xl p-5 bg-[#111111] border border-white/[0.06]">
        {/* Icon placeholder */}
        <div className="w-8 h-8 rounded bg-[#1e1e1e] animate-pulse mb-4" />
  
        {/* Title placeholder */}
        <div className="w-3/4 h-4 rounded bg-[#1e1e1e] animate-pulse mb-3" />
  
        {/* Subtitle placeholder */}
        <div className="w-1/3 h-3 rounded bg-[#1e1e1e] animate-pulse mb-4" />
  
        {/* Progress bar background */}
        <div className="w-full h-2 rounded-full bg-[#1e1e1e] animate-pulse overflow-hidden" />
      </div>
    )
  }
  