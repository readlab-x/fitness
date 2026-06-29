import type { Metadata } from "next";
import { NavBar } from "@/components/nav-bar";
import { Footer } from "@/components/footer";
import Image from "next/image";
import Link from "next/link";
import { Clock, Users } from "@phosphor-icons/react/dist/ssr";
import { courses } from "@/lib/courses";

export const metadata: Metadata = {
  title: "课程列表 | FitLearn",
  description: "浏览 FitLearn 全部系统课程，从解剖到周期化系统掌握运动科学。",
};

export default function CoursesPage() {
  return (
    <>
      <NavBar />
      <main className="pt-14">
        <section className="py-24 md:py-32 bg-zinc-950">
          <div className="container-main">
            <div className="max-w-2xl mb-16">
              <p className="text-emerald-400 font-mono text-xs uppercase tracking-[0.18em] mb-4">
                全部课程
              </p>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter text-white mb-4">
                系统学习运动科学
              </h1>
              <p className="text-base text-zinc-400 leading-relaxed">
                涵盖人体解剖、运动生理、生物力学、营养补剂、体态纠正、训练周期化和恢复科学等方向。
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((c) => (
                <Link
                  key={c.id}
                  href={`/courses/${c.id}`}
                  className="group rounded-xl border border-zinc-800 overflow-hidden bg-zinc-900 hover:border-emerald-500/30 transition-colors"
                >
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <Image
                      src={c.image}
                      alt={c.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <span className="absolute top-3 left-3 rounded-md bg-zinc-900/90 px-2.5 py-1 text-[11px] font-semibold text-zinc-300 backdrop-blur-sm">
                      {c.level}
                    </span>
                  </div>
                  <div className="p-5">
                    <h2 className="font-semibold text-base text-white mb-1.5">
                      {c.title}
                    </h2>
                    <p className="text-sm text-zinc-400 leading-relaxed mb-4">
                      {c.desc}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-zinc-500">
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
                </Link>
              ))}
            </div>
          </div>
        </section>
        <section className="py-16 md:py-24 bg-zinc-950 border-t border-zinc-800">
          <div className="container-main text-center">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tighter text-white mb-4">
              更多课程开发中
            </h2>
            <p className="text-sm text-zinc-400 leading-relaxed max-w-md mx-auto mb-6">
              运动生理、生物力学、补剂科学、体态纠正、恢复科学等课程正在紧锣密鼓地制作中。
            </p>
            <Link
              href="/"
              className="inline-flex h-11 items-center justify-center rounded-lg border border-zinc-700 px-6 text-sm font-semibold text-zinc-300 hover:bg-zinc-800 active:scale-[0.98] transition-all"
            >
              返回首页
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
