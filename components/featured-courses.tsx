import Image from "next/image";
import { Clock, Users } from "@phosphor-icons/react/dist/ssr";

const courses = [
  {
    title: "人体解剖学精讲",
    desc: "系统学习骨骼、关节与肌肉的功能解剖学",
    image: "https://picsum.photos/seed/anatomy-muscle-study/600/400",
    level: "基础",
    duration: "24课时",
    students: "2.4k",
  },
  {
    title: "训练周期化实战",
    desc: "从线性周期到波动周期的完整编程方法",
    image: "https://picsum.photos/seed/training-programming/600/400",
    level: "进阶",
    duration: "30课时",
    students: "1.8k",
  },
  {
    title: "运动营养科学",
    desc: "能量代谢、宏量营养素与训练饮食策略",
    image: "https://picsum.photos/seed/nutrition-planning/600/400",
    level: "中级",
    duration: "20课时",
    students: "3.1k",
  },
];

export function FeaturedCourses() {
  return (
    <section id="courses" className="py-24 md:py-32 bg-white dark:bg-zinc-950">
      <div className="container-main">
        <div className="max-w-2xl mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-zinc-900 dark:text-white mb-4">
            精选课程
          </h2>
          <p className="text-base text-zinc-500 dark:text-zinc-400 leading-relaxed">
            由运动科学专家团队打造的高质量系统课程。
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {courses.map((c) => (
            <article
              key={c.title}
              className="group rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden bg-white dark:bg-zinc-900 hover:shadow-lg transition-shadow"
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
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
