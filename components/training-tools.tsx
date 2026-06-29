import { Scales, Barbell, Heartbeat, Fire, Drop, CalendarCheck } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

const toolCards = [
  { icon: Scales, label: "BMI 计算", desc: "身体质量指数快速评估", href: "/tools" },
  { icon: Barbell, label: "1RM 估算", desc: "Epley 公式预测最大力量", href: "/tools" },
  { icon: Heartbeat, label: "TDEE 计算", desc: "BMR 与每日总消耗", href: "/tools" },
  { icon: Fire, label: "热量记录", desc: "食物热量追踪与日志", href: "/tools" },
  { icon: Drop, label: "碳水循环", desc: "训练/休息日宏量营养素", href: "/tools" },
  { icon: CalendarCheck, label: "周期规划", desc: "个性化周期训练方案", href: "/tools" },
];

export function TrainingTools() {
  return (
    <section className="py-24 md:py-32 bg-white dark:bg-zinc-950">
      <div className="container-main">
        <div className="max-w-2xl mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-zinc-900 dark:text-white mb-4">
            训练工具箱
          </h2>
          <p className="text-base text-zinc-500 dark:text-zinc-400 leading-relaxed">
            基于运动科学公式的交互计算工具，精准规划训练与营养方案。
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {toolCards.map((t) => {
            const Icon = t.icon;
            return (
              <Link
                key={t.label}
                href={t.href}
                className="group rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 hover:border-emerald-500/30 hover:shadow-sm transition-all"
              >
                <div className="w-10 h-10 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 flex items-center justify-center mb-3 group-hover:bg-emerald-100 dark:group-hover:bg-emerald-950/50 transition-colors">
                  <Icon className="text-emerald-600 dark:text-emerald-400 text-lg" />
                </div>
                <p className="text-sm font-semibold text-zinc-900 dark:text-white mb-1">{t.label}</p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">{t.desc}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
