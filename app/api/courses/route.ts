import { NextResponse } from "next/server";
import { getAllCourses } from "@/lib/load-course";

export async function GET() {
  const courses = getAllCourses();
  return NextResponse.json({ data: courses });
}
