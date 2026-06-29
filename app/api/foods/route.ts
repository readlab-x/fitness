import { readFileSync } from "fs";
import { join } from "path";
import { NextRequest, NextResponse } from "next/server";

let allFoods: any[] | null = null;

function loadFoods() {
  if (allFoods) return allFoods;
  const filePath = join(process.cwd(), "data", "foods.json");
  const raw = readFileSync(filePath, "utf-8");
  allFoods = JSON.parse(raw);
  return allFoods!;
}

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q") || "";
  const limit = parseInt(req.nextUrl.searchParams.get("limit") || "0");

  const foods = loadFoods();
  let results = foods;

  if (q) {
    const keyword = q.toLowerCase();
    results = foods.filter(
      (f) =>
        f.name.toLowerCase().includes(keyword) ||
        f.category.toLowerCase().includes(keyword)
    );
  }

  if (limit > 0) {
    results = results.slice(0, limit);
  }

  return NextResponse.json({ data: results, total: results.length });
}
