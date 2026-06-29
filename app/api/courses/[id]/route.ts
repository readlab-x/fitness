import { NextRequest, NextResponse } from "next/server";
import { loadCourse } from "@/lib/load-course";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const { course, modules } = loadCourse(id);
    return NextResponse.json({ data: { course, modules } });
  } catch {
    return NextResponse.json({ error: "Course not found" }, { status: 404 });
  }
}
