import Image from "next/image";

export function AnatomyDive() {
  return (
    <section className="py-24 md:py-32 bg-zinc-950 relative overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="https://picsum.photos/seed/anatomy-body-scan/1600/900"
          alt="人体解剖三维扫描模型"
          fill
          className="object-cover opacity-30"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/70 to-transparent" />
      </div>
      <div className="container-main relative z-10">
        <div className="max-w-xl">
          <p className="text-emerald-400 font-mono text-xs uppercase tracking-[0.18em] mb-4">
            深度解析
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-white mb-6">
            解剖与生理
            <br />
            从结构理解功能
          </h2>
          <p className="text-base text-zinc-400 leading-relaxed mb-10 max-w-lg">
            每一块肌肉的起止点、每一条神经的支配路径、每一个关节的运动平面。
            只有读懂身体的设计原理，训练才有据可依。
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { label: "骨骼系统", desc: "206块骨的功能标记" },
              { label: "肌群网络", desc: "起止点与功能协同" },
              { label: "神经支配", desc: "运动单位的募集机制" },
              { label: "关节力学", desc: "自由度与运动平面" },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-lg bg-white/5 border border-white/10 p-4 backdrop-blur-sm"
              >
                <p className="font-semibold text-sm text-white mb-0.5">
                  {item.label}
                </p>
                <p className="text-xs text-zinc-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
