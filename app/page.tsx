import { Suspense } from 'react';
import { createServerClient } from '@/lib/supabase';
import { Course } from '@/types';
import Sidebar from '@/components/Sidebar';
import HeroTile from '@/components/HeroTile';
import CourseGrid from '@/components/CourseGrid';
import ActivityTile from '@/components/ActivityTile';
import SkeletonCard from '@/components/SkeletonCard';

async function getCourses(): Promise<Course[]> {
  try {
    const supabase = await createServerClient();
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) throw error;
    return data ?? [];
  } catch (error) {
    return [];
  }
}

function SkeletonFallback() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
    </div>
  );
}

export default async function DashboardPage() {
  let courses: Course[] = [];
  let fetchFailed = false;

  try {
    courses = await getCourses();
  } catch {
    fetchFailed = true;
  }

  if (fetchFailed) {
    return (
      <div className="min-h-screen bg-[#080808] flex items-center justify-center">
        <div className="text-zinc-400 text-sm bg-[#111] border border-white/5 rounded-2xl px-6 py-4">
          Failed to load courses. Please try again.
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#080808]">
      <Sidebar />

      <main className="flex-1 p-6 overflow-y-auto">
        <section className="mb-6">
          <HeroTile />
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <Suspense fallback={<SkeletonFallback />}>
              <CourseGrid courses={courses} />
            </Suspense>
          </div>

          <div className="lg:col-span-1">
            <ActivityTile />
          </div>
        </div>
      </main>
    </div>
  );
}