export function CTASection() {
  return (
    <section className="py-24 md:py-32 bg-zinc-950 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(16,185,129,0.12)_0%,_transparent_60%)]" />
      <div className="container-main relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter text-white mb-6">
            开始你的科学训练之旅
          </h2>
          <p className="text-base md:text-lg text-zinc-400 leading-relaxed mb-8 max-w-lg mx-auto">
            不再凭感觉训练。用科学知识武装每一次重复、每一组计划、每一个周期。
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="#"
              className="inline-flex h-12 items-center justify-center rounded-lg bg-emerald-500 px-8 text-sm font-semibold text-white hover:bg-emerald-400 active:scale-[0.98] transition-all"
            >
              免费开始学习
            </a>
            <a
              href="#"
              className="inline-flex h-12 items-center justify-center rounded-lg border border-zinc-700 px-8 text-sm font-semibold text-zinc-300 hover:bg-zinc-800 active:scale-[0.98] transition-all"
            >
              查看课程大纲
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
