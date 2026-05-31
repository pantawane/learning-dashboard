import SkeletonCard from "@/components/SkeletonCard";

export default function Loading() {
  return (
    <div className="min-h-screen bg-[#080808] flex">
      <div className="w-16 bg-[#0a0a0a] border-r border-white/5" />
      <main className="flex-1 p-6">
        <div className="h-40 rounded-2xl bg-[#111] animate-pulse mb-6" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      </main>
    </div>
  );
}