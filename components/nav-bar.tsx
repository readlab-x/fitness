"use client";

import { useState } from "react";

export function NavBar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-16 border-b border-white/10 bg-zinc-950/80 backdrop-blur-md">
      <div className="container-main h-full flex items-center justify-between">
        <a href="#" className="flex items-center gap-2">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-emerald-500">
            <path d="M12 2L2 7l10 5 10-5-10-5z" />
            <path d="M2 17l10 5 10-5" />
            <path d="M2 12l10 5 10-5" />
          </svg>
          <span className="font-semibold text-sm text-white">FitLearn</span>
        </a>
        <div className="hidden md:flex items-center gap-8">
          <a href="/courses" className="text-sm text-zinc-400 hover:text-white transition-colors">课程</a>
          <a href="/#subjects" className="text-sm text-zinc-400 hover:text-white transition-colors">学科</a>
          <a href="#" className="inline-flex h-9 items-center justify-center rounded-lg bg-emerald-500 px-5 text-sm font-semibold text-white hover:bg-emerald-400 active:scale-[0.98] transition-all">
            免费注册
          </a>
        </div>
        <button onClick={() => setOpen(!open)} className="md:hidden text-zinc-400 hover:text-white transition-colors" aria-label="Menu">
          {open ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          )}
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-white/10 bg-zinc-950/95 backdrop-blur-md">
          <div className="container-main py-4 flex flex-col gap-3">
            <a href="/courses" onClick={() => setOpen(false)} className="text-sm text-zinc-400 hover:text-white transition-colors py-2">课程</a>
            <a href="/#subjects" onClick={() => setOpen(false)} className="text-sm text-zinc-400 hover:text-white transition-colors py-2">学科</a>
            <a href="#" onClick={() => setOpen(false)} className="inline-flex h-10 items-center justify-center rounded-lg bg-emerald-500 px-5 text-sm font-semibold text-white hover:bg-emerald-400 transition-all mt-2">
              免费注册
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
