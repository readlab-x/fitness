export function Footer() {
  return (
    <footer className="py-12 md:py-16 bg-zinc-950 border-t border-zinc-800">
      <div className="container-main">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-emerald-500">
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
              <span className="font-semibold text-sm text-white">FitLearn</span>
            </div>
            <p className="text-xs text-zinc-500 leading-relaxed max-w-xs">
              用科学重新理解训练。系统学习运动科学知识，从解剖到周期化，构建完整的训练理论框架。
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-4">学科</p>
            <ul className="space-y-2">
              {["解剖学", "运动生理", "生物力学", "运动营养"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-4">课程</p>
            <ul className="space-y-2">
              {["精选课程", "学习路径", "周期化工具", "体态评估"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-4">关于</p>
            <ul className="space-y-2">
              {["关于我们", "帮助中心", "用户协议", "隐私政策"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-zinc-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-zinc-600">
            FitLearn &copy; {new Date().getFullYear()} - 用科学重新理解训练
          </p>
          <div className="flex items-center gap-4">
            {["微信", "微博", "知乎", "B站"].map((item) => (
              <a key={item} href="#" className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors">{item}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
