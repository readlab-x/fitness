"use client";

import { motion } from "motion/react";
import {
  Bone,
  Heartbeat,
  Funnel,
  ForkKnife,
  Flask,
  PersonSimpleRun,
  ChartLineUp,
  MoonStars,
} from "@phosphor-icons/react/dist/ssr";

const subjects = [
  {
    title: "解剖学",
    desc: "骨骼、关节、肌肉起止点与功能解剖",
    icon: Bone,
    bg: "bg-emerald-50 dark:bg-emerald-950/30",
    fc: "text-emerald-600 dark:text-emerald-400",
  },
  {
    title: "运动生理",
    desc: "能量代谢、心肺适应、神经肌肉调控",
    icon: Heartbeat,
    bg: "bg-sky-50 dark:bg-sky-950/30",
    fc: "text-sky-600 dark:text-sky-400",
  },
  {
    title: "生物力学",
    desc: "杠杆系统、力矩分析、动作效率优化",
    icon: Funnel,
    bg: "bg-violet-50 dark:bg-violet-950/30",
    fc: "text-violet-600 dark:text-violet-400",
  },
  {
    title: "运动营养",
    desc: "宏量营养素、能量平衡、训练饮食策略",
    icon: ForkKnife,
    bg: "bg-amber-50 dark:bg-amber-950/30",
    fc: "text-amber-600 dark:text-amber-400",
  },
  {
    title: "补剂科学",
    desc: "循证补剂评估、剂量、时机与安全性",
    icon: Flask,
    bg: "bg-rose-50 dark:bg-rose-950/30",
    fc: "text-rose-600 dark:text-rose-400",
  },
  {
    title: "体态纠正",
    desc: "姿态评估、失衡矫正、功能重建方案",
    icon: PersonSimpleRun,
    bg: "bg-cyan-50 dark:bg-cyan-950/30",
    fc: "text-cyan-600 dark:text-cyan-400",
  },
  {
    title: "训练周期化",
    desc: "线性周期、波动周期、超负荷与恢复",
    icon: ChartLineUp,
    bg: "bg-orange-50 dark:bg-orange-950/30",
    fc: "text-orange-600 dark:text-orange-400",
  },
  {
    title: "恢复科学",
    desc: "睡眠、神经恢复、主动恢复策略",
    icon: MoonStars,
    bg: "bg-indigo-50 dark:bg-indigo-950/30",
    fc: "text-indigo-600 dark:text-indigo-400",
  },
];

export function SubjectGrid() {
  return (
    <section id="subjects" className="py-24 md:py-32 bg-white dark:bg-zinc-950 scroll-mt-14">
      <div className="container-main">
        <div className="max-w-2xl mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-zinc-900 dark:text-white mb-4">
            八大核心学科
          </h2>
          <p className="text-base text-zinc-500 dark:text-zinc-400 leading-relaxed">
            从人体结构到训练编程，系统构建运动科学知识体系。
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {subjects.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              className={`rounded-xl p-6 border border-zinc-100 dark:border-zinc-800 ${s.bg} hover:shadow-md transition-shadow`}
            >
              <s.icon weight="duotone" className={`text-2xl mb-3 ${s.fc}`} />
              <h3 className={`font-semibold text-base mb-1.5 ${s.fc}`}>
                {s.title}
              </h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                {s.desc}
              </p>
            </motion.div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <a
            href="/courses"
            className="inline-flex h-11 items-center justify-center rounded-lg border border-zinc-200 dark:border-zinc-700 px-6 text-sm font-semibold text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 active:scale-[0.98] transition-all"
          >
            查看全部课程
          </a>
        </div>
      </div>
    </section>
  );
}
