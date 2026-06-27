import { Clock } from "@phosphor-icons/react/dist/ssr";

const steps = [
  {
    stage: "基础入门",
    subjects: "解剖 + 生理",
    desc: "建立人体结构与功能的基础认知",
    duration: "4周",
  },
  {
    stage: "力学分析",
    subjects: "生物力学",
    desc: "理解动作背后的物理原理与杠杆机制",
    duration: "3周",
  },
  {
    stage: "营养干预",
    subjects: "营养 + 补剂",
    desc: "掌握能量代谢与膳食补充策略",
    duration: "4周",
  },
  {
    stage: "功能纠正",
    subjects: "体态纠正",
    desc: "学习姿态评估与运动功能重建",
    duration: "3周",
  },
  {
    stage: "编程进阶",
    subjects: "训练周期化",
    desc: "设计个性化训练周期与负荷方案",
    duration: "5周",
  },
  {
    stage: "持续优化",
    subjects: "恢复科学",
    desc: "运用恢复手段最大化训练收益",
    duration: "3周",
  },
];

export function LearningPath() {
  return (
    <section className="py-24 md:py-32 bg-zinc-50 dark:bg-zinc-900">
      <div className="container-main">
        <div className="max-w-2xl mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-zinc-900 dark:text-white mb-4">
            从入门到精通的路径
          </h2>
          <p className="text-base text-zinc-500 dark:text-zinc-400 leading-relaxed">
            推荐学习顺序，循序渐进构建完整的健身科学知识框架。
          </p>
        </div>
        <div className="relative overflow-hidden">
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-zinc-200 dark:bg-zinc-700 -translate-x-1/2" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 lg:gap-x-12 lg:gap-y-8">
            {steps.map((step, i) => (
              <div
                key={step.stage}
                className={`${
                  i % 2 === 0 ? "lg:text-right lg:pr-8" : "lg:col-start-2 lg:pl-8"
                }`}
              >
                <div
                  className={`relative rounded-xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 p-6 ${
                    i % 2 === 0 ? "lg:mr-0" : "lg:ml-0"
                  }`}
                >
                  <div className={`hidden lg:flex absolute top-6 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white dark:border-zinc-900 shadow-sm ${i % 2 === 0 ? "-right-[1.375rem]" : "-left-[1.375rem]"}`}>
                    <span className="sr-only">步骤 {i + 1}</span>
                  </div>
                  <span className="inline-block text-[11px] font-mono uppercase tracking-[0.18em] text-emerald-600 dark:text-emerald-400 mb-2">
                    {step.stage}
                  </span>
                  <h3 className="font-semibold text-base text-zinc-900 dark:text-white mb-1">
                    {step.subjects}
                  </h3>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mb-3">
                    {step.desc}
                  </p>
                  <span className="inline-flex items-center gap-1 text-xs text-zinc-400 dark:text-zinc-500 font-mono">
                    <Clock weight="regular" className="shrink-0" />
                    {step.duration}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
