import { writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const BASE =
  "https://api.github.com/repos/Sanotsu/china-food-composition-data/contents/json_data_vision_251206_Qwen2-5-VL-72B-Instruct";
const RAW =
  "https://raw.githubusercontent.com/Sanotsu/china-food-composition-data/main/json_data_vision_251206_Qwen2-5-VL-72B-Instruct";

function toNum(v) {
  if (v == null || v === "—" || v === "Tr" || v === "") return 0;
  const n = parseFloat(v);
  return isNaN(n) ? 0 : n;
}

async function main() {
  const res = await fetch(BASE);
  if (!res.ok) throw new Error("Failed to list directory: " + res.status);
  const files = await res.json();
  const jsonFiles = files.filter((f) => f.name.endsWith(".json"));

  let allItems = [];
  for (const f of jsonFiles) {
    const rawUrl = RAW + "/" + encodeURIComponent(f.name);
    const dataRes = await fetch(rawUrl);
    if (!dataRes.ok) continue;
    const items = await dataRes.json();
    const category = f.name.replace(/^merged_|\.json$/g, "");
    const mapped = items.map((item) => ({
      name: item.foodName || "",
      kcal: toNum(item.energyKCal),
      protein: toNum(item.protein),
      carbs: toNum(item.CHO),
      fat: toNum(item.fat),
      unit: "g",
      category,
    })).filter((item) => item.name && item.kcal > 0);
    allItems.push(...mapped);
    console.log(`  ${category}: ${mapped.length} items`);
  }

  const outPath = join(__dirname, "..", "data", "foods.json");
  writeFileSync(outPath, JSON.stringify(allItems, null, 2), "utf-8");
  console.log(`\nDone. ${allItems.length} food items saved to data/foods.json`);
}

main().catch(console.error);
