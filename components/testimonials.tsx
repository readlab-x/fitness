import Image from "next/image";
import { Quotes } from "@phosphor-icons/react/dist/ssr";

const testimonials = [
  {
    quote: "以前跟着视频练总是不明所以，学完解剖和力学之后才知道每个动作的设计意图。效果完全不一样。",
    name: "张旭",
    role: "健身爱好者，训练3年",
    seed: "portrait-athlete-male-1",
  },
  {
    quote: "作为私人教练，周期化课程帮我给会员设计出了真正有逻辑的训练方案，续课率明显提升了。",
    name: "李婷",
    role: "ACE 认证私人教练",
    seed: "portrait-trainer-female-1",
  },
  {
    quote: "营养和补剂模块循证做得很好，不贩卖焦虑也不盲目推崇，每个建议都有研究支撑。",
    name: "王浩然",
    role: "运动营养师",
    seed: "portrait-nutritionist-male-1",
  },
  {
    quote: "体态纠正课程让我对自己的身体对称性有了全新认识，现在训练前都会做针对性激活。",
    name: "陈思雨",
    role: "CrossFit 运动员",
    seed: "portrait-athlete-female-1",
  },
];

export function Testimonials() {
  return (
    <section className="py-24 md:py-32 bg-zinc-50 dark:bg-zinc-900">
      <div className="container-main">
        <div className="max-w-2xl mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-zinc-900 dark:text-white mb-4">
            来自学习社区的声音
          </h2>
          <p className="text-base text-zinc-500 dark:text-zinc-400 leading-relaxed">
            已有超过 5000 名健身爱好者和从业者通过系统学习实现了训练升级。
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              className={`rounded-xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 p-6 ${
                i === 0 ? "sm:row-span-2 sm:flex sm:flex-col sm:justify-center" : ""
              }`}
            >
              <Quotes weight="fill" className="text-emerald-200 dark:text-emerald-800 mb-3 text-xl" />
              <blockquote className="text-sm md:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed mb-6 flex-1">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-zinc-200 dark:bg-zinc-600 overflow-hidden shrink-0 relative">
                  <Image
                    src={`https://picsum.photos/seed/${t.seed}/80/80`}
                    alt={t.name}
                    fill
                    className="object-cover"
                    sizes="40px"
                  />
                </div>
                <div>
                  <p className="text-sm font-semibold text-zinc-900 dark:text-white">
                    {t.name}
                  </p>
                  <p className="text-xs text-zinc-400 dark:text-zinc-500">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
