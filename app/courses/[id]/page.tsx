"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { NavBar } from "@/components/nav-bar";
import { Footer } from "@/components/footer";
import type { Course } from "@/lib/courses";
import type { Module } from "@/lib/load-course";
import CourseClient from "./course-client";

export default function Page() {
  const params = useParams<{ id: string }>();
  const [data, setData] = useState<{ course: Course; modules: Module[] } | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(`/api/courses/${params.id}`)
      .then((r) => {
        if (!r.ok) throw new Error("not found");
        return r.json();
      })
      .then((res) => setData(res.data))
      .catch(() => setError(true));
  }, [params.id]);

  if (error) {
    return (
      <>
        <NavBar />
        <main className="pt-14 min-h-[80vh] flex items-center justify-center bg-white dark:bg-zinc-950">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-zinc-900 dark:text-white mb-3">
              课程未找到
            </h1>
            <p className="text-sm text-zinc-500 mb-6">
              你访问的课程不存在
            </p>
            <Link
              href="/courses"
              className="inline-flex h-11 items-center justify-center rounded-lg bg-zinc-900 dark:bg-white px-6 text-sm font-semibold text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-colors"
            >
              浏览全部课程
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (!data) return null;

  return <CourseClient course={data.course} modules={data.modules} />;
}
