import Image from "next/image";

export function TrainingTools() {
  return (
    <section className="py-24 md:py-32 bg-white dark:bg-zinc-950">
      <div className="container-main">
        <div className="max-w-2xl mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-zinc-900 dark:text-white mb-4">
            训练周期化工具
          </h2>
          <p className="text-base text-zinc-500 dark:text-zinc-400 leading-relaxed">
            从目标设定到周期拆解，AI 辅助生成个性化训练计划。
          </p>
        </div>
        <div className="relative rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden bg-zinc-900">
          <div className="relative aspect-[16/7]">
            <Image
              src="https://picsum.photos/seed/training-dashboard-analytics/1200/520"
              alt="训练周期化仪表盘界面"
              fill
              className="object-cover opacity-70"
              sizes="100vw"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/80 via-zinc-900/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-emerald-400 mb-1">周期规划器</p>
                <p className="text-zinc-300 text-sm leading-relaxed max-w-md">
                  基于你的训练水平、目标和可用时间，自动生成线性或波动周期方案。
                </p>
              </div>
              <a
                href="#"
                className="inline-flex h-11 items-center justify-center rounded-lg bg-emerald-500 px-6 text-sm font-semibold text-white hover:bg-emerald-400 active:scale-[0.98] transition-all shrink-0"
              >
                开始规划
              </a>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          {[
            { label: "最大力量周期", value: "12周", color: "border-l-emerald-500" },
            { label: "肌肥大周期", value: "8周", color: "border-l-sky-500" },
            { label: "力量耐力周期", value: "6周", color: "border-l-amber-500" },
            { label: "竞赛峰值周期", value: "4周", color: "border-l-violet-500" },
          ].map((item) => (
            <div
              key={item.label}
              className={`rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 border-l-4 ${item.color} p-4`}
            >
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">{item.label}</p>
              <p className="text-lg font-bold text-zinc-900 dark:text-white">{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
