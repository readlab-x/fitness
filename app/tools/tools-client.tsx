"use client";

import { useState, useEffect, type ReactNode } from "react";
import {
  Scales,
  Barbell,
  Heartbeat,
  Drop,
  CalendarCheck,
  Fire,
  Trash,
  Plus,
} from "@phosphor-icons/react/dist/ssr";

type ToolKey = "bmi" | "1rm" | "tdee" | "carb-cycle" | "periodization" | "calorie";

interface ToolDef {
  key: ToolKey;
  label: string;
  icon: typeof Scales;
  desc: string;
}

const tools: ToolDef[] = [
  { key: "bmi", label: "BMI 计算", icon: Scales, desc: "身体质量指数评估" },
  { key: "1rm", label: "1RM 估算", icon: Barbell, desc: "最大力量预测" },
  { key: "tdee", label: "TDEE 计算", icon: Heartbeat, desc: "每日总能量消耗" },
  { key: "calorie", label: "热量记录", icon: Fire, desc: "食物热量追踪与记录" },
  { key: "carb-cycle", label: "碳水循环", icon: Drop, desc: "碳水循环计划生成" },
  { key: "periodization", label: "周期规划", icon: CalendarCheck, desc: "训练周期方案设计" },
];

function classNames(...classes: (string | false | undefined | null)[]) {
  return classes.filter(Boolean).join(" ");
}

function BmiCalc() {
  const [height, setHeight] = useState("175");
  const [weight, setWeight] = useState("70");
  const h = parseFloat(height);
  const w = parseFloat(weight);
  const bmi = h > 0 && w > 0 ? w / ((h / 100) * (h / 100)) : null;
  const getCategory = (v: number) => {
    if (v < 18.5) return { label: "偏瘦", color: "text-sky-500", bar: "bg-sky-500", pct: "15%" };
    if (v < 24) return { label: "正常", color: "text-emerald-500", bar: "bg-emerald-500", pct: "40%" };
    if (v < 28) return { label: "超重", color: "text-amber-500", bar: "bg-amber-500", pct: "65%" };
    return { label: "肥胖", color: "text-red-500", bar: "bg-red-500", pct: "85%" };
  };
  const cat = bmi ? getCategory(bmi) : null;
  const bmiPct = bmi ? Math.min((bmi / 40) * 100, 100) : 0;

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-medium text-zinc-400 mb-1.5 block">身高 (cm)</label>
          <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} className="w-full rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2.5 text-sm text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/40" />
        </div>
        <div>
          <label className="text-xs font-medium text-zinc-400 mb-1.5 block">体重 (kg)</label>
          <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} className="w-full rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2.5 text-sm text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/40" />
        </div>
      </div>
      {bmi !== null && (
        <div className="rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 p-5 space-y-4">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-xs text-zinc-400 mb-0.5">你的 BMI</p>
              <p className="text-3xl font-bold text-zinc-900 dark:text-white">{bmi.toFixed(1)}</p>
            </div>
            <p className={classNames("text-lg font-semibold", cat?.color)}>{cat?.label}</p>
          </div>
          <div className="h-2 rounded-full bg-zinc-200 dark:bg-zinc-700 overflow-hidden">
            <div className={classNames("h-full rounded-full transition-all duration-500", cat?.bar)} style={{ width: bmiPct + "%" }} />
          </div>
          <div className="flex justify-between text-[11px] text-zinc-400">
            <span>偏瘦</span><span>正常</span><span>超重</span><span>肥胖</span>
          </div>
          <div className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
            BMI 是衡量体重是否健康的参考指标，不适用于运动员或肌肉量较高的人群。
          </div>
        </div>
      )}
    </div>
  );
}

function RmCalc() {
  const [weight, setWeight] = useState("80");
  const [reps, setReps] = useState("5");
  const w = parseFloat(weight);
  const r = parseInt(reps);
  const rm1 = w > 0 && r > 0 && r <= 30 ? w * (1 + 0.0333 * r) : null;
  const zones = rm1
    ? [
        { label: "100%", value: rm1, zone: "极限" },
        { label: "90%", value: rm1 * 0.9, zone: "力量" },
        { label: "80%", value: rm1 * 0.8, zone: "力量" },
        { label: "70%", value: rm1 * 0.7, zone: "肌肥大" },
        { label: "60%", value: rm1 * 0.6, zone: "耐力" },
        { label: "50%", value: rm1 * 0.5, zone: "恢复" },
      ]
    : [];

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-medium text-zinc-400 mb-1.5 block">重量 (kg)</label>
          <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} className="w-full rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2.5 text-sm text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/40" />
        </div>
        <div>
          <label className="text-xs font-medium text-zinc-400 mb-1.5 block">完成次数</label>
          <input type="number" min={1} max={30} value={reps} onChange={(e) => setReps(e.target.value)} className="w-full rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2.5 text-sm text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/40" />
        </div>
      </div>
      {rm1 !== null && (
        <div className="rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 p-5 space-y-4">
          <div className="text-center pb-3 border-b border-zinc-200 dark:border-zinc-700">
            <p className="text-xs text-zinc-400 mb-0.5">预估 1RM</p>
            <p className="text-3xl font-bold text-zinc-900 dark:text-white">{rm1.toFixed(1)} kg</p>
            <p className="text-xs text-zinc-400 mt-1">Epley 公式</p>
          </div>
          <div className="space-y-1.5">
            {zones.map((z) => (
              <div key={z.label} className="flex items-center gap-3 text-sm">
                <span className="w-12 text-right text-zinc-500 font-mono text-xs">{z.label}</span>
                <div className="flex-1 h-5 rounded bg-zinc-200 dark:bg-zinc-700 overflow-hidden relative">
                  <div
                    className="h-full rounded bg-emerald-500 flex items-center px-2"
                    style={{ width: `${parseFloat(z.label)}%` }}
                  >
                    <span className="text-[10px] font-semibold text-white whitespace-nowrap">
                      {z.value.toFixed(0)} kg
                    </span>
                  </div>
                </div>
                <span className="w-8 text-[11px] text-zinc-400">{z.zone}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function TdeeCalc() {
  const [gender, setGender] = useState<"male" | "female">("male");
  const [age, setAge] = useState("28");
  const [height, setHeight] = useState("175");
  const [weight, setWeight] = useState("70");
  const [activity, setActivity] = useState("1.55");
  const a = parseInt(age);
  const h = parseFloat(height);
  const w = parseFloat(weight);
  const act = parseFloat(activity);
  let bmr: number | null = null;
  if (a > 0 && h > 0 && w > 0) {
    if (gender === "male") bmr = 10 * w + 6.25 * h - 5 * a + 5;
    else bmr = 10 * w + 6.25 * h - 5 * a - 161;
  }
  const tdee = bmr !== null ? bmr * act : null;

  const activityOpts = [
    { value: "1.2", label: "久坐", desc: "几乎不运动" },
    { value: "1.375", label: "轻度", desc: "每周1-3天" },
    { value: "1.55", label: "中度", desc: "每周3-5天" },
    { value: "1.725", label: "高度", desc: "每周6-7天" },
    { value: "1.9", label: "极高", desc: "高强度每日" },
  ];

  return (
    <div className="space-y-5">
      <div className="flex gap-2">
        <button onClick={() => setGender("male")} className={classNames("flex-1 rounded-lg border py-2.5 text-sm font-medium transition-colors", gender === "male" ? "bg-emerald-500 text-white border-emerald-500" : "border-zinc-200 dark:border-zinc-700 text-zinc-500 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800")}>男性</button>
        <button onClick={() => setGender("female")} className={classNames("flex-1 rounded-lg border py-2.5 text-sm font-medium transition-colors", gender === "female" ? "bg-emerald-500 text-white border-emerald-500" : "border-zinc-200 dark:border-zinc-700 text-zinc-500 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800")}>女性</button>
      </div>
      <div className="grid grid-cols-3 gap-3">
        <div>
          <label className="text-xs font-medium text-zinc-400 mb-1.5 block">年龄</label>
          <input type="number" value={age} onChange={(e) => setAge(e.target.value)} className="w-full rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2.5 text-sm text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/40" />
        </div>
        <div>
          <label className="text-xs font-medium text-zinc-400 mb-1.5 block">身高 (cm)</label>
          <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} className="w-full rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2.5 text-sm text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/40" />
        </div>
        <div>
          <label className="text-xs font-medium text-zinc-400 mb-1.5 block">体重 (kg)</label>
          <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} className="w-full rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2.5 text-sm text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/40" />
        </div>
      </div>
      <div>
        <label className="text-xs font-medium text-zinc-400 mb-1.5 block">活动水平</label>
        <div className="grid grid-cols-5 gap-2">
          {activityOpts.map((o) => (
            <button key={o.value} onClick={() => setActivity(o.value)} className={classNames("rounded-lg border py-2 text-center transition-colors", activity === o.value ? "bg-emerald-500 text-white border-emerald-500" : "border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800")}>
              <p className="text-xs font-semibold text-inherit">{o.label}</p>
              <p className="text-[10px] text-zinc-400">{o.desc}</p>
            </button>
          ))}
        </div>
      </div>
      {tdee !== null && bmr !== null && (
        <div className="rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 p-5">
          <div className="grid grid-cols-2 gap-4 pb-4 border-b border-zinc-200 dark:border-zinc-700">
            <div className="text-center">
              <p className="text-xs text-zinc-400 mb-0.5">基础代谢 BMR</p>
              <p className="text-2xl font-bold text-zinc-900 dark:text-white">{bmr.toFixed(0)}</p>
              <p className="text-[10px] text-zinc-400">kcal/天</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-zinc-400 mb-0.5">每日消耗 TDEE</p>
              <p className="text-2xl font-bold text-emerald-500">{tdee.toFixed(0)}</p>
              <p className="text-[10px] text-zinc-400">kcal/天</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3 pt-4">
            {[
              { label: "减脂", val: tdee - 350, color: "text-red-500" },
              { label: "维持", val: tdee, color: "text-amber-500" },
              { label: "增肌", val: tdee + 350, color: "text-emerald-500" },
            ].map((g) => (
              <div key={g.label} className="text-center">
                <p className="text-xs text-zinc-400 mb-0.5">{g.label}</p>
                <p className={classNames("text-lg font-bold", g.color)}>{g.val.toFixed(0)}</p>
                <p className="text-[10px] text-zinc-400">kcal</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function CarbCycleCalc() {
  const [tdeeVal, setTdeeVal] = useState("2500");
  const [goal, setGoal] = useState<"cut" | "maintain" | "bulk">("maintain");
  const [trainDays, setTrainDays] = useState("4");
  const [weight, setWeight] = useState("70");
  const tdee = parseFloat(tdeeVal);
  const w = parseFloat(weight);
  const days = parseInt(trainDays);
  const restDays = 7 - days;

  const calAdjust = goal === "cut" ? -350 : goal === "bulk" ? 350 : 0;
  const protein = w * 2.0;
  const fatBase = w * 0.8;

  const calcDay = (isTraining: boolean) => {
    const totalCal = tdee + calAdjust;
    const pCal = protein * 4;
    const carbRatio = isTraining ? 0.5 : 0.3;
    const fatRatio = isTraining ? 0.2 : 0.4;
    const remainingCal = totalCal - pCal;
    const carbs = (remainingCal * carbRatio) / 4;
    const fat = (remainingCal * fatRatio) / 9;
    return {
      cal: totalCal.toFixed(0),
      protein: protein.toFixed(0),
      carbs: carbs.toFixed(0),
      fat: fat.toFixed(0),
    };
  };

  const train = calcDay(true);
  const rest = calcDay(false);

  const weeklyAvg = days > 0 ? ((parseFloat(train.cal) * days + parseFloat(rest.cal) * restDays) / 7).toFixed(0) : "0";

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-medium text-zinc-400 mb-1.5 block">TDEE (kcal)</label>
          <input type="number" value={tdeeVal} onChange={(e) => setTdeeVal(e.target.value)} className="w-full rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2.5 text-sm text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/40" />
        </div>
        <div>
          <label className="text-xs font-medium text-zinc-400 mb-1.5 block">体重 (kg)</label>
          <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} className="w-full rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2.5 text-sm text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/40" />
        </div>
      </div>
      <div>
        <label className="text-xs font-medium text-zinc-400 mb-1.5 block">目标</label>
        <div className="flex gap-2">
          {([{ k: "cut", l: "减脂" }, { k: "maintain", l: "维持" }, { k: "bulk", l: "增肌" }] as const).map((g) => (
            <button key={g.k} onClick={() => setGoal(g.k)} className={classNames("flex-1 rounded-lg border py-2.5 text-sm font-medium transition-colors", goal === g.k ? "bg-emerald-500 text-white border-emerald-500" : "border-zinc-200 dark:border-zinc-700 text-zinc-500 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800")}>{g.l}</button>
          ))}
        </div>
      </div>
      <div>
        <label className="text-xs font-medium text-zinc-400 mb-1.5 block">每周训练天数</label>
        <input type="number" min={1} max={7} value={trainDays} onChange={(e) => setTrainDays(e.target.value)} className="w-full rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2.5 text-sm text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/40" />
      </div>
      {days > 0 && w > 0 && (
        <div className="rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 p-5 space-y-4">
          <div className="text-center pb-3 border-b border-zinc-200 dark:border-zinc-700">
            <p className="text-xs text-zinc-400 mb-0.5">周平均每日热量</p>
            <p className="text-2xl font-bold text-zinc-900 dark:text-white">{weeklyAvg} kcal</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-lg bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/30 p-4">
              <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 mb-3">训练日 ({days}天)</p>
              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between"><span className="text-zinc-500">热量</span><span className="font-semibold text-zinc-900 dark:text-white">{train.cal}</span></div>
                <div className="flex justify-between"><span className="text-zinc-500">蛋白质</span><span className="font-semibold text-zinc-900 dark:text-white">{train.protein}g</span></div>
                <div className="flex justify-between"><span className="text-zinc-500">碳水</span><span className="font-semibold text-emerald-600 dark:text-emerald-400">{train.carbs}g</span></div>
                <div className="flex justify-between"><span className="text-zinc-500">脂肪</span><span className="font-semibold text-zinc-900 dark:text-white">{train.fat}g</span></div>
              </div>
            </div>
            <div className="rounded-lg bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 p-4">
              <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 mb-3">休息日 ({restDays}天)</p>
              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between"><span className="text-zinc-500">热量</span><span className="font-semibold text-zinc-900 dark:text-white">{rest.cal}</span></div>
                <div className="flex justify-between"><span className="text-zinc-500">蛋白质</span><span className="font-semibold text-zinc-900 dark:text-white">{rest.protein}g</span></div>
                <div className="flex justify-between"><span className="text-zinc-500">碳水</span><span className="font-semibold text-amber-600 dark:text-amber-400">{rest.carbs}g</span></div>
                <div className="flex justify-between"><span className="text-zinc-500">脂肪</span><span className="font-semibold text-zinc-900 dark:text-white">{rest.fat}g</span></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function PeriodizationCalc() {
  const [goal, setGoal] = useState<"strength" | "hypertrophy" | "endurance">("hypertrophy");
  const [level, setLevel] = useState<"beginner" | "intermediate" | "advanced">("intermediate");
  const [weeks, setWeeks] = useState("12");
  const [daysPerWeek, setDaysPerWeek] = useState("4");

  const weeksNum = parseInt(weeks);
  const days = parseInt(daysPerWeek);

  const goalLabel = { strength: "最大力量", hypertrophy: "肌肥大", endurance: "肌肉耐力" };
  const levelLabel = { beginner: "初级", intermediate: "中级", advanced: "高级" };

  const phaseCount = goal === "endurance" ? 2 : 3;
  const phaseWeeks = weeksNum > 0 ? Math.max(2, Math.floor(weeksNum / phaseCount)) : 4;

  const phases = [
    { name: "基础适应", focus: "建立动作模式与神经适应", weeks: phaseWeeks, vol: "中-高", int: "低-中" },
    { name: "专项强化", focus: goalLabel[goal] + "专项训练", weeks: phaseWeeks, vol: "中", int: "中-高" },
  ];
  if (goal !== "endurance") {
    phases.push({ name: "峰值冲击", focus: "高强度冲击与峰值达成", weeks: Math.max(2, weeksNum - phaseWeeks * 2), vol: "低", int: "高" });
  }
  const totalWeeks = phases.reduce((s, p) => s + p.weeks, 0);

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-medium text-zinc-400 mb-1.5 block">训练目标</label>
          <select value={goal} onChange={(e) => setGoal(e.target.value as typeof goal)} className="w-full rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2.5 text-sm text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/40">
            <option value="strength">最大力量</option>
            <option value="hypertrophy">肌肥大</option>
            <option value="endurance">肌肉耐力</option>
          </select>
        </div>
        <div>
          <label className="text-xs font-medium text-zinc-400 mb-1.5 block">训练水平</label>
          <select value={level} onChange={(e) => setLevel(e.target.value as typeof level)} className="w-full rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2.5 text-sm text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/40">
            <option value="beginner">初级</option>
            <option value="intermediate">中级</option>
            <option value="advanced">高级</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-medium text-zinc-400 mb-1.5 block">周期长度 (周)</label>
          <input type="number" min={4} max={52} value={weeks} onChange={(e) => setWeeks(e.target.value)} className="w-full rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2.5 text-sm text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/40" />
        </div>
        <div>
          <label className="text-xs font-medium text-zinc-400 mb-1.5 block">每周训练天数</label>
          <input type="number" min={2} max={7} value={daysPerWeek} onChange={(e) => setDaysPerWeek(e.target.value)} className="w-full rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2.5 text-sm text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/40" />
        </div>
      </div>
      {weeksNum > 0 && days > 0 && (
        <div className="rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 p-5">
          <div className="flex items-center gap-3 pb-3 border-b border-zinc-200 dark:border-zinc-700 mb-4">
            <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center text-emerald-600 dark:text-emerald-400 font-bold text-sm">{days}</div>
            <div>
              <p className="text-sm font-semibold text-zinc-900 dark:text-white">{goalLabel[goal]} · {levelLabel[level]}</p>
              <p className="text-xs text-zinc-400">共 {totalWeeks} 周 · 每周 {days} 练</p>
            </div>
          </div>
          <div className="space-y-3">
            {phases.map((p, i) => (
              <div key={i} className="flex gap-3 items-start">
                <div className="shrink-0 w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-xs font-bold text-white">
                  {i + 1}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-zinc-900 dark:text-white">{p.name}</p>
                    <span className="text-xs text-zinc-400 font-mono">{p.weeks}周</span>
                  </div>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">{p.focus}</p>
                  <div className="flex gap-3 mt-1">
                    <span className="text-[10px] text-zinc-400 bg-zinc-100 dark:bg-zinc-800 rounded px-1.5 py-0.5">容量: {p.vol}</span>
                    <span className="text-[10px] text-zinc-400 bg-zinc-100 dark:bg-zinc-800 rounded px-1.5 py-0.5">强度: {p.int}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

interface FoodDB {
  name: string;
  kcal: number;
  protein: number;
  carbs: number;
  fat: number;
  unit: string;
  category: string;
}

let _foodCache: FoodDB[] | null = null;

function shortCat(cat: string) {
  const idx = cat.indexOf("-");
  return idx !== -1 ? cat.slice(idx + 1) : cat;
}

interface LogEntry {
  id: string;
  foodName: string;
  amount: number;
  kcal: number;
  protein: number;
  carbs: number;
  fat: number;
  timestamp: number;
}

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

function loadLogs(): LogEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem("fitlearn-calorie-" + todayKey());
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveLogs(entries: LogEntry[]) {
  localStorage.setItem("fitlearn-calorie-" + todayKey(), JSON.stringify(entries));
}

function CalorieCalc() {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [foods, setFoods] = useState<FoodDB[]>(_foodCache || []);
  const [loading, setLoading] = useState(!_foodCache);
  const [search, setSearch] = useState("");
  const [customName, setCustomName] = useState("");
  const [customKcal, setCustomKcal] = useState("");
  const [customProtein, setCustomProtein] = useState("");
  const [customCarbs, setCustomCarbs] = useState("");
  const [customFat, setCustomFat] = useState("");
  const [customAmount, setCustomAmount] = useState("100");
  const [target, setTarget] = useState(() => {
    if (typeof window === "undefined") return "2000";
    return localStorage.getItem("fitlearn-calorie-target") || "2000";
  });

  useEffect(() => {
    setLogs(loadLogs());
    if (!_foodCache) {
      fetch("/api/foods")
        .then((r) => r.json())
        .then((res) => {
          _foodCache = res.data;
          setFoods(res.data);
          setLoading(false);
        });
    }
  }, []);

  useEffect(() => {
    saveLogs(logs);
  }, [logs]);

  useEffect(() => {
    localStorage.setItem("fitlearn-calorie-target", target);
  }, [target]);

  const totalKcal = logs.reduce((s, e) => s + e.kcal, 0);
  const totalProtein = logs.reduce((s, e) => s + e.protein, 0);
  const totalCarbs = logs.reduce((s, e) => s + e.carbs, 0);
  const totalFat = logs.reduce((s, e) => s + e.fat, 0);
  const targetNum = parseFloat(target) || 2000;
  const remaining = targetNum - totalKcal;
  const pct = Math.min((totalKcal / targetNum) * 100, 100);

  const categories = [...new Set(foods.map((f) => f.category))];
  const filtered = search
    ? foods.filter((f) => f.name.includes(search))
    : foods;

  const addEntry = (food: FoodDB, amount: number) => {
    const ratio = amount / 100;
    const entry: LogEntry = {
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
      foodName: food.name,
      amount,
      kcal: Math.round(food.kcal * ratio),
      protein: Math.round(food.protein * ratio * 10) / 10,
      carbs: Math.round(food.carbs * ratio * 10) / 10,
      fat: Math.round(food.fat * ratio * 10) / 10,
      timestamp: Date.now(),
    };
    setLogs((prev) => [entry, ...prev]);
  };

  const addCustom = () => {
    const n = customName.trim();
    const k = parseFloat(customKcal);
    const p = parseFloat(customProtein);
    const c = parseFloat(customCarbs);
    const f = parseFloat(customFat);
    const a = parseFloat(customAmount);
    if (!n || !k || !a) return;
    addEntry({ name: n, kcal: k, protein: p || 0, carbs: c || 0, fat: f || 0, unit: "g", category: "自定义" }, a);
    setCustomName("");
    setCustomKcal("");
    setCustomProtein("");
    setCustomCarbs("");
    setCustomFat("");
  };

  const removeEntry = (id: string) => {
    setLogs((prev) => prev.filter((e) => e.id !== id));
  };

  const clearToday = () => {
    setLogs([]);
  };

  const grouped = [...categories, "自定义"].map((cat) => ({
    cat,
    items: cat === "自定义"
      ? []
      : filtered.filter((f) => f.category === cat),
  }));

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <div className="flex-1">
          <label className="text-xs font-medium text-zinc-400 mb-1.5 block">每日目标 (kcal)</label>
          <input type="number" value={target} onChange={(e) => setTarget(e.target.value)} className="w-full rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2.5 text-sm text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/40" />
        </div>
        <div className="flex-1 text-right">
          <p className="text-xs text-zinc-400 mb-1">已摄入 / 剩余</p>
          <p className="text-2xl font-bold text-zinc-900 dark:text-white">
            {totalKcal} <span className="text-sm font-normal text-zinc-400">/ {remaining > 0 ? remaining : 0} kcal</span>
          </p>
        </div>
      </div>

      <div className="h-2 rounded-full bg-zinc-200 dark:bg-zinc-700 overflow-hidden">
        <div className={classNames("h-full rounded-full transition-all duration-500", pct >= 100 ? "bg-red-500" : pct >= 80 ? "bg-amber-500" : "bg-emerald-500")} style={{ width: pct + "%" }} />
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="rounded-lg bg-sky-50 dark:bg-sky-950/20 border border-sky-200 dark:border-sky-900/30 p-3 text-center">
          <p className="text-[10px] text-sky-600 dark:text-sky-400 font-medium">蛋白质</p>
          <p className="text-lg font-bold text-sky-700 dark:text-sky-300">{totalProtein.toFixed(1)}g</p>
        </div>
        <div className="rounded-lg bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/30 p-3 text-center">
          <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">碳水</p>
          <p className="text-lg font-bold text-emerald-700 dark:text-emerald-300">{totalCarbs.toFixed(1)}g</p>
        </div>
        <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/30 p-3 text-center">
          <p className="text-[10px] text-amber-600 dark:text-amber-400 font-medium">脂肪</p>
          <p className="text-lg font-bold text-amber-700 dark:text-amber-300">{totalFat.toFixed(1)}g</p>
        </div>
      </div>

      {loading && (
        <div className="text-center py-8 text-sm text-zinc-400">正在加载食物数据库...</div>
      )}

      {logs.length > 0 && (
        <div className="rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 p-4 space-y-2">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">今日记录</p>
            <button onClick={clearToday} className="text-xs text-red-500 hover:text-red-400 flex items-center gap-1">
              <Trash weight="regular" className="text-xs" /> 清空
            </button>
          </div>
          {logs.map((e) => (
            <div key={e.id} className="flex items-center justify-between text-sm py-1.5 border-b border-zinc-200 dark:border-zinc-700/50 last:border-0">
              <div className="flex items-center gap-2 min-w-0">
                <button onClick={() => removeEntry(e.id)} className="shrink-0 text-zinc-400 hover:text-red-500 transition-colors">
                  <Trash weight="regular" className="text-xs" />
                </button>
                <div className="min-w-0">
                  <span className="text-zinc-900 dark:text-white truncate block">{e.foodName}</span>
                  <span className="text-[10px] text-zinc-400">
                    P {e.protein.toFixed(1)}g / C {e.carbs.toFixed(1)}g / F {e.fat.toFixed(1)}g
                  </span>
                </div>
              </div>
              <div className="text-right shrink-0 ml-2">
                <span className="font-semibold text-zinc-900 dark:text-white block">{e.kcal}</span>
                <span className="text-[10px] text-zinc-400">{e.amount}g</span>
              </div>
            </div>
          ))}
        </div>
      )}

      <div>
        <label className="text-xs font-medium text-zinc-400 mb-2 block">搜索食物</label>
        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="输入食物名称..." disabled={loading} className="w-full rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2.5 text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 disabled:opacity-50" />
      </div>

      {!loading && <div className="max-h-72 overflow-y-auto space-y-3 pr-1">
        {grouped.map((g) => {
          const items = g.cat === "自定义" ? [] : filtered.filter((f) => f.category === g.cat);
          if (items.length === 0) return null;
          return (
            <div key={g.cat}>
              <p className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider mb-1.5">{shortCat(g.cat)}</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                {items.map((f) => (
                  <FoodRow key={f.name} food={f} onAdd={addEntry} />
                ))}
              </div>
            </div>
          );
        })}
      </div>}

      <details className="rounded-lg border border-zinc-200 dark:border-zinc-700">
        <summary className="px-4 py-2.5 text-sm font-medium text-zinc-600 dark:text-zinc-400 cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-800 rounded-lg transition-colors">
          添加自定义食物
        </summary>
        <div className="p-4 border-t border-zinc-200 dark:border-zinc-700 space-y-3">
          <input type="text" value={customName} onChange={(e) => setCustomName(e.target.value)} placeholder="食物名称" className="w-full rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2 text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/40" />
          <div className="grid grid-cols-4 gap-2">
            <input type="number" value={customKcal} onChange={(e) => setCustomKcal(e.target.value)} placeholder="kcal" className="rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2 text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/40" />
            <input type="number" value={customProtein} onChange={(e) => setCustomProtein(e.target.value)} placeholder="蛋白质(g)" className="rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2 text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/40" />
            <input type="number" value={customCarbs} onChange={(e) => setCustomCarbs(e.target.value)} placeholder="碳水(g)" className="rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2 text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/40" />
            <input type="number" value={customFat} onChange={(e) => setCustomFat(e.target.value)} placeholder="脂肪(g)" className="rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2 text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/40" />
          </div>
          <div className="flex gap-2 items-center">
            <input type="number" value={customAmount} onChange={(e) => setCustomAmount(e.target.value)} placeholder="克数" className="w-24 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2 text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/40" />
            <button onClick={addCustom} className="flex-1 rounded-lg bg-emerald-500 py-2.5 text-sm font-semibold text-white hover:bg-emerald-400 transition-colors flex items-center justify-center gap-1.5">
              <Plus weight="bold" className="text-sm" /> 添加
            </button>
          </div>
        </div>
      </details>

      <div className="text-xs text-zinc-400 leading-relaxed">
        数据自动保存至浏览器本地，不会上传至服务器。每日记录按日期分别存储。
      </div>
    </div>
  );
}

function FoodRow({ food, onAdd }: { food: FoodDB; onAdd: (f: FoodDB, amount: number) => void }) {
  const [amount, setAmount] = useState("100");
  return (
    <div className="rounded-lg border border-zinc-200 dark:border-zinc-700 p-2.5 hover:border-emerald-500/30 transition-colors">
      <div className="flex items-center justify-between mb-1">
        <p className="text-xs font-medium text-zinc-900 dark:text-white truncate">{food.name}</p>
        <span className="text-[10px] text-zinc-400 shrink-0 ml-1 font-semibold">{food.kcal}</span>
      </div>
      <p className="text-[9px] text-zinc-400 mb-1.5 leading-tight">
        P {food.protein} / C {food.carbs} / F {food.fat}
      </p>
      <div className="flex items-center gap-1">
        <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} className="w-14 rounded border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-1.5 py-1 text-xs text-zinc-900 dark:text-white text-center focus:outline-none focus:ring-1 focus:ring-emerald-500/40" min={1} />
        <span className="text-[10px] text-zinc-400">{food.unit}</span>
        <button onClick={() => { const a = parseFloat(amount); if (a > 0) onAdd(food, a); }} className="ml-auto rounded bg-emerald-500 px-2 py-1 text-[10px] font-semibold text-white hover:bg-emerald-400 transition-colors flex items-center gap-0.5">
          <Plus weight="bold" className="text-[10px]" /> 添加
        </button>
      </div>
    </div>
  );
}

const toolComponents: Record<ToolKey, () => ReactNode> = {
  bmi: BmiCalc,
  "1rm": RmCalc,
  tdee: TdeeCalc,
  calorie: CalorieCalc,
  "carb-cycle": CarbCycleCalc,
  periodization: PeriodizationCalc,
};

export default function ToolsClient() {
  const [active, setActive] = useState<ToolKey>("bmi");
  const ActiveComponent = toolComponents[active];
  const activeDef = tools.find((t) => t.key === active)!;

  return (
    <section className="py-16 md:py-24 bg-white dark:bg-zinc-950">
      <div className="container-main">
        <div className="max-w-2xl mb-10">
          <p className="text-emerald-400 font-mono text-xs uppercase tracking-[0.18em] mb-3">
            训练工具箱
          </p>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter text-zinc-900 dark:text-white mb-3">
            科学计算 · 精准规划
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
            基于运动科学公式的计算工具，帮助制定精准的训练与营养方案。
          </p>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {tools.map((t) => {
            const Icon = t.icon;
            const isActive = active === t.key;
            return (
              <button
                key={t.key}
                onClick={() => setActive(t.key)}
                className={classNames(
                  "flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium transition-all",
                  isActive
                    ? "bg-emerald-500 text-white border-emerald-500 shadow-sm"
                    : "border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                )}
              >
                <Icon weight={isActive ? "fill" : "regular"} className="text-sm" />
                <span>{t.label}</span>
              </button>
            );
          })}
        </div>

        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 md:p-8">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-zinc-200 dark:border-zinc-800">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center">
              <activeDef.icon weight="fill" className="text-emerald-600 dark:text-emerald-400 text-lg" />
            </div>
            <div>
              <p className="text-base font-semibold text-zinc-900 dark:text-white">{activeDef.label}</p>
              <p className="text-xs text-zinc-400">{activeDef.desc}</p>
            </div>
          </div>
          <ActiveComponent />
        </div>
      </div>
    </section>
  );
}
