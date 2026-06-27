export function StatsRow() {
  return (
    <section className="py-16 bg-emerald-500 dark:bg-emerald-600">
      <div className="container-main">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {[
            { value: "5000+", label: "活跃学员" },
            { value: "120+", label: "系统课程" },
            { value: "98.5%", label: "课程完成率" },
            { value: "4.8", label: "学员评分" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-white tracking-tighter">
                {stat.value}
              </p>
              <p className="text-sm text-emerald-100 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
