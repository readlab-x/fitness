"use client";

import { useState } from "react";
import Image from "next/image";
import { Clock, Users, X, CheckCircle } from "@phosphor-icons/react/dist/ssr";
import type { Course } from "@/lib/courses";

export function FeaturedCourses({ courses }: { courses: Course[] }) {
  const [selected, setSelected] = useState<(typeof courses)[0] | null>(null);

  return (
    <section id="courses" className="py-24 md:py-32 bg-white dark:bg-zinc-950 scroll-mt-14">
      <div className="container-main">
        <div className="max-w-2xl mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-zinc-900 dark:text-white mb-4">
            全部课程
          </h2>
          <p className="text-base text-zinc-500 dark:text-zinc-400 leading-relaxed">
            由运动科学专家团队打造的高质量系统课程。
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {courses.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelected(c)}
              className="group rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden bg-white dark:bg-zinc-900 hover:border-emerald-500/30 transition-colors text-left cursor-pointer"
            >
              <div className="relative aspect-[3/2] overflow-hidden">
                <Image
                  src={c.image}
                  alt={c.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <span className="absolute top-3 left-3 rounded-md bg-white/90 dark:bg-zinc-900/90 px-2.5 py-1 text-[11px] font-semibold text-zinc-700 dark:text-zinc-300 backdrop-blur-sm">
                  {c.level}
                </span>
              </div>
              <div className="p-5">
                <h3 className="font-semibold text-base text-zinc-900 dark:text-white mb-1.5">
                  {c.title}
                </h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mb-4">
                  {c.desc}
                </p>
                <div className="flex items-center gap-4 text-xs text-zinc-400 dark:text-zinc-500">
                  <span className="flex items-center gap-1">
                    <Clock weight="regular" className="shrink-0" />
                    {c.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users weight="regular" className="shrink-0" />
                    {c.students}
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSelected(null)} />
          <div className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xl">
            <button
              onClick={() => setSelected(null)}
              className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors"
            >
              <X weight="bold" className="text-sm" />
            </button>
            <div className="relative aspect-[16/7] overflow-hidden rounded-t-2xl">
              <Image
                src={selected.image}
                alt={selected.title}
                fill
                className="object-cover"
                sizes="(max-width: 672px) 100vw, 672px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-6 right-6">
                <span className="inline-block rounded-md bg-emerald-500/90 px-2.5 py-1 text-[11px] font-semibold text-white mb-2">
                  {selected.level}
                </span>
                <h3 className="text-xl md:text-2xl font-bold text-white">
                  {selected.title}
                </h3>
              </div>
            </div>
            <div className="p-6 space-y-6">
              <div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4">
                  {selected.desc}
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center text-emerald-600 dark:text-emerald-400 font-semibold text-sm">
                    {selected.instructor[0]}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-zinc-900 dark:text-white">{selected.instructor}</p>
                    <p className="text-xs text-zinc-400 dark:text-zinc-500">{selected.role}</p>
                  </div>
                </div>
              </div>
              <div>
                <p className="text-sm font-semibold text-zinc-900 dark:text-white mb-3">学习收益</p>
                <ul className="space-y-2">
                  {selected.outcomes.map((o) => (
                    <li key={o} className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                      <CheckCircle weight="fill" className="text-emerald-500 shrink-0 mt-0.5" />
                      {o}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-sm font-semibold text-zinc-900 dark:text-white mb-3">课程大纲</p>
                <div className="space-y-1">
                  {selected.modules.map((m, i) => (
                    <div
                      key={m.id}
                      className="flex items-center gap-3 rounded-lg bg-zinc-50 dark:bg-zinc-800/50 px-4 py-3 text-sm text-zinc-600 dark:text-zinc-400"
                    >
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-[11px] font-semibold">
                        {i + 1}
                      </span>
                      {m.title}
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                <a
                  href={`/courses/${selected.id}`}
                  className="w-full inline-flex h-12 items-center justify-center rounded-lg bg-emerald-500 px-8 text-sm font-semibold text-white hover:bg-emerald-400 active:scale-[0.98] transition-all"
                >
                  开始学习 - {selected.title}
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
