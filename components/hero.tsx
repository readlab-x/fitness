import Image from "next/image";

export function Hero() {
  return (
    <section className="relative min-h-[100dvh] bg-zinc-950 overflow-hidden pt-16">
      <div className="absolute inset-0">
        <Image
          src="https://picsum.photos/seed/fitness-athlete-studio/1920/1280"
          alt=""
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/60 to-zinc-950/40" />
      </div>
      <div className="container-main relative z-10 min-h-[100dvh] flex items-center">
        <div className="max-w-xl">
          <p className="text-emerald-400 font-mono text-xs uppercase tracking-[0.18em] mb-4">
            运动科学系统课程
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-white leading-[1.1] mb-6">
            用科学
            <br />
            重新理解训练
          </h1>
          <p className="text-base md:text-lg text-zinc-400 leading-relaxed max-w-lg mb-8">
            解剖、生理、力学、营养、补剂、体态纠正、周期化、恢复科学
            - 八大模块系统掌握健身底层逻辑。
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="#courses"
              className="inline-flex h-12 items-center justify-center rounded-lg bg-emerald-500 px-8 text-sm font-semibold text-white hover:bg-emerald-400 active:scale-[0.98] transition-all"
            >
              开始学习
            </a>
            <a
              href="#subjects"
              className="inline-flex h-12 items-center justify-center rounded-lg border border-zinc-700 px-8 text-sm font-semibold text-zinc-300 hover:bg-zinc-800 active:scale-[0.98] transition-all"
            >
              浏览学科
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
