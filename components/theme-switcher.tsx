"use client";

import { Sun, Moon, Monitor } from "@phosphor-icons/react/dist/ssr";
import { useTheme, type Theme } from "./theme-provider";

const options: { value: Theme; icon: typeof Sun; label: string }[] = [
  { value: "light", icon: Sun, label: "亮色" },
  { value: "dark", icon: Moon, label: "暗色" },
  { value: "system", icon: Monitor, label: "系统色" },
];

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-center gap-0.5 rounded-lg border border-zinc-200 dark:border-zinc-800 p-0.5">
      {options.map(({ value, icon: Icon, label }) => (
        <button
          key={value}
          onClick={() => setTheme(value)}
          className={`w-7 h-7 rounded-md flex items-center justify-center text-xs transition-colors ${
            theme === value
              ? "bg-emerald-500/20 text-emerald-400"
              : "text-zinc-400 dark:text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300"
          }`}
          aria-label={label}
        >
          <Icon weight="bold" className="text-sm" />
        </button>
      ))}
    </div>
  );
}
