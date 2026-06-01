import { createServerClient } from '@/lib/supabase';
import { Course } from '@/types';
import { notFound } from 'next/navigation';
import CourseDetailClient from './CourseDetailClient';

async function getCourse(id: string): Promise<Course | null> {
  try {
    const supabase = await createServerClient();
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .eq('id', id)
      .single();

    if (error) return null;
    return data;
  } catch {
    return null;
  }
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function CourseDetailPage({ params }: PageProps) {
  const { id } = await params;
  const course = await getCourse(id);

  if (!course) notFound();

  return <CourseDetailClient course={course} />;
}