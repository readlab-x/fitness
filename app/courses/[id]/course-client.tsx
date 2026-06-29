"use client";

import { useState } from "react";
import Link from "next/link";
import { Course } from "@/lib/courses";
import { Module } from "@/lib/load-course";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ThemeSwitcher } from "@/components/theme-switcher";
import {
  CheckCircle,
  ArrowLeft,
  ArrowRight,
  List,
  X,
} from "@phosphor-icons/react/dist/ssr";

export default function CourseClient({
  course,
  modules,
}: {
  course: Course;
  modules: Module[];
}) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const module = modules[activeIdx];
  const progress = Math.round(((activeIdx + 1) / modules.length) * 100);

  return (
    <div className="min-h-[100dvh] bg-white dark:bg-zinc-950 flex flex-col">
      <header className="h-14 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 flex items-center shrink-0">
        <div className="flex items-center justify-between w-full px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden w-8 h-8 rounded-lg flex items-center justify-center text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            >
              {sidebarOpen ? <X weight="bold" className="text-sm" /> : <List weight="bold" className="text-sm" />}
            </button>
            <Link href="/courses" className="text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors">
              {course.title}
            </Link>
            <div className="hidden sm:flex items-center gap-3 ml-2 pl-3 border-l border-zinc-200 dark:border-zinc-700">
              <span className="text-xs text-zinc-400 font-mono">
                {activeIdx + 1}/{modules.length}
              </span>
              <div className="w-24 h-1.5 rounded-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden">
                <div
                  className="h-full rounded-full bg-emerald-500 transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>
          <div>
            <ThemeSwitcher />
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <aside
          className={`${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-40 w-72 border-r border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 pt-14 lg:pt-14 transition-transform duration-200 overflow-y-auto`}
        >
          <div className="p-4 border-b border-zinc-200 dark:border-zinc-800">
            <h2 className="text-sm font-semibold text-zinc-900 dark:text-white mb-1">
              课程大纲
            </h2>
            <p className="text-xs text-zinc-400">
              {modules.length} 个模块 &middot; {course.duration}
            </p>
          </div>
          <div className="p-2">
            {modules.map((m, i) => (
              <button
                key={m.id}
                onClick={() => {
                  setActiveIdx(i);
                  setSidebarOpen(false);
                }}
                className={`w-full text-left rounded-lg px-3 py-2.5 transition-colors ${
                  i === activeIdx
                    ? "bg-emerald-50 dark:bg-emerald-950/30"
                    : "hover:bg-zinc-100 dark:hover:bg-zinc-800"
                }`}
              >
                <div className="flex items-start gap-2.5">
                  <span
                    className={`shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-semibold mt-0.5 ${
                      i === activeIdx
                        ? "bg-emerald-500 text-white"
                        : "bg-zinc-200 dark:bg-zinc-700 text-zinc-500 dark:text-zinc-400"
                    }`}
                  >
                    {i + 1}
                  </span>
                  <span
                    className={`text-xs leading-snug ${
                      i === activeIdx
                        ? "font-semibold text-emerald-700 dark:text-emerald-300"
                        : "text-zinc-600 dark:text-zinc-400"
                    }`}
                  >
                    {m.title}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </aside>

        {sidebarOpen && (
          <div
            className="fixed inset-0 z-30 bg-black/40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <main className="flex-1 overflow-y-auto">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
            <span className="inline-block text-[11px] font-mono uppercase tracking-[0.18em] text-emerald-600 dark:text-emerald-400 mb-3">
              模块 {activeIdx + 1}
            </span>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tighter text-zinc-900 dark:text-white mb-4">
              {module.title}
            </h1>
            <div className="text-sm md:text-base text-zinc-500 dark:text-zinc-400 leading-relaxed mb-8 prose prose-sm dark:prose-invert max-w-none">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {module.overview}
              </ReactMarkdown>
            </div>

            {module.sections.map((sec, i) => (
              <div key={i} className="mb-8">
                <h2 className="text-lg md:text-xl font-semibold text-zinc-900 dark:text-white mb-3">
                  {sec.heading}
                </h2>
                <div className="text-sm md:text-base text-zinc-600 dark:text-zinc-300 leading-[1.8] prose prose-sm dark:prose-invert max-w-none">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {sec.body}
                  </ReactMarkdown>
                </div>
              </div>
            ))}

            <div className="rounded-xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30 p-5 mb-8">
              <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider mb-3">
                核心要点
              </p>
              <ul className="space-y-2">
                {module.keyPoints.map((kp) => (
                  <li
                    key={kp}
                    className="flex items-start gap-2 text-sm text-emerald-800 dark:text-emerald-300 leading-snug"
                  >
                    <CheckCircle
                      weight="fill"
                      className="text-emerald-500 shrink-0 mt-0.5 text-xs"
                    />
                    {kp}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-zinc-200 dark:border-zinc-800">
              <button
                onClick={() => setActiveIdx(Math.max(0, activeIdx - 1))}
                disabled={activeIdx === 0}
                className="inline-flex h-10 items-center gap-1.5 rounded-lg px-4 text-sm font-semibold text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                <ArrowLeft weight="bold" className="text-xs" />
                上一节
              </button>
              <span className="text-xs text-zinc-400 font-mono">
                {activeIdx + 1} / {modules.length}
              </span>
              <button
                onClick={() =>
                  setActiveIdx(Math.min(modules.length - 1, activeIdx + 1))
                }
                disabled={activeIdx === modules.length - 1}
                className="inline-flex h-10 items-center gap-1.5 rounded-lg px-4 text-sm font-semibold text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                下一节
                <ArrowRight weight="bold" className="text-xs" />
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
